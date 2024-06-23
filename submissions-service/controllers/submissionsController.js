//submissionsController.js

const Submission = require('../models/submission');
const mongoose = require('mongoose');

// Retrieve submissions by user ID
exports.getSubmissionsByUserId = async (req, res) => {
    const userId = req.params.userId; // The user ID is passed as a URL parameter

    try {
        // Fetch submissions from the database where userId matches
        const submissions = await Submission.find({ userId: userId }).sort({ updatedAt: -1 });
        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions yet.' });
        }
        res.json(submissions);
    } catch (error) {
        // Handle potential errors during database operation
        res.status(500).json({ message: 'Error retrieving submissions', error: error });
    }
};

exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({}).sort({ updatedAt: -1 });
        if(submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found' });
        }
        res.json(submissions); // Send the fetched submissions as a JSON response
    } catch (error) {
        console.error('Error retrieving all submissions:', error);
        res.status(500).json({ message: 'Error retrieving submissions' });
    }
};

exports.getSubmissionDataById = async (req, res) => {
    try {
        const submission = req.submission;
        res.json(submission);
    } catch (error) {
        console.error('Error retrieving submission data:', error);
        res.status(500).json({ message: 'Error retrieving submission data' });
    }
};


