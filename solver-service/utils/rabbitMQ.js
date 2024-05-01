const amqp = require('amqplib');
const SolverController = require('../controllers/solverController');

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const INCOMING_QUEUE = process.env.INCOMING_QUEUE;
const RESULTS_QUEUE = process.env.RESULTS_QUEUE;

async function connectRabbitMQ() {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    const solverController = new SolverController();

    await channel.assertQueue(INCOMING_QUEUE, { durable: true });
    await channel.assertQueue(RESULTS_QUEUE, { durable: true });

    channel.consume(INCOMING_QUEUE, async (msg) => {
        if (msg !== null) {
            const result = await solverController.handleProblemSolving(msg);
            await channel.sendToQueue(RESULTS_QUEUE, Buffer.from(JSON.stringify(result)));
            channel.ack(msg);
        }
    });

    return { channel, conn };
}

module.exports = { connectRabbitMQ };


