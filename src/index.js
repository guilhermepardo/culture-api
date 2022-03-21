const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const moviesRoutes = require('./features/movie/movies.route');
const musicsRoutes = require('./features/music/musics.route');
const seriesRoutes = require('./features/series/series.route');

class App {
    constructor() {
        this.app = express();
        this.routes();
    }

    routes() {
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
        this.app.use('/movies', moviesRoutes);
        this.app.use('/musics', musicsRoutes);
        this.app.use('/series', seriesRoutes);
    }

}

module.exports = new App().app;