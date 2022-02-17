const service = require('./musics.service');

exports.albumTracks = async (req, res) => {
    try {
        const response = await service.albumTracks(req.params.albumId);
        res.send(response);
    } catch (error) {
        throw error;
    }
}

exports.artistDetails = async (req, res) => {
    try {
        const response = await service.artistDetails(req.params.artistId);
        res.send(response);
    } catch (error) {
        throw error;
    }
}

exports.artistDiscography = async (req, res) => {
    try {
        const response = await service.artistDiscography(req.params.artistId);
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
