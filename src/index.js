const express = require('express');
const app = express();
const moviesRoutes = require('./features/movie/movies.route');
const musicsRoutes = require('./features/music/musics.route');
const seriesRoutes = require('./features/series/series.route');

app.use('/movies', moviesRoutes);

app.use('/musics', musicsRoutes);

app.use('/series', seriesRoutes);

module.exports = app;