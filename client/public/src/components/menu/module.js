import React from 'react';


export default class MenuComponent extends React.Component {

    constructor() {
        super();

    }

    componentWillMount() {

    }

    render() {
        return(
            <div>
                <div className="menu">
                    <ul className="menu__list">
                        <li className="menu__list-item">Home</li>
                    </ul>
                </div>
                    {this.props.children}
            </div>
        );
    }
}
