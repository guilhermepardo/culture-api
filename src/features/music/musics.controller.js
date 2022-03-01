const Service = require('./musics.service');

class Controller extends Service {

    async albumTracks(req, res) {
        try {
            const response = await super.albumTracks(req.params.albumId);
            res.send(response);
        } catch (error) {
            throw error;
        }
    }

    async artistDetails(req, res) {
        try {
            const response = await super.artistDetails(req.params.artistId);
            res.send(response);
        } catch (error) {
            throw error;
        }
    }

    async artistDiscography(req, res) {
        try {
            const response = await super.artistDiscography(req.params.artistId);
            res.send(response);
        } catch (error) {
            throw error;
        }
    }

    async popularTracks(req, res) {
        try {
            const response = await super.popularTracks(req.params.chart, req.params.country);
            res.send(response);
        } catch (error) {
            throw error;
        }
    }

    async details(req, res) {
        try {
            const response = await super.details(req.params.commonTrackId);
            res.send(response);
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Controller;