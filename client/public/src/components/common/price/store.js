import React from 'react';
import { observable } from 'mobx';


class PricingTableStore {
    @observable musicians;
    @observable deaf = [
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
    ];
    @observable live = [
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
    ];


    setMusiciansNumber(number) {
        this.musicians = number
    }

}

export default PricingTableStore;
