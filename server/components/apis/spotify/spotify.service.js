import config from '../../../config';
import spotify from 'spotify-web-api-node';

const spotifyApi = new spotify({
    clientId : config.SPOTIFY.CLIENT_ID,
    clientSecret : config.SPOTIFY.CLIENT_SECRET,
});


const request = {
    searchArtist: (artist) => {
        return spotifyApi.searchArtists(artist).then((response) => {
            return response.body.artists.items;
        }).catch((reason) => {
            return reason
        });
    },
    getArtist: (id) => {
        return spotifyApi.getArtist(id).then((response) => {
            return response.body;
        }).catch((reason) => {
            return reason;
        })
    },
    getArtistAlbums: (id) => {
        return spotifyApi.getArtistAlbums(id, {limit: 15, type: 'album', market: 'FR'}).then((response) => {
            return response.body.items;
        }).catch((reason) => {
            return reason;
        });
    }
};


export default request;
