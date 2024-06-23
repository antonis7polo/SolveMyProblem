const Account = require('../models/account');
const { publishToSolverQueue, publishCreditsUpdate, publishToSubmissionsQueue } = require('../config/rabbitMQ');
const calculateCost = require('../config/calculateCost');
const Problem = require('../models/problem');

exports.runProblem = async (req, res) => {
    try {
        const problem = req.problem;
        const userId = problem.userId;

        const account = await Account.findOne({ userID: userId });
        if (!account) {
            return res.status(404).json({ message: "Not enough credits", error: "Account not found"});
        }

        const decodedParameters = JSON.parse(problem.inputData.parameters.toString('utf-8'));

        let costOfSolution = calculateCost(decodedParameters);


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
            username: problem.username,
            userId: userId,
            inputData: problem.inputData,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt,
            submissionTimestamp: submissionTimestamp,
            costOfSolution: costOfSolution
        });

        await Problem.deleteOne({ submissionId: problem.submissionId });
        console.log(`Problem with ID ${problem.submissionId} deleted successfully after issuing.`);

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