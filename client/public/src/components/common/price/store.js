import React from 'react';
import { observable } from 'mobx';


class PricingTableStore {
    @observable musicians = 0;
    deaf = {
        pricePerMusician: 5,
        features: [
            {
                name: 'Enregistrement',
                price: 2
            },
            {
                name: 'Mix',
                price: 3
            },
            {
                name: 'Mastering',
                price: 0
            }
        ]
    };
    live = {
        pricePerMusician: 10,
        features: [
            {
                name: 'Enregistrement',
                price: 5
            },
            {
                name: 'Mix',
                price: 3
            },
            {
                name: 'Mastering',
                price: 2
            }
        ]
    };


    setMusiciansNumber(number) {
        if (number == '') {
            console.log('yeah');
            this.musicians = 0;
            return;
        }

        if (this.musicians > 6){
            this.musicians = 6
        } else {
            this.musicians = number;
        }
    }

}

export default new PricingTableStore();
