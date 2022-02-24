const axios = require('axios');

exports.movieDetails = async (movieId, language) => {
    try {
        const detailedInfo = await axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);

        let genres = [];

        for (const genre of detailedInfo.data.genres) {
            genres.push(genre.name)
        }

        let productionCountries = [];

        for (const productionCountry of detailedInfo.data.production_countries) {
            productionCountries.push({
                countryPrefix: productionCountry.iso_3166_1,
                countryName: productionCountry.name
            })
        }

        let productionCompanies = [];

        for (const productionCompany of detailedInfo.data.production_companies) {
            productionCompanies.push({
                companyName: productionCompany.name,
                companyCountry: productionCompany.origin_country
            })
        }

        let normalize = {
            movieId: detailedInfo.data.id,
            imdbId: detailedInfo.data.imdb_id,
            title: detailedInfo.data.title,
            originalTitle: detailedInfo.data.original_title,
            overview: detailedInfo.data.overview,
            genres,
            released: detailedInfo.data.status === 'Released' ? true : false,
            releaseDate: detailedInfo.data.release_date,
            runtime: detailedInfo.data.runtime,
            adult: detailedInfo.data.adult,
            tagline: detailedInfo.data.tagline,
            productionCountries,
            productionCompanies,
            budget: detailedInfo.data.budget,
            revenue: detailedInfo.data.revenue
        }
        return normalize;
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

            const detailedInfo = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);

            let genres = [];

            for (const genre of detailedInfo.data.genres) {
                genres.push(genre.name)
            }

            let productionCountries = [];

            for (const productionCountry of detailedInfo.data.production_countries) {
                productionCountries.push({
                    countryPrefix: productionCountry.iso_3166_1,
                    countryName: productionCountry.name
                })
            }

            let productionCompanies = [];

            for (const productionCompany of detailedInfo.data.production_companies) {
                productionCompanies.push({
                    companyName: productionCompany.name,
                    companyCountry: productionCompany.origin_country
                })
            }

            let normalize = {
                movieId: item.id,
                imdbId: detailedInfo.data.imdb_id,
                title: item.title,
                originalTitle: item.original_title,
                overview: item.overview,
                genres,
                released: detailedInfo.data.status === 'Released' ? true : false,
                releaseDate: item.release_date,
                runtime: detailedInfo.data.runtime,
                adult: item.adult,
                tagline: detailedInfo.data.tagline,
                productionCountries,
                productionCompanies,
                budget: detailedInfo.data.budget,
                revenue: detailedInfo.data.revenue
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

exports.trend = async (timeWindow, language) => {
    try {
        let moviesList = [];
        const response = await axios(`https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`)
        for (const item of response.data.results) {

            const detailedInfo = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);

            let genres = [];

            for (const genre of detailedInfo.data.genres) {
                genres.push(genre.name)
            }

            let productionCountries = [];

            for (const productionCountry of detailedInfo.data.production_countries) {
                productionCountries.push({
                    countryPrefix: productionCountry.iso_3166_1,
                    countryName: productionCountry.name
                })
            }

            let productionCompanies = [];

            for (const productionCompany of detailedInfo.data.production_companies) {
                productionCompanies.push({
                    companyName: productionCompany.name,
                    companyCountry: productionCompany.origin_country
                })
            }

            let normalize = {
                movieId: item.id,
                imdbId: detailedInfo.data.imdb_id,
                title: item.title,
                originalTitle: item.original_title,
                overview: item.overview,
                genres,
                released: detailedInfo.data.status === 'Released' ? true : false,
                releaseDate: item.release_date,
                runtime: detailedInfo.data.runtime,
                adult: item.adult,
                tagline: detailedInfo.data.tagline,
                productionCountries,
                productionCompanies,
                budget: detailedInfo.data.budget,
                revenue: detailedInfo.data.revenue
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
