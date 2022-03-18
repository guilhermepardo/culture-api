const axios = require('axios');

class Service {

    async details(serieId, language) {
        try {
            const response = await axios(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${process.env.TMDB_KEY}&id=28&language=${language}`);
    
            let creators = [];
    
            for (const creator of response.data.created_by) {
                creators.push(creator.name)
            }
    
            let genres = [];
    
            for (const genre of response.data.genres) {
                genres.push(genre.name)
            }
    
            let seasons = [];
    
            for (const season of response.data.seasons) {
                seasons.push({
                    id: season.id,
                    name: season.name,
                    number: season.season_number,
                    episodesCount: season.episode_count,
                    premiereDate: season.air_date
                })
            }
    
            let networks = [];
    
            for (const network of response.data.networks) {
                networks.push(network.name)
            }
    
            let productionCompanies = [];
    
            for (const productionCompany of response.data.production_companies) {
                productionCompanies.push(productionCompany.name)
            }
    
            let productionCountries = [];
    
            for (const productionCountry of response.data.production_countries) {
                productionCountries.push(productionCountry.name)
            }
    
            let spokenLanguages = [];
    
            for (const spokenLanguage of response.data.spoken_languages) {
                spokenLanguages.push(spokenLanguage.name)
            }
    
            let details = {
                serieId: response.data.id,
                originalName: response.data.original_name,
                name: response.data.name,
                overview: response.data.overview != "" ? response.data.overview : null,
                premiereDate: response.data.first_air_date,
                inProduction: response.data.in_production,
                creators: creators.length > 0 ? creators : null,
                genres: genres.length > 0 ? genres : null,
                adult: response.data.adult,
                popularity: response.data.popularity,
                seasonsNumber: response.data.number_of_seasons,
                episodesNumber: response.data.number_of_episodes,
                episodeRuntime: response.data.episode_run_time,
                seasons,
                lastEpisode: {
                    id: response.data.last_episode_to_air.id,
                    date: response.data.last_episode_to_air.air_date,
                    number: response.data.last_episode_to_air.episode_number,
                    seasonNumber: response.data.last_episode_to_air.season_number,
                    name: response.data.last_episode_to_air.name != "" ? response.data.last_episode_to_air.name : null,
                    overview: response.data.last_episode_to_air.overview != "" ? response.data.last_episode_to_air.overview : null
                },
                nextEpisode: response.data.next_episode_to_air != null ? {
                    id: response.data.next_episode_to_air.id,
                    date: response.data.next_episode_to_air.air_date,
                    number: response.data.next_episode_to_air.episode_number,
                    seasonNumber: response.data.next_episode_to_air.season_number,
                    name: response.data.next_episode_to_air.name != "" ? response.data.next_episode_to_air.name : null,
                    overview: response.data.next_episode_to_air.overview != "" ? response.data.next_episode_to_air.overview : null
                } : null,
                country: response.data.origin_country,
                spokenLanguages: spokenLanguages.length > 0 ? spokenLanguages : null,
                networks: networks.length > 0 ? networks : null,
                productionCompanies: productionCompanies.length > 0 ? productionCompanies : null,
                productionCountries: productionCountries.length > 0 ? productionCountries : null
            }
            return details;
        } catch (error) {
            throw error;
        }
    }

    async seasonsDetails(serieId, language) {
        try {
            const serieDetails = await axios(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${process.env.TMDB_KEY}&id=28&language=${language}`);

            let seasonsCount = [];

            for (const seasonNumber of serieDetails.data.seasons) {
                seasonsCount.push(seasonNumber.season_number)
            }

            let seasons = [];

            let seasonsData = [];

            for (const seasonNumber of seasonsCount) {

                let seasonsDetails = await axios(`https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=${process.env.TMDB_KEY}&id=28&language=${language}`)

                seasonsData.push(seasonsDetails.data)
            }

            for (const season of seasonsData) {
                let episodes = [];

                for (const episode of season.episodes) {
                    let team = [];

                    for (const member of episode.crew) {
                        team.push({
                            name: member.original_name,
                            function: member.job
                        })
                    }

                    let starry = [];

                    for (const starred of episode.guest_stars) {
                        starry.push({
                            id: starred.id,
                            name: starred.original_name,
                            character: starred.character
                        })
                    }

                    episodes.push({
                        id: episode.id,
                        name: episode.name,
                        overview: episode.overview,
                        launchDate: episode.air_date,
                        number: episode.episode_number,
                        team: team.length > 0 ? team : null,
                        starry: starry.length > 0 ? starry : null
                    })
                }

                seasons.push({
                    id: season.id,
                    name: season.name,
                    overview: season.overview != "" ? season.overview : null,
                    number: season.season_number,
                    premiereDate: season.air_date,
                    episodes
                })
            }
            return seasons;
        } catch (error) {
            throw error;
        }
    }

    async seasonDetails(serieId, season, language) {
        try {
            const response = await axios(`https://api.themoviedb.org/3/tv/${serieId}/season/${season}?api_key=${process.env.TMDB_KEY}&id=28&language=${language}`);
    
            let episodes = [];
    
            for (const episode of response.data.episodes) {
                let team = [];
    
                for (const member of episode.crew) {
                    team.push({
                        name: member.original_name,
                        function: member.job
                    })
                }
    
                let starry = [];
    
                for (const starred of episode.guest_stars) {
                    starry.push({
                        id: starred.id,
                        name: starred.original_name,
                        character: starred.character
                    })
                }
    
                episodes.push({
                    id: episode.id,
                    name: episode.name,
                    overview: episode.overview,
                    launchDate: episode.air_date,
                    number: episode.episode_number,
                    team: team.length > 0 ? team : null,
                    starry: starry.length > 0 ? starry : null
                })
            }
    
            return {
                id: response.data.id,
                name: response.data.name,
                overview: response.data.overview != "" ? response.data.overview : null,
                number: response.data.season_number,
                premiereDate: response.data.air_date,
                episodes
            };
        } catch (error) {
            throw error;
        }
    }

    async popular(language) {
        try {
            let seriesList = []
            const response = await axios(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&language=${language}`)
            for (const item of response.data.results) {
    
                let serieDetails = await axios(`https://api.themoviedb.org/3/tv/${item.id}?api_key=${process.env.TMDB_KEY}&id=28&language=${language}`)
    
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
                    nextEpisode: serieDetails.data.next_episode_to_air != null ? {
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

}

module.exports = Service;