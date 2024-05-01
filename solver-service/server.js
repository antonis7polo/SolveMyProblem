require('dotenv').config();
const rabbitMQ = require('./utils/rabbitMQ');
const SolverController = require('./controllers/solverController');

const solverController = new SolverController();
solverController.connectRabbitMQ().catch(console.error);

async function startServer() {
    try {
        await rabbitMQ.connectRabbitMQ();
        console.log("RabbitMQ connected and consuming messages...");
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

startServer();
