const { exec } = require('child_process');
const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
const INCOMING_QUEUE = 'run_problem_queue';
const RESULTS_QUEUE = 'results_created_queue';


class SolverController {
    constructor() {
        this.conn = null;
        this.channel = null;
    }

    async connectRabbitMQ() {
        this.conn = await amqp.connect(RABBITMQ_URL);
        this.channel = await this.conn.createChannel();
        await this.channel.assertQueue(INCOMING_QUEUE, { durable: true });
        await this.channel.assertQueue(RESULTS_QUEUE, { durable: true });
        this.channel.consume(INCOMING_QUEUE, this.processMessage.bind(this));
        console.log(`Connected to RabbitMQ and listening on ${INCOMING_QUEUE}`);
    }

    async processMessage(msg) {
        if (msg === null) return;

        const { scriptPath, dataPath, params } = JSON.parse(msg.content.toString());
        try {
            const result = await this.executePythonSolver(scriptPath, dataPath, params);
            await this.publishResults(JSON.stringify({ result }));
            this.channel.ack(msg);
        } catch (error) {
            console.error('Error processing message:', error);
            this.channel.nack(msg);
        }
    }

    async executePythonSolver(scriptPath, dataPath, params) {
        const command = `python ${scriptPath} ${dataPath} ${params.numVehicles} ${params.depot} ${params.maxDistance}`;
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Execution error: ${error}`);
                    return reject(error);
                }
                if (stderr) {
                    console.error(`Execution stderr: ${stderr}`);
                    return reject(new Error(stderr));
                }
                resolve(stdout.trim());
            });
        });
    }

    async publishResults(result) {
        await this.channel.assertQueue(RESULTS_QUEUE, { durable: true });
        this.channel.sendToQueue(RESULTS_QUEUE, Buffer.from(result));
        console.log('Result published to RESULTS_QUEUE');
    }

    async closeConnection() {
        await this.channel.close();
        await this.conn.close();
    }
}

module.exports = SolverController;
