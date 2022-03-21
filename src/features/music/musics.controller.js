const Service = require('./musics.service');

class Controller extends Service {

    async albumTracks(req, res) {
        /* #swagger.tags = ['Musics'] #swagger.description = 'Get all tracks from an album' */
        try {
            const response = await super.albumTracks(req.params.albumId);
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async artistDetails(req, res) {
        /* #swagger.tags = ['Musics'] #swagger.description = 'Get details from an artist' */
        try {
            const response = await super.artistDetails(req.params.artistId);
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async artistDiscography(req, res) {
        /* #swagger.tags = ['Musics'] #swagger.description = 'Get an artist discography' */
        try {
            const response = await super.artistDiscography(req.params.artistId);
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async popularTracks(req, res) {
        /* #swagger.tags = ['Musics'] #swagger.description = 'Get popular tracks per chart and country' */
        try {
            const response = await super.popularTracks(req.params.chart, req.params.country);
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async details(req, res) {
        /* #swagger.tags = ['Musics'] #swagger.description = 'Get an track details' */
        try {
            const response = await super.details(req.params.commonTrackId);
            res.send(response);
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

}

module.exports = new Controller();