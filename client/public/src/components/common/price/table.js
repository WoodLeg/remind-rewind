import React from 'react';

import PriceColumn from './column.js';

export default class PrincingTableComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="princing__table col-xs-12">
                <PriceColumn title="Test" price="5€" style="col-xs-12 col-sm-3 col-sm-offset-3 column" color="#198baa"></PriceColumn>
                <PriceColumn title="Test" price="5€" style="col-xs-12 col-sm-3 column" color="#aa2a19"></PriceColumn>
            </div>
        );
    }

    displayPrice(value) {
        return ( {value} )
    }

}
