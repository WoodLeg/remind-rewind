import React from 'react';
import { observer, observable, action } from 'mobx-react';

import Wavesurfer from 'react-wavesurfer';


@observer
export default class AudioComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            play: false,
            pos: 0
        };

        this.handleTogglePlay = this._handleTogglePlay.bind(this);
        this.handlePosChange = this._handlePosChange.bind(this);
    }

    _handleTogglePlay() {
        this.setState({
            play: !this.state.play
        });
    }
    _handlePosChange(e) {
        this.setState({
            pos: e.originalArgs[0]
        });
    }

    componentWillMount() {

    }


    render() {
        return (
            <div className="wave col-xs-12">
                <Wavesurfer
                    audioFile={'/assets/Floydish_Poopy.mp3'}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.play}

                />
                <button onClick={this.handleTogglePlay}>Play</button>
            </div>
        )
    }



}
