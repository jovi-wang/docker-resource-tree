const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const images = require('./routes/image');
const networks = require('./routes/network');
const volumes = require('./routes/volume');

app.use('/images', images);
app.use('/networks', networks);
app.use('/volumes', volumes);

module.exports = app;
