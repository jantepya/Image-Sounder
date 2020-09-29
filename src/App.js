import React from 'react';
import AudioControls from './jsx/audioControls.jsx';
import ImageDrop from './jsx/imageDrop.jsx';
import Settings from './jsx/settings.jsx';
import audioWorker from './audioWorker.js';
import WebWorker from './workerSetup.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';

const WIDTH = 440;
const HEIGHT = 400;

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

const getImageData = function (imgData, width, height) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(imgData, 0, 0, width, height);
    return context.getImageData(0, 0, width, height);
}

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            img: null,
            loadProgress: 0,
            audioURL: null,
        }
    
        this.worker = new WebWorker(audioWorker);
        this.worker.addEventListener("message", this.handleConversionProgress);
    }

    handleConversionProgress = (event) => {
        if (event.data.status === "ok") {
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
        else if (event.data.status === "progress") {
            try {
                this.setState({
                    loadProgress: event.data.progress
                });
            } 
            catch (event) {
                console.log("Image Sounder: onprogress error");
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

        if (this.state.img) {
            var imageData = getImageData(this.state.img, WIDTH, HEIGHT)
            var grayBitmap = grayscaleImage(imageData)

            var data = {
                bitmap: grayBitmap,
                wavrate: 44100,
                time: 2,
                minfreq: 200,
                maxfreq: 22000,
                depth: 2,
            }

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

                <ProgressBar animated now={this.state.loadProgress} label={`${this.state.loadProgress}%`} />

                <br />

                <AudioControls
                    onConvertClicked={this.convertImageToAudio}
                    audioURL={this.state.audioURL}
                    isImgLoaded={this.state.img != null}
                />

                <Settings />
            </div>
        )
    };
}