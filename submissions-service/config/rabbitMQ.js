// rabbitMQ.js
const amqp = require('amqplib');
require('dotenv').config();
const { handleMessage, processResult } = require('../controllers/messageHandler');

let connection = null;
let channel = null;

async function setupRabbitMQ() {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await configureRabbitMQ();
        console.log('RabbitMQ correctly connected');
    } catch (error) {
        console.error('Failed to connect or configure RabbitMQ:', error);
        setTimeout(setupRabbitMQ, 5000);  // Retry connection after 5 seconds
    }
}
async function consumeMessages(queueName) {
    console.log(`Listening for messages on queue ${queueName}`);
    channel.consume(queueName, (msg) => {
        if (msg) {
            handleMessage(msg, channel);
            channel.ack(msg);
        }
    }, { noAck: false });
}

async function consumeResults(queueName) {
    console.log(`Listening for results on queue ${queueName}`);
    channel.consume(queueName, (msg) => {
        if (msg) {
            console.log('Received result:', msg.content.toString());
            processResult(msg, channel);
            channel.ack(msg);
        }
    }, { noAck: false });
}

async function configureRabbitMQ() {
    const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
    const RESULTS_EXCHANGE_NAME = process.env.RESULTS_EXCHANGE_NAME;
    const QUEUE_NAME = process.env.QUEUE;
    const RESULTS_QUEUE_NAME = process.env.RESULTS_QUEUE;
    const ROUTING_KEY = process.env.ROUTING_KEY;
    const RESULTS_ROUTING_KEY = process.env.RESULTS_ROUTING_KEY;
    await channel.assertExchange(EXCHANGE_NAME, 'direct', {durable: true});
    await channel.assertExchange(RESULTS_EXCHANGE_NAME, 'direct', {durable: true});
    await channel.assertQueue(QUEUE_NAME, {durable: true});
    await channel.assertQueue(RESULTS_QUEUE_NAME, {durable: true});
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
    await channel.bindQueue(RESULTS_QUEUE_NAME, RESULTS_EXCHANGE_NAME, RESULTS_ROUTING_KEY);
    await channel.assertExchange(process.env.PROGRESS_EXCHANGE_NAME, 'direct', {durable: true})
    await channel.assertQueue(process.env.PROGRESS_QUEUE_NAME, {durable: true});
    await channel.bindQueue(process.env.PROGRESS_QUEUE_NAME, process.env.PROGRESS_EXCHANGE_NAME, process.env.PROGRESS_ROUTING_KEY);
    channel.prefetch(1);
    await consumeMessages(QUEUE_NAME);
    await consumeResults(RESULTS_QUEUE_NAME);
    await consumeMessages(process.env.PROGRESS_QUEUE_NAME);
}

process.on('exit', () => {
    if (channel) {
        channel.close();
    }
    console.log('RabbitMQ channel closed');
});

module.exports = { setupRabbitMQ };
