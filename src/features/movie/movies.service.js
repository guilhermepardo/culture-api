const axios = require('axios');

exports.guide = async () => {
    let genresList = [];
    let response = {};
    try {
        const genres = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=cf7258ddce5634737986dcc9aadd195d&language=pt-BR`);
        for (const item of genres.data.genres) {
            genresList.push(item.name)
        }



        return genresList;
    } catch (error) {
        throw {
            _id: 400,
            message: error
        }
    }
}

exports.list = async (language) => {
    try {
        const response = await axios(`https://api.themoviedb.org/3/movie/550?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);
        return response.data;
    } catch (error) {
        throw {
            _id: 400,
            message: error
        }
    }
}

exports.popular = async (language, region) => {
    try {
        let moviesList = [];
        let genresList = [];
        const response = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=cf7258ddce5634737986dcc9aadd195d&page=1&region=${region}&language=${language}`);
        for (const item of response.data.results) {
            for (const genre of item.genre_ids) {

            }
            let normalize = {
                movieId: item.id,
                title: item.title,
                originalTitle: item.original_title,
                overview: item.overview,
                genres: item.genre_ids,
                releaseDate: item.release_date
            }
            console.log(normalize);
            moviesList.push(normalize);
        }
        return moviesList;
    } catch (error) {
        throw {
            _id: 400,
            message: error
        }
    }
}
