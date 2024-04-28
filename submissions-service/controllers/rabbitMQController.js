const Submission = require('../models/Submission');

exports.createOrUpdateSubmission = async (messageData) => {
    try {
        const { id, name, userId, inputData } = messageData;

        // Handle update operations
        if (id) {
            // Fetch the current submission to check existing inputData
            const currentSubmission = await Submission.findById(id);
            if (!currentSubmission) {
                console.log('Submission not found:', id);
                throw new Error('Submission not found');
            }

            // Determine status based on existing and new inputData
            const fullInputData = { ...currentSubmission.inputData, ...inputData };
            let status = 'not_ready';
            if (fullInputData.parameters && fullInputData.solver &&
                fullInputData.parameters.trim() !== '' && fullInputData.solver.trim() !== '') {
                status = 'ready';
            }

            // Update the submission with the new data and determined status
            const updatedSubmission = await Submission.findByIdAndUpdate(id, {
                name, status, userId, inputData: fullInputData
            }, { new: true, runValidators: true });
            console.log('Submission updated:', updatedSubmission);
            return updatedSubmission;
        }

        // Handle new submission creation
        let status = 'not_ready';
        if (inputData && inputData.parameters && inputData.solver) {
            status = 'ready';
        }
        const newSubmission = new Submission({
            name,
            status,
            userId,
            inputData
        });
        await newSubmission.save();
        console.log('New submission created:', newSubmission);
        return newSubmission;
    } catch (error) {
        console.error('Error handling submission data:', error);
        throw error;
    }
};
