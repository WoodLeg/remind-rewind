import React from 'react';
import { observable, action, computed } from 'mobx';


class PricingTableStore {
    @observable requesting = false;
    @observable formData = false;
    @observable formFail = false;

    @action updateFormRequesting(bool){
        this.requesting = bool;
    }

    @action updateFormData(data) {
      this.formData = data;
    }

}

export default new PricingTableStore();
