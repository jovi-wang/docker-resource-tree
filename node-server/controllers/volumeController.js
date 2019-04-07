const dockerAPI = require('../dockerAPI');

exports.listVolumes = async (req, res) => {
  try {
    const { data } = await dockerAPI.get('/volumes');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
exports.inspectVolume = async (req, res) => {
  try {
    const { volumeId } = req.params;
    const { data } = await dockerAPI.get(`/volumes/${volumeId}`);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
exports.pruneVolumes = async (req, res) => {
  try {
    const { data } = await dockerAPI.post('/volumes/prune');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
