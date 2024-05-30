// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const mongoDBUrl = process.env.MONGODB_URL;

async function connectDB() {
    try {
        
        /*await mongoose.connect(mongoDBUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });*/
        await mongoose.connect(mongoDBUrl);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;
