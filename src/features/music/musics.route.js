const express = require('express');
const router = express.Router();
const musicsController = require('./musics.controller')

router.get('/album/tracks/:albumId', musicsController.albumTracks);
router.get('/artist/details/:artistId', musicsController.artistDetails);
router.get('/artist/discography/:artistId', musicsController.artistDiscography);
router.get('/tracks/popular/:chart/:country', musicsController.popularTracks);
router.get('/tracks/details/:commonTrackId', musicsController.details);

module.exports = router;