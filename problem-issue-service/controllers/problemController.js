//problemController.js

const Problem = require('../models/problem');

exports.createProblem = async (problemData) => {
    const newProblem = new Problem(problemData);
    return await newProblem.save();
};

exports.deleteProblem = async (submissionId) => {
    return Problem.deleteOne({submissionId: submissionId});
};

exports.updateProblem = async (data) => {
    return Problem.findOneAndUpdate({submissionId: data.submissionId}, data, {new: true});
};

