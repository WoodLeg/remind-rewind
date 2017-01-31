import React from 'react';

import PriceColumn from './column.js';

export default class PrincingTableComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.deaf = [];
    }

    render() {
        return (
            <div className="princing__table col-xs-12">
                <PriceColumn title="Deaf" price="5" style="col-xs-12 col-sm-6 col-lg-3 col-lg-offset-3 column blue"></PriceColumn>
                <PriceColumn title="Live" price="10" style="col-xs-12 col-sm-6 col-lg-3 column red"></PriceColumn>
            </div>
        );
    }

    displayPrice(value) {
        return ( {value} )
    }

}
