const amqp = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';  

async function publishUserCreated(data) {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();

    const exchange = 'user_signup';
    const routingKey = 'user.created';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)));

    console.log(" [x] Sent 'User Created' event");

    setTimeout(() => {
        channel.close();
        conn.close();
    }, 500); 
}

module.exports = { publishUserCreated };
