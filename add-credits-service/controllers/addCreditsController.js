const { publishCreditAdded } = require('../config/rabbitMQ');

exports.addCredits = async (req, res) => {
    const { id, amount } = req.body;
    console.log('Adding credits:', id, amount);

    try {
        await publishCreditAdded(id, amount);
        res.json({ status: 'success', message: 'Credits addition initiated' });
    } catch (error) {
        console.error('Error publishing credit addition:', error);
        res.status(500).json({ error: 'Failed to initiate credit addition' });
    }
};
