const dockerAPI = require('../dockerAPI');

exports.listContainers = async (req, res) => {
  try {
    const { data } = await dockerAPI.get('/containers/json?all=true');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
exports.inspectContainer = async (req, res) => {
  try {
    const { containerId } = req.params;
    const { data } = await dockerAPI.get(`/containers/${containerId}/json`);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
exports.pruneContainers = async (req, res) => {
  try {
    await dockerAPI.post('/containers/prune');
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
