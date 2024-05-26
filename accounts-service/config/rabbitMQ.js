const amqp = require('amqplib');
const rabbitMQExports = {};

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
        setTimeout(setupRabbitMQ, 5000);  
    }
}

async function configureRabbitMQ() {
    const CREDITS_EXCHANGE = process.env.CREDITS_EXCHANGE_NAME;
    const CREDITS_ADDED_QUEUE = process.env.CREDITS_ADDED_QUEUE_NAME;
    const CREDITS_UPDATED_QUEUE = process.env.CREDITS_UPDATED_QUEUE_NAME;
    const CREDITS_ADDED_ROUTING_KEY = process.env.CREDITS_ADDED_ROUTING_KEY;
    const CREDITS_UPDATED_ROUTING_KEY = process.env.CREDITS_UPDATED_ROUTING_KEY;
    const USER_CREATED_EXCHANGE = process.env.USER_CREATED_EXCHANGE;
    const USER_CREATED_QUEUE = process.env.USER_CREATED_QUEUE;
    const USER_CREATED_ROUTING_KEY = process.env.USER_CREATED_ROUTING_KEY;


    await channel.assertExchange(CREDITS_EXCHANGE, 'direct', { durable: true });
    await channel.assertQueue(CREDITS_ADDED_QUEUE, { durable: true });
    await channel.assertQueue(CREDITS_UPDATED_QUEUE, { durable: true });
    await channel.bindQueue(CREDITS_ADDED_QUEUE, CREDITS_EXCHANGE, CREDITS_ADDED_ROUTING_KEY);
    await channel.bindQueue(CREDITS_UPDATED_QUEUE, CREDITS_EXCHANGE, CREDITS_UPDATED_ROUTING_KEY);

    await channel.assertExchange(USER_CREATED_EXCHANGE, 'direct', { durable: true });
    await channel.assertQueue(USER_CREATED_QUEUE, { durable: true });
    await channel.bindQueue(USER_CREATED_QUEUE, USER_CREATED_EXCHANGE, USER_CREATED_ROUTING_KEY);


    channel.prefetch(1);
    await consumeMessages(CREDITS_ADDED_QUEUE);
    await consumeMessages(CREDITS_UPDATED_QUEUE);


}

async function consumeMessages(queueName) {
    console.log(`Listening for messages on queue ${queueName}`);
    channel.consume(queueName, (msg) => {
        if (msg) {
            channel.ack(msg);
        }
    }, { noAck: false });
}


rabbitMQExports.publishUserCreated = async (data) => {
    const exchange = process.env.USER_CREATED_EXCHANGE;
    const routingKey = process.env.USER_CREATED_ROUTING_KEY;
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));
    console.log(`User created event published: ${JSON.stringify(data)}`);
};

rabbitMQExports.publishCreditsAdded = async (data) => {
    const exchange = process.env.CREDITS_EXCHANGE_NAME;
    const routingKey = process.env.CREDITS_ADDED_ROUTING_KEY;
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));
    console.log(`Credits added event published: ${JSON.stringify(data)}`);
};

module.exports = { setupRabbitMQ, ...rabbitMQExports };