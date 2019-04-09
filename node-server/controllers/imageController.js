const dockerAPI = require('../dockerAPI');

exports.listImages = async (req, res) => {
  try {
    const { data } = await dockerAPI.get('/images/json?all=true');
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};

exports.inspectImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { data } = await dockerAPI.get(`/images/${imageId}/json`);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};

exports.getImageHistory = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { data } = await dockerAPI.get(`/images/${imageId}/history`);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};

exports.tagImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { tag, repo } = req.body;
    console.log(tag, repo);
    await dockerAPI.post(`/images/${imageId}/tag?repo=${repo}&tag=${tag}`);
    res.json();
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};

exports.pruneImages = async (req, res) => {
  try {
    const response1 = await dockerAPI.post('/build/prune?all=true');
    console.log(response1.data);
    const { data } = await dockerAPI.post('/images/prune');
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.response.data);
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { data } = await dockerAPI.delete(`/images/${imageId}`);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.response.data);
  }
};
