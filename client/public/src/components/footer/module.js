import React from 'react';

export default class FooterComponent extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="col-xs-12 footer">
                <h3 className="footer__title">
                    Coded by Paul Souvestre - Powered by React <img src="/assets/img/react-logo.png" /> and MobX <img src="/assets/img/mobx.png" /> with GraphQL <img src="/assets/img/graphql.png" /> & NodeJS <img src="/assets/img/nodejs.png" />
                </h3>
            </div>
        )
    }

}
