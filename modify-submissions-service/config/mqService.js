const amqp = require('amqplib');
require('dotenv').config();

let connection = null;
let channel = null;

async function connectRabbitMQ() {
    if (connection && channel) {
        return channel; // Return the existing channel if already connected
    }

    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        const exchangeName = process.env.EXCHANGE_NAME;

        // Declare a direct exchange
        await channel.assertExchange(exchangeName, 'direct', { durable: true });
        console.log('RabbitMQ correctly connected');


        // Handle connection close
        connection.on("close", (err) => {
            console.error('RabbitMQ connection closed!', err);
            channel = null;
            connection = null;
        });

        // Handle connection errors
        connection.on("error", (err) => {
            console.error('RabbitMQ connection error!', err);
            channel = null;
            connection = null;
        });

        return channel;
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        channel = null;
        connection = null;
        throw error;
    }
}

async function publishToQueue(message) {
    try {
        const channel = await connectRabbitMQ();
        const exchangeName = process.env.EXCHANGE_NAME;
        const routingKey = process.env.ROUTING_KEY;

        // Publish the message to the exchange with the routing key
        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
    } catch (error) {
        console.error('Failed to publish message to queue:', error);
        throw error;
    }
}

module.exports = { publishToQueue };

