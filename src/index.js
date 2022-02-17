const express = require('express');
const app = express();
const moviesRoutes = require('./features/movie/movies.route');

app.use('/movies', moviesRoutes);

const musicsRoutes = require('./features/music/musics.route');
app.use('/musics', musicsRoutes);

module.exports = app;