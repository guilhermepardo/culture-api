const Service = require('./series.service');
class Controller extends Service {

    async details(req, res) {
        /* #swagger.tags = ['Series'] #swagger.description = 'Get details from a serie' */
        try {
            const response = await super.details(req.params.serieId, req.params.language);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async seasonsDetails(req, res) {
        /* #swagger.tags = ['Series'] #swagger.description = 'Get all season details from a serie' */
        try {
            const response = await super.seasonsDetails(req.params.serieId, req.params.language);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async seasonDetails(req, res) {
        /* #swagger.tags = ['Series'] #swagger.description = 'Get a season details from a serie' */
        try {
            const response = await super.seasonDetails(req.params.serieId, req.params.season, req.params.language);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

    async popular(req, res) {
        /* #swagger.tags = ['Series'] #swagger.description = 'Get popular series' */
        try {
            const response = await super.popular(req.params.language);
            res.send(response)
        } catch (error) {
            res.status(error.statusCode).json(error);
        }
    }

}

module.exports = new Controller();