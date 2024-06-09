// utils/rabbitMQ.js
const amqp = require('amqplib');
require('dotenv').config(); 

const { handleUserCreated, handleResultsStored } = require('../controllers/postLogsController');

let connection = null;
let channel = null;

async function setupRabbitMQ() {
    try {
        // Establish connection
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        
        // Assert queues and consume messages
        await configureRabbitMQ();
        console.log('RabbitMQ correctly connected')
    } catch (error) {
        console.error('Failed to set up RabbitMQ connection:', error);
        setTimeout(setupRabbitMQ, 10000); // Retry after 10 seconds
    }
}

async function configureRabbitMQ() {
    // Queue and Exchange information
    const USER_CREATED_QUEUE = process.env.USER_CREATED_QUEUE;
    const USER_CREATED_EXCHANGE = process.env.USER_CREATED_EXCHANGE;
    const USER_CREATED_ROUTING_KEY = process.env.USER_CREATED_ROUTING_KEY;

    const RESULTS_STORED_QUEUE = process.env.RESULTS_STORED_QUEUE;
    const RESULTS_STORED_EXCHANGE = process.env.RESULTS_STORED_EXCHANGE;
    const RESULTS_STORED_ROUTING_KEY = process.env.RESULTS_STORED_ROUTING_KEY;

    // Assert user-created queue and bind it to an exchange
    await channel.assertExchange(USER_CREATED_EXCHANGE, 'direct', { durable: true });
    await channel.assertQueue(USER_CREATED_QUEUE, { durable: true });
    await channel.bindQueue(USER_CREATED_QUEUE, USER_CREATED_EXCHANGE, USER_CREATED_ROUTING_KEY);

    // Assert results-stored queue and bind it to an exchange
    await channel.assertExchange(RESULTS_STORED_EXCHANGE, 'direct', { durable: true });
    await channel.assertQueue(RESULTS_STORED_QUEUE, { durable: true });
    await channel.bindQueue(RESULTS_STORED_QUEUE, RESULTS_STORED_EXCHANGE, RESULTS_STORED_ROUTING_KEY);

    // Consume messages from both queues
    await consumeMessages(USER_CREATED_QUEUE, handleUserCreated);
    await consumeMessages(RESULTS_STORED_QUEUE, handleResultsStored);
    console.log(`RabbitMQ configured`);
}

async function handleMessage(queueName, msg, channel) {
    try {
        const messageData = JSON.parse(msg.content.toString());
        
        if (queueName === process.env.USER_CREATED_QUEUE) {
            console.log(`Found message from user queue: ${queueName}`)
            await handleUserCreated(messageData);
        } else if (queueName === process.env.RESULTS_STORED_QUEUE) {
            console.log(`Found message from results queue: ${queueName}`)
            await handleResultsStored(messageData);
        } else {
            console.error(`Unrecognized queue name: ${queueName}`);
        }
    } catch (error) {
        console.error(`Error handling message from ${queueName}:`, error);
    } finally {
        channel.ack(msg);
    }
}

async function consumeMessages(queueName) {
    console.log(`Listening for messages on queue ${queueName}`);
    channel.consume(queueName, (msg) => {
        if (msg) {
            handleMessage(queueName, msg, channel);
        }
    }, { noAck: false });
}

process.on('exit', () => {
    if (channel) {
        channel.close();
    }
    console.log('RabbitMQ channel closed');
});

module.exports = { setupRabbitMQ };