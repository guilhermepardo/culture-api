const express = require('express');
const router = express.Router();
const moviesController = require('./movies.controller')

router.get('/', moviesController.guide);
router.get('/movieDetails/:movieId/:language', moviesController.movieDetails);
router.get('/popular/:language/:region', moviesController.popular);

module.exports = router;