import React from 'react';
import WaveSurfer from 'wavesurfer.js';

export default class AudioControls extends React.Component {
    constructor() {
        super();

        this.state = {
            playing: false,
            pos: 0,
        };

        this.wrapper = React.createRef();
    }

    componentDidMount = function() {
        this.$el = this.wrapper.current;
        this.$waveform = this.$el.querySelector('.wave')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple'
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
                <div ref={this.wrapper}>
                    <div className='wave'></div>
                </div>

                <hr />

                <button disabled={!isAudioEnabled} className="btn btn-primary btn-lg " onClick={this.handleTogglePlay}><i className="fa fa-play" aria-hidden="true"></i></button>
                <button disabled={!this.props.isImgLoaded} className="btn btn-primary btn-lg " onClick={this.onConvertClicked}>Convert</button>

                {download}

                <hr />
            </div>
        );
    }
}