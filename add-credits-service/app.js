const express = require('express');
const cors = require('cors');
const creditRoutes = require('./routes/credits');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use('/credits', creditRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found!' });

});

module.exports = app;

