const service = require('./series.service');

exports.popular = async (req, res) => {
    try {
        const response = await service.popular(req.params.language);
        res.send(response)
    } catch (error) {
        throw error;
    }
}