const service = require('./series.service');

exports.details = async (req, res) => {
    try {
        const response = await service.details(req.params.serieId, req.params.language);
        res.send(response)
    } catch (error) {
        throw error;
    }
}

exports.seasonsDetails = async (req, res) => {
    try {
        const response = await service.seasonsDetails(req.params.serieId, req.params.language);
        res.send(response)
    } catch (error) {
        throw error;
    }
}

exports.popular = async (req, res) => {
    try {
        const response = await service.popular(req.params.language);
        res.send(response)
    } catch (error) {
        throw error;
    }
}