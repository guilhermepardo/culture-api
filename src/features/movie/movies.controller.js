const service = require('./movies.service');
const axios = require("axios");

exports.guide = async (req, res) => {
    try {
        const response = await service.guide();
        res.send(response)
    } catch (error) {
        throw error;
    }
}

exports.list = async (req, res) => {
    try {
        const response = await service.list(req.params.language);
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
