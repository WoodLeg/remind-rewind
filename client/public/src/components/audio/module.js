import React from 'react';
import { observer, observable, action } from 'mobx-react';
import Wavesurfer from 'react-wavesurfer';
import { InlineSpinner } from '../common/spinner/module.js';


@observer
export default class AudioComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            pos: 0,
            ready: false
        };

        this.handleTogglePlay = this._handleTogglePlay.bind(this);
        this.handlePosChange = this._handlePosChange.bind(this);
        this.onReady = this._onReady.bind(this);
        this.onFinish = this._onFinish.bind(this);
        this.onPlay = this._onPlay.bind(this);
        this.renderWave = this._renderWave.bind(this);
    }

    _handleTogglePlay() {
        this.setState({
            playing: !this.state.playing
        });
    }
    _handlePosChange(e) {
        this.setState({
            pos: e.originalArgs[0]
        });
    }

    _onReady(e) {
        console.log("I'm ready...");
        console.log(e);
        this.setState({
            ready: true
        });
    }

    _onFinish(e){
        console.log("I've finished...");
        console.log(e);
    }

    _onPlay(e){
        console.log("I'm playing...");
        console.log(e);
    }

    componentWillMount() {
        this.url = this.props.url;
        console.log(this.url);
        this.options = {
            height: 100,
            progressColor: '#eda642',
            pixelRatio: 1,
            barWidth: 3,
            reflection: true
        }
    }

    _renderWave() {
        if (!this.state.ready) {
            return (
                <InlineSpinner />
            )
        } else {
            return (
                <button className="pull-left wave-button" onClick={this.handleTogglePlay}>
                    <i className={ (!this.state.playing) ? "fa fa-play" : "fa fa-pause"} aria-hidden="true"></i>
                </button>
            )
        }
    }

    render() {
        return (
            <div className="wave col-xs-12">
                {this.renderWave()}
                <Wavesurfer
                    className="pull-right"
                    audioFile={this.url}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.playing}
                    onReady={this.onReady}
                    onPlay={this.onPlay}
                    onFinish={this.onFinish}
                    options={this.options}
                >
                </Wavesurfer>
            </div>
        )
    }



}
