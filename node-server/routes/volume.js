const express = require('express');
const { listVolumes, inspectVolume, pruneVolumes } = require('../controllers/volumeController');

const router = express.Router();

router.get('/', listVolumes);
router.get('/:volumeId', inspectVolume);
router.post('/prune', pruneVolumes);

module.exports = router;
