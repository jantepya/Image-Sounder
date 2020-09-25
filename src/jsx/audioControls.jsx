
import React from 'react';
import Waveform from "./waveform.jsx";

export default class AudioControls extends React.Component {
    constructor(props) {
        super();

        this.state = {
            playing: false,
            pos: 0,
            audioFile: null
        };
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
    }
    
    handleTogglePlay() {
        this.setState({
            playing: !this.state.playing
        });
    }

    handlePosChange(e) {
        this.setState({
            pos: e.originalArgs[0]
        });
    }

    convertImageToAudio = function () {

    }

    render = function () {
        return (
            <div>
                <Waveform
                    src={this.state.audioFile}
                />

                <button id="play_pause" className="btn btn-primary btn-lg " onClick={this.handleTogglePlay}><i className="fa fa-play" aria-hidden="true"></i></button>
                <button id="convert" className="btn btn-primary btn-lg " onClick={this.convertImageToAudio}>Convert</button>
                <a href="/#" id="download" className="btn btn-success btn-lg text-white"><i className="fa fa-download" aria-hidden="true" /> </a>
            </div>
        );
    }
}