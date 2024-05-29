const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const modifySubmissions = require('./routes/modifySubmissionsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use('/submission', modifySubmissions);

app.use((req, res, next ) => { res.status(404).json({message: 'Endpoint not found!'}); })

module.exports = app;





