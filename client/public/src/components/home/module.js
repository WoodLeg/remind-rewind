import React from 'react';


import ContactForm from '../common/form/contact/contact.js';
import PriceTable from '../common/price/table.js';

export default class HomeComponent extends React.Component {

    constructor() {
        super();

    }

    componentWillMount() {

    }

    render() {
        return(
            <div className="home">
                <div className="col-xs-12 home__header">
                    <div className="home__header-img"></div>
                    <div className="col-xs-12 col-sm-6">
                        <h1 className="home__header-title">Remind Rewind Studio</h1>
                        <p className="home__header-body">
                            Un nouveau Home recording studio en proche banlieue parisienne
                        </p>
                    </div>
                </div>
                <div className="col-xs-12 home__deaf">
                    <div className="col-xs-12 col-sm-6 home__deaf-body">
                        <h1 className="home__deaf-body-title">Deaf Experience ! </h1>
                        <div className="home__deaf-body-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="home__deaf-img"></div>
                    </div>
                </div>
                <div className="col-xs-12 home__tarif">
                    <h1 className="home__tarif-title">Tarifs</h1>
                    <PriceTable></PriceTable>
                </div>
                <div className="col-xs-12 home__contact">
                    <div className="home__contact-bg"></div>
                    <h1 className="home__contact-title">Wanna record ?</h1>
                    <ContactForm></ContactForm>
                </div>
            </div>
        );
    }
}
