const axios = require('axios');

class Service {

    async albumTracks(albumId) {
        try {
            const album = await axios(`https://api.musixmatch.com/ws/1.1/album.get?album_id=${albumId}&apikey=${process.env.MUSIXMATCH_KEY}`);
            
            if (album.data.message.header.status_code == 401) {
                throw {
                    statusCode: 401,
                    message: "Invalid credentials for Musixmatch"
                }
            }

            if (album.data.message.header.status_code == 404) {
                throw {
                    statusCode: 404,
                    message: "Album not found in Musixmatch"
                }
            }

            const albumTracks = await axios(`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${albumId}&page=1&page_size=30&apikey=${process.env.MUSIXMATCH_KEY}`);

            let genres = [];

            if (album.data.message.body.album.primary_genres.music_genre_list.length > 0) {
                for (const genre of album.data.message.body.album.primary_genres.music_genre_list) {
                    genres.push(genre.music_genre.music_genre_name);
                }
            }

            let tracks = [];

            if (albumTracks.data.message.body.track_list.length > 0) {
                for (const trackIndex of albumTracks.data.message.body.track_list) {
                    tracks.push({
                        trackId: trackIndex.track.track_id,
                        commonTrackId: trackIndex.track.commontrack_id,
                        trackName: trackIndex.track.track_name,
                        explicit: trackIndex.track.explicit === 0 ? false : true,
                        rating: trackIndex.track.track_rating,
                    });
                }
            }
            return {
                albumId: album.data.message.body.album.album_id,
                albumName: album.data.message.body.album.album_name,
                isSingle: tracks.length > 1 ? false : true,
                releaseDate: album.data.message.body.album.album_release_date,
                rating: album.data.message.body.album.album_rating,
                artistId: album.data.message.body.album.artist_id,
                artistName: album.data.message.body.album.artist_name,
                genres: genres.length > 0 ? genres : null,
                tracks
            };
        } catch (error) {
            throw error;
        }
    }

    async artistDetails(artistId) {
        try {
            const artist = await axios(`https://api.musixmatch.com/ws/1.1/artist.get?artist_id=${artistId}&apikey=${process.env.MUSIXMATCH_KEY}`);

            if (artist.data.message.header.status_code == 401) {
                throw {
                    statusCode: 401,
                    message: "Invalid credentials for Musixmatch"
                }
            }

            if (artist.data.message.header.status_code == 404) {
                throw {
                    statusCode: 404,
                    message: "Artist not found in Musixmatch"
                }
            }

            let artistCredits = []

            if (artist.data.message.body.artist.artist_credits.artist_list.length > 0) {
                for (const artistCredit of artist.data.message.body.artist.artist_credits.artist_list) {
                    artistCredits.push({
                        artistId: artistCredit.artist.artist_id,
                        artistName: artistCredit.artist.artist_name,
                        artistCountry: artistCredit.artist.artist_country,
                        artistRating: artistCredit.artist.artist_rating,
                        beginYear: artistCredit.artist.begin_date_year != "" ? artistCredit.artist.begin_date_year : null,
                        artistTwitter: artistCredit.artist.artist_twitter_url != "" ? artistCredit.artist.artist_twitter_url : null
                    })
                }
            }
            return {
                artistId: artist.data.message.body.artist.artist_id,
                artistName: artist.data.message.body.artist.artist_name,
                artistCountry: artist.data.message.body.artist.artist_country,
                artistRating: artist.data.message.body.artist.artist_rating,
                beginYear: artist.data.message.body.artist.begin_date_year != "" ? artist.data.message.body.artist.begin_date_year : null,
                artistTwitter: artist.data.message.body.artist.artist_twitter_url != "" ? artist.data.message.body.artist.artist_twitter_url : null,
                artistCredits: artistCredits.length > 0 ? artistCredits : null
            };
        } catch (error) {
            throw error;
        }
    }

