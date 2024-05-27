const http = require('http');
const app = require('./app');
const { setupRabbitMQ } = require('./config/rabbitMQ');
require('dotenv').config();

const port = process.env.PORT || 3004;

const startServer = async () => {
    try {
        await setupRabbitMQ();
        console.log('RabbitMQ setup complete');

        const server = http.createServer(app);
        server.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error('Failed to set up RabbitMQ:', error);
        process.exit(1); // Exit the process if RabbitMQ setup fails
    }
};

startServer();
