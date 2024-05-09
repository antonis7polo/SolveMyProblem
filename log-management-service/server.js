// log-management-service/server.js
const http = require('http');
const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/database');

const port = process.env.PORT || 3004;
const server = http.createServer(app);

connectDB();

server.listen(port, () => console.log(`Log Management Service running on port ${port}`));
