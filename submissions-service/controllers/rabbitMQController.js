// rabbitMQController.js
const Submission = require('../models/submission');
const { publishStatusChange, publishDeletionToResultsService } = require('./publishStatusChange');

async function createOrUpdateSubmission(messageData, channel) {
    const { id, name, userId, username, inputData } = messageData;
    let previousStatus = null;


    if (id) {
        const currentSubmission = await Submission.findById(id);
        if (!currentSubmission) {
            throw new Error('Submission not found');
        }
        previousStatus = currentSubmission.status;

        if (inputData.solver === '') {
            inputData.solver = null;
            inputData.solverMetadata = null;
        }

        if (inputData.parameters === '') {
            inputData.parameters = null;
            inputData.parametersMetadata = null;
        }

        const fullInputData = { ...currentSubmission.inputData, ...inputData };
        const status = (fullInputData.parameters && fullInputData.solver && fullInputData.numVehicles && fullInputData.depot && fullInputData.maxDistance) ? 'ready' : 'not_ready';

        const updatedSubmission = await Submission.findByIdAndUpdate(id, { name, status, userId, username, inputData: fullInputData }, { new: true, runValidators: true });
        await handleStatusChange(previousStatus, updatedSubmission.status, updatedSubmission, channel);
        return updatedSubmission;
    }

    const status = (inputData && inputData.parameters && inputData.solver && inputData.numVehicles && inputData.depot && inputData.maxDistance) ? 'ready' : 'not_ready';
    const newSubmission = new Submission({ name, status, userId, username, inputData });
    await newSubmission.save();
    await handleStatusChange(null, status, newSubmission, channel);
    return newSubmission;
}

async function deleteSubmission(data, channel) {
    const { id } = data;

    try {
        const submission = await Submission.findById(id);
        if (!submission) {
            throw new Error('Submission not found');
        }

        // Check the current status before deletion
        const isReady = submission.status === 'ready';


        // Always delete the submission regardless of its status
        await Submission.findByIdAndDelete(id);
        console.log(`Submission with ID ${id} has been deleted.`);

        // Publish a delete status change if the status was 'ready'
        if (isReady) {
            publishStatusChange(id, 'delete', null, channel);
            console.log(`Delete message published for submission ID ${id} because it was ready.`);
        } else {
            console.log(`Delete message not published for submission ID ${id} because it was not ready.`);
        }

        const isFinished = submission.status === 'completed' || submission.status === 'failed';

        if (isFinished) {
            await publishDeletionToResultsService(id, channel);
            console.log(`Delete message published for submission ID ${id} because it was finished.`);
        } else {
            console.log(`Delete message not published for submission ID ${id} because it was not finished.`);
        }

    } catch (error) {
        console.error(`Failed to delete submission with ID ${id}:`, error);
    }
}


async function updateSubmissionStatus(resultData, channel) {
    const { submissionId, label } = resultData;
    try {
        const currentSubmission = await Submission.findById(submissionId);
        if (!currentSubmission) {
            throw new Error('Submission not found');
        }

        // Determine new status based on the result label
        const newStatus = label === 'success' ? 'completed' : label === 'fail' ? 'failed' : currentSubmission.status;

        if (currentSubmission.status !== newStatus) {
            // Update the submission status and save
            currentSubmission.status = newStatus;
            await currentSubmission.save();
            console.log(`Submission status updated to ${newStatus} for ID: ${submissionId}`);

        }


    } catch (error) {
        console.error(`Error updating submission status for ID ${submissionId}:`, error);
    }
}

async function updateProgressStatus(messageData) {
    const { submissionId, status, submissionTimestamp } = messageData;
    try {
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            throw new Error('Submission not found');
        }

        if (status === 'in_progress' && submission.status !== 'in_progress') {
            submission.status = 'in_progress';
            submission.submissionTimestamp = submissionTimestamp;
            await submission.save();
            console.log(`Submission status updated to 'in progress' for ID: ${submissionId}`);
        } else {
            console.log(`No status update needed for ID: ${submissionId}`);
        }
    } catch (error) {
        console.error(`Error updating submission status for ID ${submissionId}:`, error);
    }
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

module.exports = { createOrUpdateSubmission, updateSubmissionStatus, deleteSubmission, updateProgressStatus };
