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
        const response = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=cf7258ddce5634737986dcc9aadd195d&page=1&region=${region}&language=${language}`);
        for (const item of response.data.results) {
            let genresNames = [];

            for (const genre of item.genre_ids) {
                const genres = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=cf7258ddce5634737986dcc9aadd195d&id=28&language=${language}`)
                
                genresObject = genres.data.genres;

                let genresInfos = genresObject.filter(function (x) {
                    return x.id === genre
                });

                for (const genreInfo of genresInfos) {
                    genresNames.push(genreInfo.name)
                }
            }

            const detailedInfo = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);

            console.log("detailedInfo:>>", detailedInfo);

            let normalize = {
                movieId: item.id,
                title: item.title,
                originalTitle: item.original_title,
                overview: item.overview,
                genres: genresNames,
                releaseDate: item.release_date,
                adult: item.adult,
                imdbId: detailedInfo.data.imdb_id
            }
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
