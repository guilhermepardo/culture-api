const axios = require('axios');
const Controller = require('./movies.controller');

class Service {

    async movieDetails(movieId, language) {
        try {
            const detailedInfo = await axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);
    
            let genres = [];
    
            for (const genre of detailedInfo.data.genres) {
                genres.push(genre.name)
            }
    
            let productionCountries = [];
    
            for (const productionCountry of detailedInfo.data.production_countries) {
                productionCountries.push({
                    country: productionCountry.iso_3166_1,
                    country: productionCountry.name
                })
            }
    
            let productionCompanies = [];
    
            for (const productionCompany of detailedInfo.data.production_companies) {
                productionCompanies.push(productionCompany.name)
            }
    
            return {
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
            };
        } catch (error) {
            throw {
                _id: 400,
                message: error
            }
        }
    }

    async popular(language, region) {
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
                        prefix: productionCountry.iso_3166_1,
                        name: productionCountry.name
                    })
                }
    
                let productionCompanies = [];
    
                for (const productionCompany of detailedInfo.data.production_companies) {
                    productionCompanies.push(productionCompany.name)
                }
    
                moviesList.push({
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
                });
            }
            return moviesList;
        } catch (error) {
            throw {
                _id: 400,
                message: error
            }
        }
    }

    async trend(timeWindow, language) {
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
                        prefix: productionCountry.iso_3166_1,
                        name: productionCountry.name
                    })
                }
    
                let productionCompanies = [];
    
                for (const productionCompany of detailedInfo.data.production_companies) {
                    productionCompanies.push(productionCompany.name)
                }
    
                moviesList.push({
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
                });
            }
            return moviesList;
        } catch (error) {
            throw {
                _id: 400,
                message: error
            }
        }
    }

    async now(language, region) {
        try {
            let moviesList = [];

            const response = await axios(`https://api.themoviedb.org/3/movie/now_playing?api_key=cf7258ddce5634737986dcc9aadd195d&id=28&language=${language}&page=1&region=${region}`)
            
            for (const item of response.data.results) {
    
                const detailedInfo = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);
    
                let genres = [];
    
                for (const genre of detailedInfo.data.genres) {
                    genres.push(genre.name)
                }
    
                let productionCountries = [];
    
                for (const productionCountry of detailedInfo.data.production_countries) {
                    productionCountries.push({
                        prefix: productionCountry.iso_3166_1,
                        name: productionCountry.name
                    })
                }
    
                let productionCompanies = [];
    
                for (const productionCompany of detailedInfo.data.production_companies) {
                    productionCompanies.push(productionCompany.name)
                }
    
                moviesList.push({
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
                });
            }
            return moviesList;
        } catch (error) {
            throw {
                _id: 400,
                message: error
            }
        }
    }

    async next(language, region) {
        try {
            let moviesList = [];

            const response = await axios(`https://api.themoviedb.org/3/movie/upcoming?api_key=cf7258ddce5634737986dcc9aadd195d&id=28&language=${language}&page=1&region=${region}&page=1`)
            
            for (const item of response.data.results) {
    
                const detailedInfo = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`);
    
                let genres = [];
    
                for (const genre of detailedInfo.data.genres) {
                    genres.push(genre.name)
                }
    
                let productionCountries = [];
    
                for (const productionCountry of detailedInfo.data.production_countries) {
                    productionCountries.push({
                        prefix: productionCountry.iso_3166_1,
                        name: productionCountry.name
                    })
                }
    
                let productionCompanies = [];
    
                for (const productionCompany of detailedInfo.data.production_companies) {
                    productionCompanies.push(productionCompany.name)
                }
    
                moviesList.push({
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
                });
            }
            return moviesList;
        } catch (error) {
            throw {
                _id: 400,
                message: error
            }
        }
    }
    
}

module.exports = Service;