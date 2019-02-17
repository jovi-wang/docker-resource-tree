const dockerAPI = require('../dockerAPI');

exports.getAllImages = async (req, res) => {
  try {
    const { data } = await dockerAPI.get('/images/json');
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleImage = (req, res) => {
  console.log(req.params.imageId);
  res.send('Individual image based on id');
};
