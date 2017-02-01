import React from 'react';


export default class ColumnComponent extends React.Component {
    constructor(props) {
        super(props);

        this.fullPrice = this._computeFullFeaturePrice.bind(this);
        this.state = {
            musicians: ''
        };

    }

    _computeFullFeaturePrice(array) {
        let price = 0;
        for (var i = 0; i < array.length; i++) {
            price += array[i].price;
        }
        return price;
    };

    componentWillMount(){
        this.features = this.props.data;
        this.featuresPrice = this.fullPrice(this.features);
    }

    render() {
        return (
            <div className={this.props.style}>
                <div className="column__container shadow-1">
                    <div className="column__header" >
                        <div className="column__header-background"></div>
                        <div className="column__header-description">
                            pour {this.state.nbMusician} musiciens
                        </div>
                        <div className="column__header-price">
                            <div className="column__header-price-background"></div>
                            <h1>{this.props.title}</h1>
                            <div className="column__header-price-body">
                                {this.props.price}€
                            </div>
                        </div>
                    </div>
                    <div className="column__plus">+</div>
                    <div className="column__body">
                        <ul className="col-xs-12">
                            {
                                this.features.map((feature, index) => {
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
