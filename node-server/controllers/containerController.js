const dockerAPI = require('../dockerAPI');

exports.listContainers = async (req, res) => {
  try {
    const { data } = await dockerAPI.get('/containers/json?all=true');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.response.data);
  }
};
exports.inspectContainer = async (req, res) => {
  try {
    const { containerId } = req.params;
    const { data } = await dockerAPI.get(`/containers/${containerId}/json`);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.response.data);
  }
};
exports.pruneContainers = async (req, res) => {
  try {
    const { data } = await dockerAPI.post('/containers/prune');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.response.data);
  }
};
