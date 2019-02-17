const express = require('express');
const cors = require('cors');

const app = express();

const images = require('./routes/image');

app.use('/images', images);

app.use(cors());

module.exports = app;
