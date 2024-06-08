const amqp = require('amqplib');
const http = require("http");
require('dotenv').config();
const app = require('./app');

let connection, channel;

const SOLVER_WRAPPER_QUEUE = process.env.SOLVER_WRAPPER_QUEUE_NAME;
const SOLVER_WRAPPER_EXCHANGE = process.env.SOLVER_WRAPPER_EXCHANGE_NAME;
const SOLVER_WRAPPER_ROUTING_KEY = process.env.SOLVER_WRAPPER_ROUTING_KEY;
const SOLVER_EXCHANGE = process.env.SOLVER_EXCHANGE_NAME;
const SOLVER_ROUTING_KEY = process.env.SOLVER_ROUTING_KEY;

const port = process.env.PORT || 3008;
const server = http.createServer(app);

async function connectRabbitMQ() {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await setupQueues();
        await consumeWrapperQueue();
        console.log('RabbitMQ correctly connected')
    } catch (error) {
        console.error('Failed to connect or configure RabbitMQ:', error);
        setTimeout(connectRabbitMQ, 5000);
    }
}

async function setupQueues() {
    await channel.assertExchange(SOLVER_WRAPPER_EXCHANGE, 'direct', { durable: true });
    await channel.assertQueue(SOLVER_WRAPPER_QUEUE, { durable: true });
    await channel.bindQueue(SOLVER_WRAPPER_QUEUE, SOLVER_WRAPPER_EXCHANGE, SOLVER_WRAPPER_ROUTING_KEY);
    await channel.assertExchange(SOLVER_EXCHANGE, 'direct', { durable: true });
}

async function consumeWrapperQueue() {
    await channel.prefetch(1);
    console.log(`Listening for problems on ${SOLVER_WRAPPER_QUEUE}`);
    channel.consume(SOLVER_WRAPPER_QUEUE, async (msg) => {
        if (msg !== null) {
            const problem = JSON.parse(msg.content.toString());
            await processProblem(problem);
            channel.ack(msg);
        }
    }, { noAck: false });
}

async function processProblem(problem) {
    await channel.publish(SOLVER_EXCHANGE, SOLVER_ROUTING_KEY, Buffer.from(JSON.stringify(problem)), { persistent: true });
    console.log('Problem forwarded to solver queue: ', problem);
}

connectRabbitMQ().then(r => console.log('Connected to RabbitMQ')).catch(console.error);

server.listen(port, () => console.log(`Server running on port ${port}`));
