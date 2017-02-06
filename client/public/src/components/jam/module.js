import React from 'react';
import { observer } from 'mobx-react';

import store from './store.js';


@observer
export default class JamComponent extends React.Component {
    constructor() {
        super();

        this.renderJams = this._renderJams.bind(this);
    }

    componentWillMount() {

    }

    render() {
        return (
            <div className="jam col-xs-12">
                <h1>Jam component</h1>
                { this.renderJams() }
            </div>
        )
    }

    _renderJams(){
        if (store.isLoading) {
            return ( <h2>Loading </h2> );
        } else {
            return ( <h2>{ store.jams } </h2>)
        }
    }

}
