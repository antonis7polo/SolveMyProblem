require('dotenv').config({ path: '../.env' });
const express = require('express');
const connectDB = require('./config/database');
const { consumeCredits } = require('./config/rabbitMQ')

const app = express();
connectDB().then(() => {
    consumeCredits();  
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, your server is running!');
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});