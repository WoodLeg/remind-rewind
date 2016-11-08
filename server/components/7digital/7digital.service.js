import rp from 'request-promise';
import config from '../../config';

const request = {
    searchArtist: (artist) => {
        let url = 'http://api.7digital.com/1.2/artist/search?q='+ artist+'&country=ww&sort=score%20desc&oauth_consumer_key='+config.API_DIGITAL.oauth_consumer_key+'&pagesize=2';

        let options = {
            uri: url,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        return rp(options);
    }
};


export default request;
