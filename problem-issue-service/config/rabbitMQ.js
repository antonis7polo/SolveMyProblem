//rabbitMQ.js

const amqp = require('amqplib');
require('dotenv').config();
const { createProblem, deleteProblem, updateProblem } = require('../controllers/problemController');
const { updateCredits } = require('../controllers/updateCreditsController');

let connection, channel;

async function connectRabbitMQ() {
    const RABBITMQ_URL = process.env.RABBITMQ_URL;
    try{
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        await setupExchangesAndQueues();
        console.log('RabbitMQ correctly connected');
    } catch (error) {
        console.error('Failed to connect or configure RabbitMQ:', error);
        setTimeout(connectRabbitMQ, 5000);
    }
}

const EXCHANGE_NAME = process.env.EXCHANGE_NAME;
const QUEUE_NAME = process.env.QUEUE_NAME;
const ROUTING_KEY = process.env.ROUTING_KEY;

const CREDITS_EXCHANGE = process.env.CREDITS_EXCHANGE_NAME; // New exchange for credits
const CREDITS_QUEUE = process.env.CREDITS_ADDED_QUEUE_NAME // New queue for receiving credit updates
const CREDITS_ADDED_ROUTING_KEY = process.env.CREDITS_ADDED_ROUTING_KEY;
const CREDITS_UPDATED_ROUTING_KEY = process.env.CREDITS_UPDATED_ROUTING_KEY;

const SOLVER_EXCHANGE = process.env.SOLVER_EXCHANGE_NAME; // New exchange for solver
const SOLVER_ROUTING_KEY = process.env.SOLVER_ROUTING_KEY;


async function setupExchangesAndQueues() {

    try{
        await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

        await channel.assertExchange(CREDITS_EXCHANGE, 'direct', { durable: true });
        await channel.assertQueue(CREDITS_QUEUE, { durable: true });
        await channel.bindQueue(CREDITS_QUEUE, CREDITS_EXCHANGE, CREDITS_ADDED_ROUTING_KEY);

        await channel.assertExchange(SOLVER_EXCHANGE, 'direct', { durable: true });

        await channel.assertExchange(process.env.PROGRESS_EXCHANGE_NAME, 'direct', { durable: true });

        await consumeMessages(QUEUE_NAME);
        await consumeMessages(CREDITS_QUEUE);


    } catch (error) {
        console.error('Failed to configure RabbitMQ:', error);
        throw error;
    }
}
async function consumeMessages(queueName) {
    console.log(`Listening for messages on queue ${queueName}`);
    try {

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                try {
                    await handleMessage(msg, queueName);
                    channel.ack(msg);
                } catch (error) {
                    console.error('Error handling message:', error);
                    channel.nack(msg);
                }
            }
        }, { noAck: false });
    } catch (error) {
        console.error('Failed to consume messages from queue:', error);
        throw error;
    }
}


async function handleMessage(msg, queueName) {
    const messageContent = JSON.parse(msg.content.toString());
    const action = messageContent.action;

    try {
        switch(queueName) {
            case QUEUE_NAME:
                if (action === 'insert') {
                    await createProblem({
                        submissionId: messageContent.data.submissionId,
                        name: messageContent.data.name,
                        userId: messageContent.data.userId,
                        username: messageContent.data.username,
                        inputData: messageContent.data.inputData,
                    });
                    console.log(`Problem inserted successfully: Name: ${messageContent.data.name}, Submission ID: ${messageContent.data.submissionId}`);
                } else if (action === 'delete') {
                    const result = await deleteProblem(messageContent.submissionId);
                    console.log('Problem deleted successfully:', result);
                } else if (action === 'update') {
                    await updateProblem({
                        submissionId: messageContent.data.submissionId,
                        name: messageContent.data.name,
                        userId: messageContent.data.userId,
                        username: messageContent.data.username,
                        inputData: messageContent.data.inputData,
                    });
                    console.log(`Problem updated successfully: Name: ${messageContent.data.name}, Submission ID: ${messageContent.data.submissionId}`);
                }
                break;
            case CREDITS_QUEUE:
                if (action === 'update') {
                     await updateCredits(messageContent.data);
                }
                break;

            default:
                console.log('No action specified');
        }

    } catch (error) {
        console.error(`Failed to ${action} problem:`, error);
        channel.nack(msg);
    }
}

async function publishToSolverQueue(problem) {
    const msg = JSON.stringify(problem);
    await channel.publish(SOLVER_EXCHANGE, SOLVER_ROUTING_KEY, Buffer.from(msg), { persistent: true });
    console.log('Problem published to solver queue: ', problem.submissionId);

}

async function publishCreditsUpdate(userID, creditsChange) {
    const msg = JSON.stringify({
        action: 'update',
        data: { userID: userID, creditsChange: creditsChange }
    });
    await channel.publish(CREDITS_EXCHANGE, CREDITS_UPDATED_ROUTING_KEY, Buffer.from(msg));
    console.log('Credits update published');
}

async function publishToSubmissionsQueue(data) {
    const message = JSON.stringify({
        submissionId: data.submissionId,
        action: data.action,
        status: data.status,
        submissionTimestamp: data.submissionTimestamp
    })

    await channel.publish(process.env.PROGRESS_EXCHANGE_NAME, process.env.PROGRESS_ROUTING_KEY, Buffer.from(message));
    console.log('Message published to submissions queue: ', message);
}


module.exports = { connectRabbitMQ, publishCreditsUpdate, publishToSolverQueue, publishToSubmissionsQueue };
