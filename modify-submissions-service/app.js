const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const modifySubmissions = require('./routes/modifySubmissionsRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/submission', modifySubmissions);

app.use((req, res, next ) => { res.status(404).json({message: 'Endpoint not found!'}); })

module.exports = app;





