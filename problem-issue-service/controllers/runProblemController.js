const Account = require('../models/account');
const Problem = require('../models/problem');

const { publishToSolverQueue, publishCreditsUpdate } = require('../utils/rabbitMQ');

const COST_OF_SOLUTION = 10;

exports.runProblem = async (req, res) => {
    try {
        const { problemId } = req.body; // Only problemId is required from the body

        // Fetch problem details
        const problem = await Problem.findOne({ submissionId: problemId });
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        // Extract userId from the problem data
        const userId = problem.userId;


        // Fetch user account to check credits
        const account = await Account.findOne({ userID: userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Check if user has enough credits
        if (account.credits < COST_OF_SOLUTION) {
            return res.status(400).json({ message: "Not enough credits" });
        }

        // Deduct credits and update the account
        account.credits -= COST_OF_SOLUTION;
        await account.save();
        console.log(userId);

        // Publish message to update credits
        await publishCreditsUpdate(userId, -COST_OF_SOLUTION);

        // Publish problem to solver queue including timestamps
        await publishToSolverQueue({
            submissionId: problem.submissionId,
            name: problem.name,
            userId: userId, // retrieved from problem, not request body
            inputData: problem.inputData,
            createdAt: problem.createdAt, // ensuring createdAt is sent
            updatedAt: problem.updatedAt  // ensuring updatedAt is sent
        });

        // Respond to the API call
        res.json({ message: "Problem submitted for solving, credits deducted." });

    } catch (error) {
        console.error('Error running problem:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
