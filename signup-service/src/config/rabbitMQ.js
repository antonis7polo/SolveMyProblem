const amqp = require('amqplib');
const { updateUserCredits } = require('../controllers/manageCreditsController');

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

async function consumeCredits() {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();

    const exchange = process.env.CREDITS_EXCHANGE;
    const queue = process.env.CREDITS_QUEUE;
    const routingKey = process.env.CREDITS_ROUTING_KEY;

    await channel.assertExchange(exchange, 'direct', { durable: true });

    await channel.assertQueue(queue, { durable: true });

    await channel.bindQueue(queue, exchange, routingKey);

    console.log(`Listening on ${exchange} exchange, bound to ${queue} queue, with routing key ${routingKey}`);

    channel.consume(queue, async (msg) => {
        if (msg) {
            const { userId, amount } = JSON.parse(msg.content.toString());
            await updateUserCredits(userId, amount);
            channel.ack(msg);
        }
    }, { noAck: false });
}

module.exports = { publishUserCreated, consumeCredits };