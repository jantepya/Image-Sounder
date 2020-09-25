import React from 'react';
import AudioControls from './jsx/audioControls.jsx';
import ImageDrop from './jsx/imageDrop.jsx';
import Settings from './jsx/settings.jsx';
import './App.css';

export default class App extends React.Component {
    constructor(props) {
        super();

        this.state = {
            img: null
        }
    }

    onImageLoaded = function (imageSrc) {
        this.setState({
            img: imageSrc
        });
    }

    render() {
        return (
            <div className="App">
                <header>
                    <a href="https://jonmadethings.com">
                        <img src="/img/logo.png" height="28" style={{ float: "right" }} alt="" />
                    </a>
                    <a href="https://github.com/jantepya/Image-Sounder">
                        <i className="fa fa-github" aria-hidden="true" style={{ float: "right" }} />
                    </a>
                </header>

                <ImageDrop
                    onImageLoaded={this.onImageLoaded}
                />

                <AudioControls />

                <Settings />
            </div>
        )
    };
}