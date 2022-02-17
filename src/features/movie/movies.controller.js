const service = require('./movies.service');

exports.guide = async (req, res) => {
    try {
        const response = await service.guide();
        res.send(response)
    } catch (error) {
        throw error;
    }
}

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
