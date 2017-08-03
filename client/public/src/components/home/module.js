import React from 'react';
import Scrollchor from 'react-scrollchor';
import { observer } from 'mobx-react';


import ContactForm from '../common/form/contact/contact.js';
import PriceTable from '../common/price/table.js';

import contactStore from '../common/form/contact/store.js';

@observer
export default class HomeComponent extends React.Component {

    constructor() {
        super();

        this.success = contactStore.formData ? true : false;
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
                        <Scrollchor to="#contact-us" animate={{ offset: -60, duration: 600, ease: 'cubic-bezier(0.645, 0.045, 0.355, 1)' }} className="home__header-body-btn">Me contacter</Scrollchor>
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

                <div className="col-xs-12 home__descr">
                    <div className="col-xs-12 home__descr-card-list">

                        <div className="col-xs-12 col-md-offset-1 col-md-5">
                            <div className="home__descr-card music">
                                <div className="home__descr-card-artist-title">
                                    <h1 className="home__descr-card-music-title">Revendiquez votre musique</h1>
                                </div>
                                <div className="home__descr-card-music-text">
                                    Assurez-vous du résultat. Notre objectif est de <strong>vous</strong> permettre de produire votre musique, pas la notre ou celle d''un autre.
                                </div>
                                <div className="home__descr-card-music-pastille shadow-1">
                                    <img src={"/assets/img/animat-essential/checkmark/animat-checkmark-color.gif"} className="home__descr-card-music-pastille-img" />
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-5">
                            <div className="home__descr-card record">
                                <div className="home__descr-card-record-title">
                                    <h1 className="home__descr-card-record-title">Une idée ? Record it !</h1>
                                </div>
                                <div className="home__descr-card-record-text">
                                Un projet pas encore abouti, mais vous voulez pouvoir prendre du recul dessus ? Enregistrez une démo.
                                </div>
                                <div className="home__descr-card-record-pastille shadow-1">
                                    <img src={"/assets/img/animat-essential/lightbulb/animat-lightbulb-color.gif"} className="home__descr-card-record-pastille-img" />
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-offset-1 col-md-5">
                            <div className="home__descr-card price">
                                <div className="home__descr-card-price-title">
                                    <h1 className="home__descr-card-price-title">Prix cassé</h1>
                                </div>
                                <div className="home__descr-card-price-text">
                                    Nous voulons testez de nouveaux moyens de production sur l''industrie de la musique grâce à Internet, nos prix reflètent cette volonté.
                                </div>
                                <div className="home__descr-card-price-pastille shadow-1">
                                    <img src={"/assets/img/animat-essential/diamond/animat-diamond-color.gif"} className="home__descr-card-price-pastille-img" />
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12 col-md-5">
                            <div className="home__descr-card share">
                                <div className="home__descr-card-share-title">
                                    <h1 className="home__descr-card-share-title">Partagez rapidement</h1>
                                </div>
                                <div className="home__descr-card-share-text">
                                    RR Studio vous propose de diffuser gratuitement votre morceau sur une page artiste dédiée. <em>(plusieurs services associés coming soon)</em>
                                </div>
                                <div className="home__descr-card-share-pastille shadow-1">
                                    <img src={"/assets/img/animat-essential/rocket/animat-rocket-color.gif"} className="home__descr-card-share-pastille-img" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-xs-12 home__tarif">
                    <h1 className="home__contact-title col-xs-12">Record !</h1>
                </div>
                <div className="col-xs-12 home__contact">
                    <div className="home__contact-bg"></div>
                    <div className={"col-xs-12 col-sm-6 col-sm-offset-3 home__contact-thanks " + (contactStore.formData ? 'success' : '')}>
                        Merci beaucoup de m'avoir contacté, je vous répondrais le plus rapidement possible, <br />  Il y a de la musique à enregistrer !
                        <img className="home__contact-thanks-img" src="/assets/img/moi.jpg" />
                     </div>
                    <ContactForm grid="col-xs-12 col-sm-6 col-sm-offset-3 col-lg-4 col-lg-offset-4"></ContactForm>
                </div>

            </div>
        );
    }
}
