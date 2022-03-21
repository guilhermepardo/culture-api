const Service = require('./movies.service');

class Controller extends Service {

    async movieDetails(req, res) {
        try {
            const response = await super.movieDetails(req.params.movieId, req.params.language);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async popular(req, res) {
        try {
            const response = await super.popular(req.params.language, req.params.region);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async trend(req, res) {
        try {
            const response = await super.trend(req.params.timeWindow, req.params.language);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async now(req, res) {
        try {
            const response = await super.now(req.params.language, req.params.region);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async next(req, res) {
        try {
            const response = await super.next(req.params.language, req.params.region);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

}

module.exports = new Controller();