    async artistDiscography(artistId) {

        try {
            const artist = await axios(`https://api.musixmatch.com/ws/1.1/artist.get?artist_id=${artistId}&apikey=${process.env.MUSIXMATCH_KEY}`);

            if (artist.data.message.header.status_code == 401) {
                throw {
                    statusCode: 401,
                    message: "Invalid credentials for Musixmatch"
                }
            }

            if (artist.data.message.header.status_code == 404) {
                throw {
                    statusCode: 404,
                    message: "Artist not found in Musixmatch"
                }
            }

            const albums = await axios(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistId}&s_release_date=desc&page_size=100&g_album_name=1&apikey=${process.env.MUSIXMATCH_KEY}`)

            let albumsList = [];

            for (const albumIndex of albums.data.message.body.album_list) {

                let genres = []

                if (albumIndex.album.primary_genres.music_genre_list.length > 0) {
                    for (const genre of albumIndex.album.primary_genres.music_genre_list) {
                        genres.push(genre.music_genre.music_genre_name)
                    }
                }

                albumsList.push({
                    albumId: albumIndex.album.album_id,
                    albumName: albumIndex.album.album_name,
                    releaseDate: albumIndex.album.album_release_date,
                    rating: albumIndex.album.album_rating,
                    copyright: albumIndex.album.album_copyright,
                    label: albumIndex.album.album_label,
                    genres: genres.length > 0 ? genres : null
                })
            }

            return {
                artistId: artist.data.message.body.artist.artist_id,
                artistName: artist.data.message.body.artist.artist_name,
                artistCountry: artist.data.message.body.artist.artist_country,
                artistRating: artist.data.message.body.artist.artist_rating,
                discography: albumsList.length > 0 ? albumsList : null
            };
        } catch (error) {
            throw error;
        }
    }

    async popularTracks(chart, country) {
        try {
            if (country == 'xw') chart = "hot";

            let tracks = [];

            const musics = await axios(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=${chart}&page=1&page_size=50&country=${country}&apikey=${process.env.MUSIXMATCH_KEY}`);

            if (musics.data.message.header.status_code == 401) {
                throw {
                    statusCode: 401,
                    message: "Invalid credentials for Musixmatch"
                }
            }

            for (const item of musics.data.message.body.track_list) {
                let genres = []

                if (item.track.primary_genres.music_genre_list.length > 0) {
                    for (const genre of item.track.primary_genres.music_genre_list) {
                        genres.push(genre.music_genre.music_genre_name)
                    }
                }

                tracks.push({
                    trackId: item.track.track_id,
                    commonTrackId: item.track.commontrack_id,
                    trackName: item.track.track_name,
                    albumName: item.track.album_name,
                    artistId: item.track.artist_id,
                    artistName: item.track.artist_name,
                    genres: genres.length > 0 ? genres : null,
                    hasLyrics: item.track.has_lyrics === 1 ? true : false
                })
            }
            return tracks;
        } catch (error) {
            throw error;
        }
    }

    async details(commonTrackId) {
        try {
            const music = await axios(`https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${commonTrackId}&apikey=${process.env.MUSIXMATCH_KEY}`);

            if (music.data.message.header.status_code == 401) {
                throw {
                    statusCode: 401,
                    message: "Invalid credentials for Musixmatch"
                }
            }

            if (music.data.message.header.status_code == 404) {
                throw {
                    statusCode: 404,
                    message: "Track not found in Musixmatch"
                }
            }

            let genres = []

            if (music.data.message.body.track.primary_genres.music_genre_list.length > 0) {
                for (const genre of music.data.message.body.track.primary_genres.music_genre_list) {
                    genres.push(genre.music_genre.music_genre_name)
                }
            }

            return {
                trackId: music.data.message.body.track.track_id,
                commonTrackId: music.data.message.body.track.commontrack_id,
                trackName: music.data.message.body.track.track_name,
                albumName: music.data.message.body.track.album_name,
                artistId: music.data.message.body.track.artist_id,
                artistName: music.data.message.body.track.artist_name,
                genres: genres.length > 0 ? genres : null,
                hasLyrics: music.data.message.body.track.has_lyrics === 1 ? true : false
            }
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Service;