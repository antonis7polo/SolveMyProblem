const amqp = require('amqplib');
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');
const app = require('./app');
const http = require("http");
const execPromise = util.promisify(exec);

require('dotenv').config();

const port = process.env.PORT || 3006;
const server = http.createServer(app);

let connection, channel;

const SOLVER_EXCHANGE_NAME = process.env.SOLVER_EXCHANGE_NAME;
const SOLVER_QUEUE = process.env.SOLVER_QUEUE_NAME;
const SOLVER_ROUTING_KEY = process.env.SOLVER_ROUTING_KEY;
const RESULTS_EXCHANGE_NAME = process.env.RESULTS_EXCHANGE_NAME;
const RESULTS_ROUTING_KEY = process.env.RESULTS_ROUTING_KEY;

async function connectRabbitMQ() {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await setupQueues();
        await consumeSolverQueue();
        console.log('RabbitMQ correctly connected');
    } catch (error) {
        console.error('Failed to connect or configure RabbitMQ:', error);
        setTimeout(connectRabbitMQ, 5000);
    }
}

async function setupQueues() {
    await channel.assertExchange(SOLVER_EXCHANGE_NAME, 'direct', { durable: true });
    await channel.assertQueue(SOLVER_QUEUE, { durable: true });
    await channel.bindQueue(SOLVER_QUEUE, SOLVER_EXCHANGE_NAME, SOLVER_ROUTING_KEY);
    await channel.assertExchange(RESULTS_EXCHANGE_NAME, 'direct', { durable: true });
}

async function consumeSolverQueue() {
    await channel.prefetch(1);
    console.log(`Listening for problems on ${SOLVER_QUEUE}`);
    channel.consume(SOLVER_QUEUE, async (msg) => {
        if (msg !== null) {
            await solveProblem(JSON.parse(msg.content.toString()));
            channel.ack(msg);
        }
    }, { noAck: false });
}

const EXECUTION_TIMEOUT = 3600000; // 1 hour in milliseconds

async function solveProblem(problem) {
    const { parameters, solver, numVehicles, depot, maxDistance } = problem.inputData;
    const tempDir = os.tmpdir();
    const solverPath = path.join(tempDir, `solver_${problem.submissionId}.py`);
    const parametersPath = path.join(tempDir, `parameters_${problem.submissionId}.json`);

    // Decode and write the Python and JSON files as buffers
    fs.writeFileSync(solverPath, Buffer.from(solver.data));
    fs.writeFileSync(parametersPath, Buffer.from(parameters.data));

    const command = `python3 ${solverPath} ${parametersPath} ${numVehicles} ${depot} ${maxDistance}`;
    const startTime = process.hrtime();
    const cpuStartTime = process.cpuUsage();
    const executionTimestamp = new Date();
    const submissionTimestamp = new Date(problem.submissionTimestamp);
    const queueTime = executionTimestamp - submissionTimestamp; // in milliseconds

    try {
        const { stdout } = await execPromise(command, { timeout: EXECUTION_TIMEOUT });

        const endTime = process.hrtime(startTime);
        const cpuEndTime = process.cpuUsage(cpuStartTime);

        const taskCompletionTime = endTime[0] * 1000 + endTime[1] / 1000000; // in milliseconds
        const cpuTime = (cpuEndTime.user + cpuEndTime.system) / 1000; // in milliseconds

        const logInfo = {
            taskCompletionTime,
            cpuTime,
            executionTimestamp: executionTimestamp.toISOString(),
            creditsUsed: problem.costOfSolution,
            queueTime
        };

        if (stdout.includes("No solution found")) {
            await publishResults(problem, "No solution found!", 'fail', logInfo);
        } else {
            await publishResults(problem, stdout, 'success', logInfo);
        }
    } catch (error) {
        console.error(`Error executing VRP Solver:`, error);

        const endTime = process.hrtime(startTime);
        const cpuEndTime = process.cpuUsage(cpuStartTime);

        const taskCompletionTime = endTime[0] * 1000 + endTime[1] / 1000000; // in milliseconds
        const cpuTime = (cpuEndTime.user + cpuEndTime.system) / 1000; // in milliseconds

        const logInfo = {
            taskCompletionTime,
            cpuTime,
            executionTimestamp: executionTimestamp.toISOString(),
            creditsUsed: problem.costOfSolution,
            queueTime
        };

        await publishResults(problem, null, 'fail', logInfo);
    } finally {
        // Cleanup files after execution
        fs.unlinkSync(solverPath);
        fs.unlinkSync(parametersPath);
    }
}

async function publishResults(problem, solution, label = 'success', logInfo) {
    const message = JSON.stringify({
        submissionId: problem.submissionId,
        name: problem.name,
        userId: problem.userId,
        username: problem.username,
        results: solution,
        label: label,
        createdAt: problem.createdAt,
        updatedAt: problem.updatedAt,
        submissionTimestamp: problem.submissionTimestamp,
        taskCompletionTime: logInfo.taskCompletionTime,
        cpuTime: logInfo.cpuTime,
        executionTimestamp: logInfo.executionTimestamp,
        creditsUsed: logInfo.creditsUsed,
        queueTime: logInfo.queueTime
    });
    await channel.publish(RESULTS_EXCHANGE_NAME, RESULTS_ROUTING_KEY, Buffer.from(message));
    console.log(`Solution published to results queue with status ${label}`);
}

connectRabbitMQ().then(r => console.log('Connected to RabbitMQ')).catch(console.error);

server.listen(port, () => console.log(`Server running on port ${port}`));
