const express = require('express');
const {
  listContainers,
  inspectContainer,
  pruneContainers
} = require('../controllers/containerController');

const router = express.Router();

router.get('/', listContainers);
router.get('/:containerId', inspectContainer);
router.post('/prune', pruneContainers);

module.exports = router;
