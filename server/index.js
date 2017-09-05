const express = require('express');

const app = express();
const config = require('config');

const http = require('http').Server(app);
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./router'));

app.run = () => http.listen(config.port, () => console.log(`Server run on ${config.port} port`));

module.exports = app;
