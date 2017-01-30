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
                    <div className="column__header" style={{backgroundColor: this.props.color}}>
                        <h1>{this.props.title}</h1>
                    </div>
                </div>
            </div>
        )
    }

}
