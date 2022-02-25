const service = require('./movies.service');

exports.movieDetails = async (req, res) => {
    try {
        const response = await service.movieDetails(req.params.movieId, req.params.language);
        res.send(response)
    } catch (error) {
        throw error;
    }
}

exports.popular = async (req, res) => {
    try {
        const response = await service.popular(req.params.language, req.params.region);
        res.send(response)
    } catch (error) {
        throw error;
    }
}

exports.trend = async (req, res) => {
    try {
        const response = await service.trend(req.params.timeWindow, req.params.language);
        res.send(response)
    } catch (error) {
        throw error;
    }
}

exports.now = async (req, res) => {
    try {
        const response = await service.now(req.params.language, req.params.region);
        res.send(response)
    } catch (error) {
        throw error;
    }
}

exports.next = async (req, res) => {
    try {
        const response = await service.next(req.params.language, req.params.region);
        res.send(response)
    } catch (error) {
        throw error;
    }
}
