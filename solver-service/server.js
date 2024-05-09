const amqp = require('amqplib');
const { exec } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');
const execPromise = util.promisify(exec);

require('dotenv').config();

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

    // Decode and write the Python and JSON files
    fs.writeFileSync(solverPath, Buffer.from(solver, 'base64'));
    fs.writeFileSync(parametersPath, Buffer.from(parameters, 'base64'));

    const command = `python3 ${solverPath} ${parametersPath} ${numVehicles} ${depot} ${maxDistance}`;
    try {
        const { stdout } = await execPromise(command, { timeout: EXECUTION_TIMEOUT });
        await publishResults(problem, stdout, 'success');
    } catch (error) {
        console.error(`Error executing VRP Solver:`, error);
        await publishResults(problem, null, 'fail');
    } finally {
        // Cleanup files after execution
        fs.unlinkSync(solverPath);
        fs.unlinkSync(parametersPath);
    }
}


async function publishResults(problem, solution, label = 'success') {
    const message = JSON.stringify({
        submissionId: problem.submissionId,
        name: problem.name,
        userId: problem.userId,
        results: solution,
        label: label

    });
    await channel.publish(RESULTS_EXCHANGE_NAME, RESULTS_ROUTING_KEY, Buffer.from(message));
    console.log(`Solution published to results queue with status ${label}`);
}

connectRabbitMQ().then(r => console.log('Connected to RabbitMQ')).catch(console.error);
