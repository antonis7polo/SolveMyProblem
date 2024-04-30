// rabbitMQController.js
const Submission = require('../models/Submission');
const { publishStatusChange } = require('./publishStatusChange');

async function createOrUpdateSubmission(messageData, channel) {
    const { id, name, userId, inputData } = messageData;
    let previousStatus = null;

    if (id) {
        const currentSubmission = await Submission.findById(id);
        if (!currentSubmission) {
            throw new Error('Submission not found');
        }
        previousStatus = currentSubmission.status;

        const fullInputData = { ...currentSubmission.inputData, ...inputData };
        const status = (fullInputData.parameters && fullInputData.solver && fullInputData.parameters.trim() !== '' && fullInputData.solver.trim() !== '') ? 'ready' : 'not_ready';

        const updatedSubmission = await Submission.findByIdAndUpdate(id, { name, status, userId, inputData: fullInputData }, { new: true, runValidators: true });
        await handleStatusChange(previousStatus, updatedSubmission.status, updatedSubmission, channel);
        return updatedSubmission;
    }

    const status = (inputData && inputData.parameters && inputData.solver) ? 'ready' : 'not_ready';
    const newSubmission = new Submission({ name, status, userId, inputData });
    await newSubmission.save();
    await handleStatusChange(null, status, newSubmission, channel);
    return newSubmission;
}

function handleStatusChange(previousStatus, newStatus, submission, channel) {
    if (previousStatus !== newStatus) {
        if (previousStatus === 'ready' && newStatus !== 'ready') {
            publishStatusChange(submission._id, 'delete', null, channel);
        } else if (previousStatus !== 'ready' && newStatus === 'ready') {
            publishStatusChange(submission._id, 'insert', submission, channel);
        }
    } else if (previousStatus === 'ready' && newStatus === 'ready') {
        publishStatusChange(submission._id, 'update', submission, channel);
    }
}

module.exports = { createOrUpdateSubmission };
