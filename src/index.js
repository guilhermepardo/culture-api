const express = require('express');
const moviesRoutes = require('./features/movie/movies.route');
const musicsRoutes = require('./features/music/musics.route');
const seriesRoutes = require('./features/series/series.route');


class App {
    constructor() {
        this.app = express();
        this.routes();
    }

    routes() {
        this.app.use('/movies', moviesRoutes);
        this.app.use('/musics', musicsRoutes);
        this.app.use('/series', seriesRoutes);
    }

}

module.exports = new App().app;