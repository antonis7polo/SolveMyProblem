const getResultById = async (req, res) => {
    try {
        const result = req.result;  // Get result from request object
        console.log('Result:', result);
        res.json(result);
    } catch (error) {
        console.error('Error retrieving result by submission ID:', error);
        res.status(500).json({ message: 'Error retrieving result', error: error });
    }
};

module.exports = { getResultById };
