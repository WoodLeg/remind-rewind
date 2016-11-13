import rp from 'request-promise';
import config from '../../../config';

const request = {
    searchArtist: (artist) => {
        let url = 'http://api.songkick.com/api/3.0/search/artists.json?query='+artist+'&apikey='+config.SONGKICK.api_key;

        let options = {
            uri: url,
            json: true
        };

        return rp(options);
    },
    getEvents : (id) => {
        let url = 'http://api.songkick.com/api/3.0/artists/'+id+'/calendar.json?apikey='+ config.SONGKICK.api_key;

        let options = {
            uri: url,
            json: true
        };

        return rp(options);
    }
};


export default request;
