const axios = require('axios');

module.exports = axios.create({
  baseURL: 'http:/v1.39',
  socketPath: '/var/run/docker.sock'
});
