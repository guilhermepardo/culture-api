const Service = require('./series.service');
class Controller extends Service{

    async details(req, res) {
        try {
            const response = await super.details(req.params.serieId, req.params.language);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }

    async seasonsDetails(req, res) {
        try {
            const response = await super.seasonsDetails(req.params.serieId, req.params.language);
            res.send(response)
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async seasonDetails(req, res) {
        try {
            const response = await super.seasonDetails(req.params.serieId, req.params.season, req.params.language);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }

    async popular(req, res) {
        try {
            const response = await super.popular(req.params.language);
            res.send(response)
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Controller;