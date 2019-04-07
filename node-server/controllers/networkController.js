const dockerAPI = require('../dockerAPI');

exports.listNetworks = async (req, res) => {
  try {
    const { data } = await dockerAPI.get('/networks');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
exports.inspectNetwork = async (req, res) => {
  try {
    const { networkId } = req.params;
    const { data } = await dockerAPI.get(`/networks/${networkId}`);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
exports.pruneNetWorks = async (req, res) => {
  try {
    const { data } = await dockerAPI.post('/networks/prune');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};
