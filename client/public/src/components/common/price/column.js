import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';


import store from './store.js';

@observer
export default class ColumnComponent extends React.Component {
    constructor(props) {
        super(props);

        this.fullPrice = this._computeFullPrice.bind(this);
        this.musiciansPrice = this._computeMusiciansPrice.bind(this);
        this.featurePrice = this._featurePrice.bind(this);

    }

    _computeFullPrice(array, musiciansPrice) {
        let price = 0;
        for (let i = 0; i < array.length; i++) {
            price += this.featurePrice(array[i].price);
        }
        return price + musiciansPrice;
    };

    _computeMusiciansPrice(price, number) {
        return price * number;
    }

    _featurePrice(price) {
        if (store.musicians > 3) {
            return price + (((price * 50) / 100) * store.musicians);
        } else {
            return price;
        }
    }

    componentWillMount(){
        this.data = this.props.data;
    }

    componentWillReact() {
    }

    render() {
        return (
            <div className={this.props.style}>
                <DevTools />
                <div className="column__container shadow-1">
                    <div className="column__header" >
                        <div className="column__header-price">
                            <div className="column__header-price-body">
                                {store.musicianPrice}€
                            </div>
                            <div className="column__header-price-description">
                                Par musicien
                            </div>
                        </div>
                    </div>
                    <div className="column__plus">+</div>
                    <div className="column__body">
                        <ul className="col-xs-12">
                            {
                                store.features.map((feature, index) => {
                                    return <li key={index} ><span className="pull-left">{feature.name} :</span> <span className="pull-right">{this.featurePrice(feature.price)} €</span></li>;
                                })
                            }
                        </ul>
                        <div className=" column__body-features-price col-xs-12">= {store.fullPrice} €</div>
                    </div>
                </div>
            </div>
        )
    }

}
