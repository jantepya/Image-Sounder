import React from 'react';
import WaveSurfer from 'wavesurfer.js';

export default class AudioControls extends React.Component {
    constructor() {
        super();

        this.state = {
            playing: false,
            pos: 0,
        };

        this.audioWrapper = React.createRef();
    }

    componentDidMount = function() {
        this.$el = this.audioWrapper.current;
        this.wavesurfer = WaveSurfer.create({
            container: this.$el,
            waveColor: 'grey',
            progressColor: 'hsla(200, 100%, 30%, 0.5)',
            cursorColor: 'blue',
            height: 80,
            responsive: true,
            normalize: true,
        });
    }
    
    handleTogglePlay = () => {
        if (this.wavesurfer) {
            this.wavesurfer.playPause();
        }
    }

    onConvertClicked = () => {
        this.props.onConvertClicked();
    }

    render = function () {

        var isAudioEnabled = this.props.audioURL !== null;

        var download = isAudioEnabled 
            ? <a download href={this.props.audioURL} className="btn btn-success btn-lg text-white"><i className="fa fa-download" aria-hidden="true" /> </a> 
            : null;

        if (this.wavesurfer && this.props.audioURL)
        {
            this.wavesurfer.load(this.props.audioURL);
        }    

        return (
            <div>
                <div ref={this.audioWrapper} />

                <hr />

                <button disabled={!isAudioEnabled} className="btn btn-primary btn-lg " onClick={this.handleTogglePlay}><i className="fa fa-play" aria-hidden="true"></i></button>
                <button disabled={!this.props.ConvertButtonEnabled} className="btn btn-primary btn-lg " onClick={this.onConvertClicked}>Convert</button>

                {download}

                <hr />
            </div>
        );
    }
}