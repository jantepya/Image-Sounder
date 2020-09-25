import React from 'react';

const DragDropLabel = function () {
    return (
        <div className="align-items-center">
            <span><i className="fa fa-upload fa-5x" aria-hidden="true"></i></span>
            <h3>Drag and drop image</h3>
        </div>
    );
}

export default class ImageDrop extends React.Component {
    constructor(props) {
        super();
        this.state = {
            imageSrc: "",
            fileName: "Choose a file...",
            showDragDropLabel: true,
            dropZoneStyle: null,
        }

        this.readFile = this.readFile.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }

    readFile = function (file) {
        if (file.type === "image/jpeg" || file.type === "image/png") {

            var reader = new FileReader();
            reader.onload = (loadedFile) => {
                this.props.onImageLoaded(loadedFile.target.result);
                this.setState({
                    imageSrc: loadedFile.target.result,
                    fileName: file.name,
                    showDragDropLabel: false,
                    dropZoneStyle: {
                        height: "auto",
                        backgroundColor: "white"
                    }
                });
            }

            reader.readAsDataURL(file);
        }
    }

    dropHandler = function (event) {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
        if (event.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            // If dropped items aren't files, reject them
            if (event.dataTransfer.items[0].kind === 'file') {
                var file = event.dataTransfer.items[0].getAsFile();
                this.readFile(file);
            }
        }
    }

    dragOverHandler = function (event) {
        // Prevent default behavior (Prevent file from being opened)
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="input-group">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" aria-describedby="inputGroupFileAddon01" onChange={e => this.readFile(e.target.files[0])}/>
                        <label id="file_label" className="custom-file-label" htmlFor="inputGroupFile01">{this.state.fileName}</label>
                    </div>
                </div>

                <div id="drop_zone" style={this.state.dropZoneStyle} className="btn btn-primary" onDrop={this.dropHandler} onDragOver={this.dragOverHandler}>
                    {this.state.showDragDropLabel ? <DragDropLabel /> : null}
                    <img src={this.state.imageSrc} id="user_loaded_image" alt="" />
                </div>
            </div>
        );
    }
};