import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

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
                <DevTools />
                <h1>Jam component</h1>
                {this.renderSongs()}
            </div>
        )
    }

    _renderSongs(){
        if (store.isLoading){
            return (<h2>Loading....</h2>)
        } else {
            return (
                <ul className="jam__songs-list">
                    { store.songs.map((song, index) => {
                        return (
                            <li className="jam__songs-list-item" key={index}>
                                <h3 className="jam__songs-list-item-title">{song.name}</h3>
                                <h5>{song.url}</h5>
                                <h3> Musicians: </h3>
                                <ul>
                                    {
                                        song.musicians.map((musician, index2) => {
                                            return (
                                                <li key={index2}>
                                                    {musician.firstName} {musician.lastName} on {musician.instrument}
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }

}
