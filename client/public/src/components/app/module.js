import React from 'react';
import { Link } from 'react-router';

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
                    <div className="menu__logo col-xs-4 pull-left">
                        <img src="/assets/img/RRnb.png" />
                    </div>
                    <ul className="menu__list col-xs-8 pull-right">
                        <li className="menu__list-item col-md-2"><Link to="/jam-sessions">Jam</Link></li>
                        <li className="menu__list-item col-md-2"><Link to="/">Accueil</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}


    //
    // <li className="menu__list-item col-md-2"><Link to="/artists">Artists</Link></li>
    // <li className="menu__list-item col-md-2"><Link to="/gears">Gears</Link></li>
    // <li className="menu__list-item col-md-2"><Link to="/jam-sessions">Jam</Link></li>
    // <li className="menu__list-item col-md-2"><Link to="/">Home</Link></li>
