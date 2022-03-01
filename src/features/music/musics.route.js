const express = require('express');
const Middleware = require('../../middlewares/logger.middleware')
const router = express.Router();
const Controller = require('./musics.controller')

const logger = new Middleware();
const musicsController = new Controller();

router.get('/album/tracks/:albumId', logger.logger, musicsController.albumTracks);
router.get('/artist/details/:artistId', logger.logger, musicsController.artistDetails);
router.get('/artist/discography/:artistId', logger.logger, musicsController.artistDiscography);
router.get('/tracks/popular/:chart/:country', logger.logger, musicsController.popularTracks);
router.get('/tracks/details/:commonTrackId', logger.logger, musicsController.details);

module.exports = router;