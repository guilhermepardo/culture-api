const express = require('express');
const router = express.Router();
const moviesController = require('./movies.controller')

router.get('/', moviesController.guide);
router.get('/:language/list', moviesController.list);
router.get('/:language/:region/popular', moviesController.popular);

module.exports = router;