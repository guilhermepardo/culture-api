const service = require('./musics.service');

exports.artistDetails = async (req, res) => {
    try {
        const response = await service.artistDetails(req.params.artistId);
        res.send(response);
    } catch (error) {
        throw error;
    }
}

exports.popularTracks = async (req, res) => {
    try {
        const response = await service.popularTracks(req.params.chart, req.params.country);
        res.send(response);
    } catch (error) {
        throw error;
    }
}

exports.details = async (req, res) => {
    try {
        const response = await service.details(req.params.commonTrackId);
        res.send(response);
    } catch (error) {
        throw error;
    }
}
