import { observable, computed, action } from 'mobx';
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


}

export default new JamStore();
