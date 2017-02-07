import { observable, action, autorun, whyRun } from 'mobx';
import transport from '../lokka/module.js';

class JamStore {
    @observable songs = [];
    @observable isLoading = false;

    constructor(){
        this.fetchSongs();
    }

    @action fetchSongs() {
        this.isLoading = true;
        transport.query(`
            {
                songs {
                    id
                    name
                    url
                    musicians {
                        id
                        firstName
                        lastName
                        instrument
                    }
                }
            }

        `).then(result => {
            this.isLoading = false;
            this.updateSongs(result.songs);
        });
    }

    @action updateSongs(songs) {
        this.songs = songs;
    }

}

export default new JamStore();
