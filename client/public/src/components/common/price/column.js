import React from 'react';
import { observer } from 'mobx-react';

import store from './store.js';

@observer
export default class ColumnComponent extends React.Component {
    constructor(props) {
        super(props);

        this.fullPrice = this._computeFullPrice.bind(this);
        this.musiciansPrice = this._computeMusiciansPrice.bind(this);

    }

    _computeFullPrice(array, musiciansPrice) {
        let price = 0;
        for (let i = 0; i < array.length; i++) {
            price += array[i].price;
        }
        return price + musiciansPrice;
    };

    _computeMusiciansPrice(price, number) {
        return price * number;
    }

    componentWillMount(){
        this.data = this.props.data;
        this.fullMusicianPrice = this.musiciansPrice(this.data.pricePerMusician, store.musicians);
        this.featuresPrice = this.fullPrice(this.data.features, this.fullMusicianPrice);

    }

    componentWillReact() {
        this.fullMusicianPrice = this.musiciansPrice(this.data.pricePerMusician, store.musicians);
        this.featuresPrice = this.fullPrice(this.data.features, this.fullMusicianPrice);
    }

    render() {


        return (
            <div className={this.props.style}>
                <div className="column__container shadow-1">
                    <div className="column__header" >
                        <div className="column__header-background"></div>
                        <div className="column__header-description">
                            pour {store.musicians} musiciens
                        </div>
                        <div className="column__header-price">
                            <div className="column__header-price-background"></div>
                            <h1>{this.props.title}</h1>
                            <div className="column__header-price-body">
                                {this.fullMusicianPrice}€
                            </div>
                        </div>
                    </div>
                    <div className="column__plus">+</div>
                    <div className="column__body">
                        <ul className="col-xs-12">
                            {
                                this.data.features.map((feature, index) => {
                                    return <li key={index} ><span className="pull-left">{feature.name} :</span> <span className="pull-right">{feature.price} €</span></li>;
                                })
                            }
                        </ul>
                        <div className=" column__body-features-price col-xs-12"> = {this.featuresPrice}€</div>
                    </div>
                </div>
            </div>
        )
    }

}
