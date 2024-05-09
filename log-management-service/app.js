// log-management-service/app.js
const express = require('express');
const cors = require('cors');
const originAuth = require('./middlewares/originAuthMiddleware');
const auth = require('./middlewares/authMiddleware');
const logsRoutes = require('./routes/logsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const { setupRabbitMQ } = require('./utils/rabbitMQ');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Apply middleware for request authentication
// app.use(auth);
// app.use(originAuth); // Uncomment if you have the origin middleware

// Setup RabbitMQ (asynchronously)
setupRabbitMQ().then(() => {
    console.log('RabbitMQ setup complete and consuming messages.');
}).catch(error => {
    console.error('Failed to set up RabbitMQ:', error);
});


app.use('/', logsRoutes);
app.use('/', analyticsRoutes);

// Fallback route to handle unknown endpoints
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found!' });
});

module.exports = app;
