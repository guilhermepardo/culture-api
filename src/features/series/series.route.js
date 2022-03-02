const express = require('express');
const logger = require('../../middlewares/logger.middleware')
const router = express.Router();
const seriesController = require('./series.controller');

router.get('/details/:serieId/:language', logger.logger, seriesController.details);
router.get('/seasons/details/:serieId/:language', logger.logger, seriesController.seasonsDetails);
router.get('/season/details/:serieId/:season/:language', logger.logger, seriesController.seasonDetails);
router.get('/popular/:language', logger.logger, seriesController.popular);

module.exports = router;