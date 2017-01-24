import React from 'react';
import {Link} from 'react-router';

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
                        <li className="menu__list-item"><Link to="/">Home</Link></li>
                        <li className="menu__list-item"><Link to="/gears">Gears</Link></li>
                        <li className="menu__list-item"><Link to="/calendar">Calendar</Link></li>
                        <li className="menu__list-item"><Link to="/login">Login</Link></li>
                        <li className="menu__list-item"><Link to="/signup">Signup</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}
