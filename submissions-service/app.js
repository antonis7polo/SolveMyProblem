const express = require('express');
const cors = require('cors');
const submissions = require('./routes/submissionsRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/', submissions);

app.use((req, res, next ) => { res.status(404).json({message: 'Endpoint not found!'}); })


module.exports = app;
