import React from 'react';
import { observer } from 'mobx-react';

import PriceColumn from './column.js';
import store from './store';

@observer
export default class PrincingTableComponent extends React.Component {
    constructor() {
        super();

        this.increment = this._increment.bind(this);
        this.decrement = this._decrement.bind(this);
    }

    componentWillMount() {
    }

    render() {
        return (
            <div className="pricing__table col-xs-12">
                <div className="pricing__table-musicians col-xs-12 col-sm-4 col-sm-offset-4">
                    <div className="pricing__table-musicians-container">
                        <div onClick={this.decrement} className="col-xs-2 pricing__table-musicians-button pricing__table-musicians-button--decrement pull-left">&ndash;</div>

                        <div className="col-xs-8 pricing__table-musicians-counter">
                            <div className="pricing__table-musicians-counter-num">{store.musicians}</div>
                        </div>

                        <div onClick={this.increment} className='col-xs-2 pricing__table-musicians-button pricing__table-musicians-button--increment pull-right'>+</div>
                    </div>
                </div>
                <PriceColumn data={store.deaf} style="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 column blue"></PriceColumn>
            </div>
        );
    }


    _increment() {
        store.increment();
    }

    _decrement() {
        store.decrement();
    }


}
