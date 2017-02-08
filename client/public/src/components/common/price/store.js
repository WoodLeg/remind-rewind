import React from 'react';
import { observable, action, computed } from 'mobx';


class PricingTableStore {
    @observable musicians = 0;
    musicianPrice = 5;
    features = [
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


    @action increment(){
        if(this.musicians >= 6){
            return;
        }
        this.musicians++;
    }

    @action decrement() {
        if (this.musicians <= 0) {
            return;
        }
        this.musicians--;
    }

    @computed get fullPrice() {
        if (this.musicians === 0) {
            return 0;
        }
        return (this.musicians * this.musicianPrice) + this.featurePrice();
    }

    featurePrice() {
        let price = 0;
        for (let i = 0; i < this.features.length; i++) {
            price += this.features[i].price;
        }
        return price;
    }



}

export default new PricingTableStore();
