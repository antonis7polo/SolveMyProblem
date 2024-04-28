const amqp = require('amqplib');
require('dotenv').config();
const { createOrUpdateSubmission } = require('../controllers/rabbitMQController');

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

async function configureRabbitMQ() {
    const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
    const QUEUE_NAME = process.env.QUEUE;
    const ROUTING_KEY = process.env.ROUTING_KEY;
    try {
        await channel.assertExchange(EXCHANGE_NAME, 'direct', {durable: true});
        await channel.assertQueue(QUEUE_NAME, {durable: true});
        await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

        await consumeMessages(QUEUE_NAME);
    } catch (error) {
        console.error('Failed to configure RabbitMQ:', error);
        throw error;

    }
}

async function consumeMessages(queueName) {
    console.log(`Listening for messages on queue ${queueName}`);
    try {
        channel.consume(queueName, (msg) => {
            if (msg !== null) {
                handleMessage(msg);
            }
            channel.ack(msg);
        }, {noAck: false});
    } catch (error) {
        console.error('Failed to consume messages from queue:', error);
        throw error;
    }
}

function handleMessage(msg) {
    const messageContent = msg.content.toString();
    const messageData = JSON.parse(messageContent);
    console.log('Received message:', messageData);

    createOrUpdateSubmission(messageData)
        .then(result => console.log('Submission processed successfully:', result))
        .catch(error => console.error('Failed to process submission:', error));
}

process.on('exit', (code) => {
    channel.close();
    console.log(`Closing rabbitmq channel`);
});

module.exports = { setupRabbitMQ };
