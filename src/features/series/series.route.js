const express = require('express');
const logger = require('../../middlewares/logger.middleware')
const router = express.Router();
const seriesController = require('./series.controller')

router.get('/popular/:language', logger.logger, seriesController.popular);

module.exports = router;