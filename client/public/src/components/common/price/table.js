import React from 'react';

import PriceColumn from './column.js';

export default class PrincingTableComponent extends React.Component {
    constructor() {
        super();

        this.state = {nbMusician: ''};
        this.handleChange = this.handleChange.bind(this);
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
            <div className="pricing__table col-xs-12">
                <div className="pricing__table-musicians col-xs-12">
                    <input value={this.state.nbMusician} onChange={this.handleChange} className="pricing__table-musicians-input col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4" />
                </div>
                <PriceColumn title="Deaf" ngMusicians={this.state.nbMusician} price="5" data={this.deaf} style="col-xs-12 col-sm-6 col-md-4 col-md-offset-2 col-lg-3 col-lg-offset-3 column blue"></PriceColumn>
                <PriceColumn title="Live" nbMusician={this.state.nbMusician} price="10" data={this.live} style="col-xs-12 col-sm-6 col-md-4 col-lg-3 column red"></PriceColumn>
            </div>
        );
    }

    handleChange(event){
        this.setState({nbMusician: event.target.value})
    }


}
