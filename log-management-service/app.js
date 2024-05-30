// log-management-service/app.js
const express = require('express');
const cors = require('cors');
const originAuth = require('./middlewares/originAuthMiddleware');
const logsRoutes = require('./routes/logsRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const { setupRabbitMQ } = require('./config/rabbitMQ');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ['http://localhost:4000']

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

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
