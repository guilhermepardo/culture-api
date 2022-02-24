const express = require('express');
const logger = require('../../middlewares/logger.middleware')
const router = express.Router();
const moviesController = require('./movies.controller')

router.get('/movieDetails/:movieId/:language', logger.logger, moviesController.movieDetails);
router.get('/popular/:language/:region', logger.logger, moviesController.popular);
router.get('/trend/:timeWindow/:language', logger.logger, moviesController.trend);

module.exports = router;