const express = require('express');
const { getAllImages, getSingleImage } = require('../controllers/imageController');

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', getAllImages);

// define the about route
router.get('/:imageId', getSingleImage);

module.exports = router;
