const axios = require('axios');

exports.albumTracks = async (albumId) => {
    try {
        const album = await axios(`https://api.musixmatch.com/ws/1.1/album.get?album_id=${albumId}&apikey=60efb7850b16a8767bab396e224bcb5f`);
        const albumTracks = await axios(`https://api.musixmatch.com/ws/1.1/album.tracks.get?album_id=${albumId}&page=1&page_size=30&apikey=60efb7850b16a8767bab396e224bcb5f`);

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

        let response = {
            albumId: album.data.message.body.album.album_id,
            albumName: album.data.message.body.album.album_name,
            isSingle: tracks.length > 1 ? false : true,
            releaseDate: album.data.message.body.album.album_release_date,
            rating: album.data.message.body.album.album_rating,
            artistId: album.data.message.body.album.artist_id,
            artistName: album.data.message.body.album.artist_name,
            genres: genres.length > 0 ? genres : null,
            tracks
        }

        return response;
    } catch (error) {
        throw error;
    }
}

exports.artistDetails = async (artistId) => {
    try {
        const artist = await axios(`https://api.musixmatch.com/ws/1.1/artist.get?artist_id=${artistId}&apikey=60efb7850b16a8767bab396e224bcb5f`);

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

        let response = {
            artistId: artist.data.message.body.artist.artist_id,
            artistName: artist.data.message.body.artist.artist_name,
            artistCountry: artist.data.message.body.artist.artist_country,
            artistRating: artist.data.message.body.artist.artist_rating,
            beginYear: artist.data.message.body.artist.begin_date_year != "" ? artist.data.message.body.artist.begin_date_year : null,
            artistTwitter: artist.data.message.body.artist.artist_twitter_url != "" ? artist.data.message.body.artist.artist_twitter_url : null,
            artistCredits: artistCredits.length > 0 ? artistCredits : null
        }
        return response;
    } catch (error) {
        throw error;
    }
}

exports.artistDiscography = async (artistId) => { 
    
    try {
        const artist = await axios(`https://api.musixmatch.com/ws/1.1/artist.get?artist_id=${artistId}&apikey=60efb7850b16a8767bab396e224bcb5f`);

        const albums = await axios(`https://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistId}&s_release_date=desc&page_size=100&g_album_name=1&apikey=60efb7850b16a8767bab396e224bcb5f`)

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

        let response = {
            artistId: artist.data.message.body.artist.artist_id,
            artistName: artist.data.message.body.artist.artist_name,
            artistCountry: artist.data.message.body.artist.artist_country,
            artistRating: artist.data.message.body.artist.artist_rating,
            discography: albumsList.length > 0 ? albumsList : null
        }

        return response;;
    } catch (error) {
        throw error;
    }
}

exports.popularTracks = async (chart, country) => {
    try {

        if (country == 'xw') chart = "hot";

        let tracks = [];
        const musics = await axios(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=${chart}&page=1&page_size=50&country=${country}&apikey=60efb7850b16a8767bab396e224bcb5f`);
        for (const item of musics.data.message.body.track_list) {

            let genres = []

            if (item.track.primary_genres.music_genre_list.length > 0) {
                for (const genre of item.track.primary_genres.music_genre_list) {
                    genres.push(genre.music_genre.music_genre_name)
                }
            }

            let normalize = {
                trackId: item.track.track_id,
                commonTrackId: item.track.commontrack_id,
                trackName: item.track.track_name,
                albumName: item.track.album_name,
                artistId: item.track.artist_id,
                artistName: item.track.artist_name,
                genres: genres.length > 0 ? genres : null,
                hasLyrics: item.track.has_lyrics === 1 ? true : false
            }
            tracks.push(normalize)
        }
        return tracks;
    } catch (error) {
        throw error;
    }
}

exports.details = async (commonTrackId) => {
    try {
        const music = await axios(`https://api.musixmatch.com/ws/1.1/track.get?commontrack_id=${commonTrackId}&apikey=60efb7850b16a8767bab396e224bcb5f`);

        let genres = []

        if (music.data.message.body.track.primary_genres.music_genre_list.length > 0) {
            for (const genre of music.data.message.body.track.primary_genres.music_genre_list) {
                genres.push(genre.music_genre.music_genre_name)
            }
        }

        let normalize = {
            trackId: music.data.message.body.track.track_id,
            commonTrackId: music.data.message.body.track.commontrack_id,
            trackName: music.data.message.body.track.track_name,
            albumName: music.data.message.body.track.album_name,
            artistId: music.data.message.body.track.artist_id,
            artistName: music.data.message.body.track.artist_name,
            genres: genres.length > 0 ? genres : null,
            hasLyrics: music.data.message.body.track.has_lyrics === 1 ? true : false
        }
        return normalize;
    } catch (error) {
        throw error;
    }
}