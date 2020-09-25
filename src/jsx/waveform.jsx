import React,  {createRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

// https://stackoverflow.com/questions/44813585/wavesurfer-js-is-working-fine-but-react-wavesurfer-has-issues
export default class Waveform extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = function() {
        this.$el = this.wrapper.current;
        this.$waveform = this.$el.querySelector('.wave')
        this.wavesurfer = WaveSurfer.create({
            container: this.$waveform,
            waveColor: 'violet',
            progressColor: 'purple'
        })

        if (this.props.src !== null || this.props.src !== "")
        {
            this.wavesurfer.load(this.props.src);
        }
    }

    wrapper = createRef();

    componentWillUnmount = function() {

    }

    render() {
        return (
            <div ref={this.wrapper}>
                <div className='wave'></div>
            </div>
        )
    }
}

Waveform.defaultProps = {
    src: ""
}  