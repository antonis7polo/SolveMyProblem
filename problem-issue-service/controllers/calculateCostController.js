const calculateCost = require('../config/calculateCost');
const Problem = require("../models/problem");

exports.getCost = async (req, res) => {
    try {
        const { problemId } = req.params;

        const problem = await Problem.findOne({ submissionId: problemId });
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        const decodedParameters = JSON.parse(problem.inputData.parameters.toString('utf-8'));

        // Calculate cost dynamically
        let costOfSolution = calculateCost(decodedParameters);


        res.json({ cost: costOfSolution });

    } catch (error) {
        console.error('Failed to run problem:', error);
        res.status(500).json({ message: 'Failed to run problem', error });
    }
};