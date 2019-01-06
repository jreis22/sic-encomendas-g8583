var express = require('express');
var router = express.Router();

const ping_service = require('../services/pingService');

router.get('/', ping_service.ping);

module.exports = router;