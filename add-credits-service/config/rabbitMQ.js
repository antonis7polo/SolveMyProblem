const amqp = require('amqplib');
require('dotenv').config();

let connection, channel;

const setupRabbitMQ = async () => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();

        const exchange = process.env.CREDITS_EXCHANGE_NAME;
        await channel.assertExchange(exchange, 'direct', { durable: true });

        console.log('RabbitMQ correctly connected')

    } catch (error) {
        console.error("Failed to connect to RabbitMQ:", error);
        setTimeout(setupRabbitMQ, 5000); // Retry connection
    }
};

const publishCreditAdded = async (userId, amount) => {
    const exchange = process.env.CREDITS_EXCHANGE_NAME;
    const routingKey = process.env.CREDITS_ADDED_ROUTING_KEY;
    const usersRoutingKey = process.env.USER_CREDITS_ROUTING_KEY;

    const msg = JSON.stringify({
        action: 'update',
        data: { userID: userId, creditsChange: amount }
    });


    channel.publish(exchange, routingKey, Buffer.from(msg), { persistent: true });
    channel.publish(exchange, usersRoutingKey, Buffer.from(msg), { persistent: true });
    console.log(`Credit addition message published for user ${userId}`);
};

module.exports = {
    setupRabbitMQ,
    publishCreditAdded
};
