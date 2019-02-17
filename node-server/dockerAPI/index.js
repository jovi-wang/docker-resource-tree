const axios = require('axios');

const client = axios.create({
  baseURL: 'http:/v1.39',
  socketPath: '/var/run/docker.sock'
});

module.exports = {
  get: client.get
};
