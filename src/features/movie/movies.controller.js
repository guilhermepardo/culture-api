const Service = require('./movies.service');

class Controller extends Service {

    async movieDetails(req, res) {
        try {
            const response = await super.movieDetails(req.params.movieId, req.params.language);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }

    async popular(req, res) {
        try {
            const response = await super.popular(req.params.language, req.params.region);
            res.send(response)
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async trend(req, res) {
        try {
            const response = await super.trend(req.params.timeWindow, req.params.language);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }

    async now(req, res) {
        try {
            const response = await super.now(req.params.language, req.params.region);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }

    async next(req, res) {
        try {
            const response = await super.next(req.params.language, req.params.region);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new Controller();