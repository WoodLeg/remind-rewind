import React from 'react';
import { observer } from 'mobx-react';
import Spinner from '../common/spinner/module.js';


import store from './store.js';


@observer
export default class JamComponent extends React.Component {
    constructor() {
        super();

        this.renderSongs = this._renderSongs.bind(this);
    }

    componentWillMount() {
    }

    componentWillReact(){

    }

    render() {
        return (
            <div className="jam col-xs-12">
                <div className="jam__background"></div>
                <div className="jam__filter"></div>
                <div className="jam__title col-xs-12">
                    <h1 className="jam__title-jam col-xs-12">Jam</h1>
                    <h2 className="jam__title-sessions col-xs-12">Sessions</h2>
                </div>
                <div className="col-xs-12 col-md-8 col-md-offset-2 jam__songs-list-container">
                    {this.renderSongs()}
                </div>
            </div>
        )
    }

    _renderSongs(){
        if (store.isLoading){
            return (
                <div className="jam__songs-list-loading">
                    <Spinner></Spinner>
                </div>
            )
        } else {
            return (
                <ul className="jam__songs-list">
                    { store.songs.map((song, index) => {
                        return (
                            <li className="jam__songs-list-item col-xs-12" key={index}>
                                <h3 className="jam__songs-list-item-title">{song.name}</h3>
                                <h5>{song.url}</h5>
                                <h3 className="jam__songs-list-item-musicians-list"> Musicians: </h3>
                                <ul>
                                    {
                                        song.musicians.map((musician, index2) => {
                                            return (
                                                <li key={index2} className="jam__songs-list-item-musicians-list-item">
                                                    {musician.firstName} {musician.lastName} on {musician.instrument}
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                                <div className="jam__songs-list-item-separator"></div>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

}
