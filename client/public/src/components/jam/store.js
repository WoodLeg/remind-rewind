import { observable, computed, action } from 'mobx';
import graphql from '../lokka/module';

class JamStore {
    @observable jams = null;
    @observable isLoading = false;

    @computed get jams() {
        if (this.jams === null) {
            this.fetchJams();
        } else {
            return this.jams;
        }
    }


    fetchJams() {
        this.isLoading = true;
        graphql.query(`
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
