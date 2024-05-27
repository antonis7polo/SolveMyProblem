require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { publishCreditAdded } = require('../config/rabbitMQ');

exports.addCredits = async (req, res) => {
    const { id, amount, paymentMethodId } = req.body;
    console.log('Adding credits:', id, amount);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirmation_method: 'manual',
            confirm: true,
            return_url: 'http://localhost:4000/submissions' + id,
        });

        if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
            return res.send({
                requiresAction: true,
                clientSecret: paymentIntent.client_secret,
            });
        } else if (paymentIntent.status === 'succeeded') {
            await publishCreditAdded(id, amount);
            res.json({ status: 'success', message: 'Credits addition initiated' });
        } else {
            res.status(500).json({ error: 'Unexpected payment status' });
        }
    } catch (error) {
        console.error('Error handling payment:', error);
        res.status(500).json({ error: 'Payment failed' });
    }
};
