import React from 'react';
import AudioControls from './jsx/audioControls.jsx';
import ImageDrop from './jsx/imageDrop.jsx';
import Settings from './jsx/settings.jsx';
import AudioWorker from './audioWorker.js';
import WebWorker from './workerSetup.js';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 900;

/**
 * @param {ImageData} imageData 
 */
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

/**
 * @param {Image} image 
 */
const getImageData = function (image) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = image.width > MAX_WIDTH ? MAX_WIDTH : image.width;
    canvas.height = image.height > MAX_HEIGHT ? MAX_HEIGHT : image.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            img: null,
            loadProgress: 0,
            audioURL: null,
            isConverting: false,
        }
    }

    componentDidMount = function () {
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
                if (event.data.progress === 0 || event.data.progress % 10 === 0) {
                    this.setState({
                        // Adding 10 to account for delay
                        loadProgress: event.data.progress + 10,
                        audioURL: null,
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
                    loadProgress: 0,
                    isConverting: false
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
            this.setState({
                isConverting: true
            });

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
                        <img src="/img/logo.png" height="28" style={{ float: "left" }} alt="" />
                    </a>
                    <a href="https://github.com/jantepya/Image-Sounder">
                        <i className="fa fa-github" aria-hidden="true" style={{ float: "right" }} />
                    </a>
                </header>

                <ImageDrop
                    onImageLoaded={this.onImageLoaded}
                />

                {this.state.isConverting ? <ProgressBar now={this.state.loadProgress} label={this.state.loadProgress + "%"} /> : null}

                <br />

                <AudioControls
                    onConvertClicked={this.convertImageToAudio}
                    audioURL={this.state.audioURL}
                    ConvertButtonEnabled={this.state.img !== null && !this.state.isConverting}
                />

                <Settings ref={this.settings} />

                <hr />

                <footer>
                    <div className="text-center py-3">2020 Jon</div>
                </footer>
            </div>
        )
    };
}