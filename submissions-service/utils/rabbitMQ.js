// rabbitMQ.js
const amqp = require('amqplib');
require('dotenv').config();
const { handleMessage } = require('../controllers/messageHandler');

let connection = null;
let channel = null;

async function setupRabbitMQ() {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await configureRabbitMQ();
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

async function configureRabbitMQ() {
    const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
    const QUEUE_NAME = process.env.QUEUE;
    const ROUTING_KEY = process.env.ROUTING_KEY;
    await channel.assertExchange(EXCHANGE_NAME, 'direct', {durable: true});
    await channel.assertQueue(QUEUE_NAME, {durable: true});
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
    channel.prefetch(1);
    await consumeMessages(QUEUE_NAME);
}

process.on('exit', () => {
    if (channel) {
        channel.close();
    }
    console.log('RabbitMQ channel closed');
});

module.exports = { setupRabbitMQ };
