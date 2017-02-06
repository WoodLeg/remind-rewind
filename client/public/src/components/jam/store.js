import { observable, computed, action, autorun } from 'mobx';
import transport from '../lokka/module.js';

class JamStore {
    @observable jams = null;
    @observable isLoading = false;

    fetchJams() {
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
            this.jamsLoaded(result);
        });
    }

    @action jamsLoaded(response) {
        console.log('Jam store action: ', response);
    }

    constructor(){
        autorun( _ => {
            this.fetchJams();
        });
    }

}

export default new JamStore();
