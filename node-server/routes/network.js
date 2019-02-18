const express = require('express');
const { listNetworks, inspectNetwork, pruneNetWorks } = require('../controllers/networkController');

const router = express.Router();

router.get('/', listNetworks);
router.get('/:networkId', inspectNetwork);
router.post('/prune', pruneNetWorks);

module.exports = router;
