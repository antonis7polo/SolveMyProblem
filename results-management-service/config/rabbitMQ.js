// rabbitMQResults.js
const amqp = require('amqplib');
require('dotenv').config();
const { handleMessage } = require('../controllers/messageHandler');

let channel = null;

const solverExchange = process.env.SOLVER_EXCHANGE;
const submissionExchange = process.env.SUBMISSION_EXCHANGE;
const logExchange = process.env.LOG_EXCHANGE;

async function setupRabbitMQ() {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('RabbitMQ correctly connected');

        await channel.assertExchange(solverExchange, 'direct', { durable: true });
        await channel.assertExchange(submissionExchange, 'direct', { durable: true });
        await channel.assertExchange(logExchange, 'direct', { durable: true });
        await channel.assertExchange(process.env.RESULT_DELETE_EXCHANGE_NAME, 'direct', { durable: true });

    // Configuring queues
        await channel.assertQueue(process.env.SOLVER_QUEUE , { durable: true });
        await channel.assertQueue(process.env.LOG_QUEUE, { durable: true });
        await channel.assertQueue(process.env.RESULT_DELETE_QUEUE_NAME, { durable: true });

    // Binding queues
        await channel.bindQueue( process.env.SOLVER_QUEUE, solverExchange, process.env.SOLVER_ROUTING_KEY);
        await channel.bindQueue( process.env.LOG_QUEUE, logExchange, process.env.LOG_ROUTING_KEY);
        await channel.bindQueue( process.env.RESULT_DELETE_QUEUE_NAME, process.env.RESULT_DELETE_EXCHANGE_NAME, process.env.RESULT_DELETE_ROUTING_KEY);

        channel.prefetch(1);
        await consumeMessages(channel);
        await consumeDeleteMessages(channel);

    } catch (error) {
        console.error('Failed to connect or configure RabbitMQ:', error);
        setTimeout(setupRabbitMQ, 5000);  // Retry connection after 5 seconds
    }
}


async function consumeMessages(channel) {
    console.log('Listening for messages on SOLVER_QUEUE');
    channel.consume(process.env.SOLVER_QUEUE, (msg) => {
        if (msg) {
            console.log('Received message:', msg.content.toString());
            handleMessage(msg, channel);
            channel.ack(msg);
        }
    }, {noAck: false});
}

async function consumeDeleteMessages(channel) {
    console.log('Listening for messages on RESULT_DELETE_QUEUE');
    channel.consume(process.env.RESULT_DELETE_QUEUE_NAME, (msg) => {
        if (msg) {
            console.log('Received delete message:', msg.content.toString());
            handleMessage(msg, channel);
            channel.ack(msg);
        }
    }, {noAck: false});
}



module.exports = { setupRabbitMQ };

