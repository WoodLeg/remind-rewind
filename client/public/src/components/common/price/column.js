import React from 'react';


export default class ColumnComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount(){


    }


    render() {
        return (
            <div className={this.props.style}>
                <div className="column__container shadow-1">
                    <div className="column__header" >
                        <div className="column__header-background"></div>
                        <div className="column__header-description">
                            par Musicien
                        </div>
                        <div className="column__header-price">
                            <div className="column__header-price-background"></div>
                            <h1>{this.props.title}</h1>
                            <div className="column__header-price-body">
                                {this.props.price}€
                            </div>
                        </div>
                    </div>
                    <div className="column__body"></div>
                </div>
            </div>
        )
    }

}
