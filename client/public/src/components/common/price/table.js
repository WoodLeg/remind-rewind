import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import PriceColumn from './column.js';
import store from './store';

@observer
export default class PrincingTableComponent extends React.Component {
    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        console.log('Store: ', store.musicians);
    }

    render() {
        return (
            <div className="pricing__table col-xs-12">
                <div className="pricing__table-musicians col-xs-12">
                    <input onChange={this.handleChange} className="pricing__table-musicians-input col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4" />
                </div>
                <PriceColumn title="Deaf" ngMusicians={store.musicians} price="5" data={store.deaf} style="col-xs-12 col-sm-6 col-md-4 col-md-offset-2 col-lg-3 col-lg-offset-3 column blue"></PriceColumn>
                <PriceColumn title="Live" nbMusician={store.musicians} price="10" data={store.live} style="col-xs-12 col-sm-6 col-md-4 col-lg-3 column red"></PriceColumn>
                <DevTools />
            </div>
        );
    }

    handleChange(event){
        store.setMusiciansNumber(event.target.value);
    }


}
