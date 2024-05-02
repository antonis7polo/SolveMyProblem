const amqp = require('amqplib');

const publishCreditAdded = async (userId, amount) => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    // Define the exchange and the type
    const exchange = 'creditsExchange';
    const routingKey = 'credit.added';
    
    // Ensure the exchange exists
    await channel.assertExchange(exchange, 'direct', { durable: true });

    // Prepare the message
    const msg = JSON.stringify({ userId, amount });

    // Publish message to the exchange with the specific routing key
    channel.publish(exchange, routingKey, Buffer.from(msg), { persistent: true });
    console.log(" [x] Sent %s to %s", msg, exchange);

    await channel.close();
    await connection.close();
};

exports.addCredits = async (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    await publishCreditAdded(userId, amount);

    res.json({ status: 'success', message: 'Credits addition initiated' });
};
