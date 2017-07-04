import React from 'react';
import Scrollchor from 'react-scrollchor';

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
                    <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-6 col-lg-offset-1 col-lg-8">
                        <h1 className="home__header-title">Remind Rewind Studio</h1>
                        <p className="home__header-body">
                            Un nouveau Home recording studio en proche banlieue parisienne
                        </p>
                        <Scrollchor to="#pricing-table" animate={{ offset: -60, duration: 600, ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)' }} className="home__header-body-btn">Voir les prix</Scrollchor>
                    </div>
                </div>
                <div className="col-xs-12 home__streamline">
                    <div className="home__streamline-filter"></div>
                    <div className="home__streamline-img"></div>
                    <div className="col-xs-12 col-md-8 col-md-offset-2 home__streamline-body">
                        <h1 className="home__streamline-body-title"><span className="home__streamline-body-title-big">Streamlinez</span> votre production</h1>
                        <div className="home__streamline-body-content">
                            <p>RemindRewind Studio vous permet de gérer tout le processus de production d'un morceau en entier. Pas besoin d'intéragir avec plusieurs personnes pour que votre morceau voit le jour. <span className="orange">Recording</span>, <span className="orange">Mixing</span>, <span className="orange">Mastering</span>, tout au même endroit.</p>
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 home__props">

                    <div className="col-xs-12 home__props-card-list">
                        <div className="col-xs-12 col-sm-5 col-sm-offset-1 home__props-card-container">
                            <div className="home__props-card">
                                <div className="home__props-card-decoration-orange"></div>
                                <div className="home__props-card-decoration-blue"></div>
                                <div className="home__props-card-header">
                                    <img src={"/assets/img/animat-essential/checkmark/animat-checkmark-color.gif"} className="home__props-card-header-logo  pull-right" />
                                    <h1 className="home__props-card-header-title">Revendiquez votre musique</h1>
                                </div>
                                <hr></hr>
                                <div className="home__props-card-body">
                                    Assurez-vous du résultat. Notre objectif est de <strong>vous</strong> permettre de produire votre musique, pas la notre ou celle d''un autre.
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-5 home__props-card-container">
                            <div className="home__props-card">
                                <div className="home__props-card-decoration-orange"></div>
                                <div className="home__props-card-decoration-pinkish"></div>
                                <div className="home__props-card-header">
                                    <img src={"/assets/img/animat-essential/rocket/animat-rocket-color.gif"} className="home__props-card-header-logo  pull-right" />
                                    <h1 className="home__props-card-header-title">Partagez rapidement</h1>
                                </div>
                                <hr></hr>
                                <div className="home__props-card-body">
                                    RR Studio vous propose de diffuser gratuitement votre morceau sur une page artiste dédiée. <em>(plusieurs services associés coming soon)</em>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-5 col-sm-offset-1 home__props-card-container">
                            <div className="home__props-card">
                                <div className="home__props-card-decoration-orange"></div>
                                <div className="home__props-card-decoration-green"></div>
                                <div className="home__props-card-header">
                                    <img src={"/assets/img/animat-essential/lightbulb/animat-lightbulb-color.gif"} className="home__props-card-header-logo  pull-right" />
                                    <h1 className="home__props-card-header-title">Une idée ? Record it !</h1>
                                </div>
                                <hr></hr>
                                <div className="home__props-card-body">
                                    Un projet pas encore abouti, mais vous voulez pouvoir prendre du recul dessus ? Enregistrez une démo.
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-5 home__props-card-container">
                            <div className="home__props-card">
                                <div className="home__props-card-decoration-orange"></div>
                                <div className="home__props-card-decoration-orangish"></div>
                                <div className="home__props-card-header">
                                    <img src={"/assets/img/animat-essential/diamond/animat-diamond-color.gif"} className="home__props-card-header-logo  pull-right" />
                                    <h1 className="home__props-card-header-title">Prix cassé</h1>
                                </div>
                                <hr></hr>
                                <div className="home__props-card-body">
                                    Nous voulons testez de nouveaux moyens de production sur l''industrie de la musique grâce à Internet, nos prix reflètent cette volonté.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-xs-12 home__tarif">
                    <h1 id="pricing-table" className="home__tarif-title col-xs-12">Tarifs</h1>
                    <h2 className="col-xs-12 home__tarif-subtitle">Combien de musiciens ?</h2>
                    <PriceTable></PriceTable>
                    <h1 className="home__contact-title col-xs-12">Record !</h1>
                </div>
                <div className="col-xs-12 home__contact">
                    <div className="home__contact-bg"></div>
                    <ContactForm></ContactForm>
                </div>

            </div>
        );
    }
}
