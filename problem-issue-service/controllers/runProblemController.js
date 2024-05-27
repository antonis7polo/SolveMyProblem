const Account = require('../models/account');
const Problem = require('../models/problem');
const { publishToSolverQueue, publishCreditsUpdate, publishToSubmissionsQueue } = require('../config/rabbitMQ');
const calculateCost = require('../config/calculateCost');

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

        const decodedParameters = JSON.parse(Buffer.from(problem.inputData.parameters, 'base64').toString('utf-8'));

        // Calculate cost dynamically
        let costOfSolution = calculateCost(decodedParameters);

        console.log(costOfSolution);

        if (account.credits < costOfSolution) {
            return res.status(400).json({ message: "Not enough credits" });
        }

        account.credits -= costOfSolution;
        await account.save();

        await publishCreditsUpdate(userId, -costOfSolution);

        const submissionTimestamp = new Date().toISOString();
        problem.submissionTimestamp = submissionTimestamp;

        await publishToSolverQueue({
            submissionId: problem.submissionId,
            name: problem.name,
            userId: userId,
            inputData: problem.inputData,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt,
            submissionTimestamp: submissionTimestamp,
            costOfSolution: costOfSolution
        });

        await Problem.deleteOne({ submissionId: problemId });
        console.log(`Problem with ID ${problemId} deleted successfully after issuing.`);

        await publishToSubmissionsQueue({
            submissionId: problem.submissionId,
            action: "update",
            status: "in_progress",
            submissionTimestamp: submissionTimestamp
        });

        res.json({ message: "Problem submitted for solving, credits deducted." });

    } catch (error) {
        console.error('Error running problem:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};
