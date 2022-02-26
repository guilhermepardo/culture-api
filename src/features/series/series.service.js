const axios = require('axios');

exports.popular = async (language) => {
    try {
        let seriesList = []
        const response = await axios(`https://api.themoviedb.org/3/tv/popular?api_key=cf7258ddce5634737986dcc9aadd195d&language=${language}`)
        for (const item of response.data.results) {

            let serieDetails = await axios(`https://api.themoviedb.org/3/tv/${item.id}?api_key=cf7258ddce5634737986dcc9aadd195d&id=28&language=${language}`)

            let creators = [];

            for (const creator of serieDetails.data.created_by) {
                creators.push(creator.name)
            }

            let genres = [];

            for (const genre of serieDetails.data.genres) {
                genres.push(genre.name)
            }

            let seasons = [];

            for (const season of serieDetails.data.seasons) {
                seasons.push({
                    id: season.id,
                    name: season.name,
                    number: season.season_number,
                    episodesCount: season.episode_count,
                    premiereDate: season.air_date
                })
            }

            let networks = [];

            for (const network of serieDetails.data.networks) {
                networks.push(network.name)
            }

            let productionCompanies = [];

            for (const productionCompany of serieDetails.data.production_companies) {
                productionCompanies.push(productionCompany.name)
            }

            let productionCountries = [];

            for (const productionCountry of serieDetails.data.production_countries) {
                productionCountries.push(productionCountry.name)
            }

            let spokenLanguages = [];

            for (const spokenLanguage of serieDetails.data.spoken_languages) {
                spokenLanguages.push(spokenLanguage.name)
            }

            seriesList.push({
                serieId: item.id,
                originalName: item.original_name,
                name: item.name,
                overview: item.overview != "" ? item.overview : null,
                premiereDate: item.first_air_date,
                inProduction: serieDetails.data.in_production,
                creators: creators.length > 0 ? creators : null,
                genres: genres.length > 0 ? genres : null,
                adult: serieDetails.data.adult,
                popularity: item.popularity,
                seasonsNumber: serieDetails.data.number_of_seasons,
                episodesNumber: serieDetails.data.number_of_episodes,
                episodeRuntime: serieDetails.data.episode_run_time,
                seasons,
                lastEpisode: {
                    id: serieDetails.data.last_episode_to_air.id,
                    date: serieDetails.data.last_episode_to_air.air_date,
                    number: serieDetails.data.last_episode_to_air.episode_number,
                    seasonNumber: serieDetails.data.last_episode_to_air.season_number,
                    name: serieDetails.data.last_episode_to_air.name != "" ? serieDetails.data.last_episode_to_air.name : null,
                    overview: serieDetails.data.last_episode_to_air.overview != "" ? serieDetails.data.last_episode_to_air.overview : null
                },
                nextEpisode: serieDetails.data.next_episode_to_air != null ?  {
                    id: serieDetails.data.next_episode_to_air.id,
                    date: serieDetails.data.next_episode_to_air.air_date,
                    number: serieDetails.data.next_episode_to_air.episode_number,
                    seasonNumber: serieDetails.data.next_episode_to_air.season_number,
                    name: serieDetails.data.next_episode_to_air.name != "" ? serieDetails.data.next_episode_to_air.name : null,
                    overview: serieDetails.data.next_episode_to_air.overview != "" ? serieDetails.data.next_episode_to_air.overview : null
                } : null,
                country: serieDetails.data.origin_country,
                spokenLanguages: spokenLanguages.length > 0 ? spokenLanguages : null,
                networks: networks.length > 0 ? networks : null,
                productionCompanies: productionCompanies.length > 0 ? productionCompanies : null,
                productionCountries: productionCountries.length > 0 ? productionCountries : null
            });
        }
        return seriesList;
    } catch (error) {
        throw error;
    }
}