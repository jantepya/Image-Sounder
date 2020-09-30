import React from 'react';
import AudioControls from './jsx/audioControls.jsx';
import ImageDrop from './jsx/imageDrop.jsx';
import Settings from './jsx/settings.jsx';
import AudioWorker from './audioWorker.js';
import WebWorker from './workerSetup.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';

const grayscaleImage = function (imageData) {
    var newImageData = new ImageData(imageData.width, imageData.height);
    var bufferSize = 4 * imageData.width * imageData.height;

    if (imageData.data) {
        for (var i = 0; i < bufferSize; i += 4) {
            var r = imageData.data[i];
            var g = imageData.data[i + 1];
            var b = imageData.data[i + 2];
            var a = imageData.data[i + 3];

            var gray = 0;
            if (a !== 0) {
                gray = 0.21 * r + 0.72 * g + 0.07 * b;
            }

            newImageData.data[i] = gray;
            newImageData.data[i + 1] = gray;
            newImageData.data[i + 2] = gray;
            newImageData.data[i + 3] = a;
        }
    }
    return newImageData;
}

const getImageData = function (imgData) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.canvas.width = imgData.width;
    context.canvas.height = imgData.height;
    context.drawImage(imgData, 0, 0);
    return context.getImageData(0, 0, imgData.width, imgData.height);
}

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            img: null,
            loadProgress: 0,
            audioURL: null,
        }    
    }

    componentDidMount = function() {
        this.settings = React.createRef();
        this.worker = new WebWorker(AudioWorker);
        this.worker.addEventListener("message", this.handleConversionProgress);
        this.worker.addEventListener("error", this.handleConversionError);
    }

    handleConversionError = (event) => {
        console.log(event);
    }

    handleConversionProgress = (event) => {
        if (event.data.status === "progress") {
            try {
                if (event.data.progress % 10 === 0) {
                    this.setState({
                        loadProgress: event.data.progress
                    });
                }
            }
            catch (event) {
                console.log("Image Sounder: onprogress error");
            }
        }
        else if (event.data.status === "ok") {
            try {
                var audioBlob = event.data.data;
                var url = URL.createObjectURL(audioBlob);
                this.setState({
                    audioURL: url,
                    loadProgress: 0
                });
            } 
            catch (event) {
                console.log("Image Sounder: onload error");
            }
        }
    }

    onImageLoaded = (imageSrc) => {
        var image = new Image();
        image.onload = (imageEvent) => {
            this.setState({
                img: imageEvent.target,
            });
        }
        image.src = imageSrc;
    }

    convertImageToAudio = () => {
        if (!window.Worker) {
            console.log('Your browser doesn\'t support web workers.')
            return;
        }

        if (this.state.img && this.settings?.current) {
            var imageData = getImageData(this.state.img);
            var grayBitmap = grayscaleImage(imageData);

            var data = this.settings.current.state;
            data.bitmap = grayBitmap;

            this.worker.postMessage(data);
        }
    }

    render() {
        return (
            <div className="App container main text-center">
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

                <ProgressBar animated now={this.state.loadProgress} max="100" />

                <br />

                <AudioControls
                    onConvertClicked={this.convertImageToAudio}
                    audioURL={this.state.audioURL}
                    isImgLoaded={this.state.img != null}
                />

                <Settings ref={this.settings}/>
            </div>
        )
    };
}