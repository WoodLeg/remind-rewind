import React from 'react';

import PriceColumn from './column.js';

export default class PrincingTableComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.deaf = [
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

        this.live = [
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
    }

    render() {
        return (
            <div className="princing__table col-xs-12">
                <PriceColumn title="Deaf" price="5" data={this.deaf} style="col-xs-12 col-sm-6 col-md-4 col-md-offset-2 col-lg-3 col-lg-offset-3 column blue"></PriceColumn>
                <PriceColumn title="Live" price="10" data={this.live} style="col-xs-12 col-sm-6 col-md-4 col-lg-3 column red"></PriceColumn>
            </div>
        );
    }

    displayPrice(value) {
        return ( {value} )
    }

}
