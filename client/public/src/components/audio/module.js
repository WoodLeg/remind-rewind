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
        this.onReady = this._onReady.bind(this);
        this.onFinish = this._onFinish.bind(this);
        this.onPlay = this._onPlay.bind(this);
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

    _onReady(e) {
        console.log("I'm ready...");
        console.log(e);
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
            progressColor: '#e67e22',
            pixelRatio: 1
        }
        this.timelineOptions = {
            timeInterval: 0.5,
            height: 30,
            primaryFontColor: '#00f',
            primaryColor: '#00f'
        };
    }


    render() {
        return (
            <div className="wave col-xs-12">
                <button className="pull-left wave-button " onClick={this.handleTogglePlay}>{ (this.state.play ? 'Pause' : 'Play')}</button>
                <Wavesurfer
                    className="pull-right"
                    audioFile={this.url}
                    pos={this.state.pos}
                    onPosChange={this.handlePosChange}
                    playing={this.state.play}
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
