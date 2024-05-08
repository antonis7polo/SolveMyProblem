//runProblemController.js
const Account = require('../models/account');
const Problem = require('../models/problem');

const { publishToSolverQueue, publishCreditsUpdate, publishToSubmissionsQueue } = require('../utils/rabbitMQ');

const COST_OF_SOLUTION = 10;

exports.runProblem = async (req, res) => {
    try {
        const { problemId } = req.body;

        const problem = await Problem.findOne({ submissionId: problemId });
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }

        const userId = problem.userId;


        const account = await Account.findOne({ userID: userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.credits < COST_OF_SOLUTION) {
            return res.status(400).json({ message: "Not enough credits" });
        }

        account.credits -= COST_OF_SOLUTION;
        await account.save();

        await publishCreditsUpdate(userId, -COST_OF_SOLUTION);

        await publishToSolverQueue({
            submissionId: problem.submissionId,
            name: problem.name,
            userId: userId,
            inputData: problem.inputData,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt
        });

        await Problem.deleteOne({ submissionId: problemId });
        console.log(`Problem with ID ${problemId} deleted successfully after issuing.`);

        await publishToSubmissionsQueue({
            submissionId: problem.submissionId,
            action: "update",
            status: "in_progress"

        });


        res.json({ message: "Problem submitted for solving, credits deducted." });

    } catch (error) {
        console.error('Error running problem:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
