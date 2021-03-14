const { AppConfig } = require('../config');

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
server.use(bodyParser.json({ limit: '50mb' }));

server.listen(AppConfig.Port, function() {
  console.log(`SERVER running on port: ${AppConfig.Port}`);
});

module.exports = { server };
