const http = require('http');
const app = require('./app');
require('dotenv').config();
const { setupRabbitMQ } = require('./config/rabbitMQ');
const mongoose = require("mongoose");

const port = process.env.PORT || 3003;
const server = http.createServer(app);

setupRabbitMQ().then(() => {
    console.log('RabbitMQ setup complete and consuming messages.');
}).catch(error => {
    console.error('Failed to set up RabbitMQ:', error);
});
server.listen(port, () => console.log(`Server running on port ${port}`));

mongoose.connect(process.env.MONGO_URI).then(r => console.log('Connected to DB')).catch(e => console.log('Error connecting to DB'));




