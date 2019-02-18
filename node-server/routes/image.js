const express = require('express');
const {
  listImages,
  inspectImage,
  pruneImages,
  getImageHistory,
  tagImage
} = require('../controllers/imageController');

const router = express.Router();

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

router.get('/', listImages);
router.get('/:imageId', inspectImage);
router.get('/:imageId/history', getImageHistory);
router.post('/:imageId/tag', tagImage);
router.post('/prune', pruneImages);

module.exports = router;
