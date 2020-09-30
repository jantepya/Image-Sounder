import React from 'react';

export default class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            sampleRate: 44100,
            time: 2,
            minfreq: 200,
            maxfreq: 22000,
            depth: 2
        }
    }

    getState = function() {
        return this.state;
    }

    validateDecimal = function (event) {

        if (isNaN(event.value) || event.value === "") {
            //   $( "#" + e.id ).val( e.defaultValue );
        }
        else if (parseFloat(event.value) < parseFloat(event.min)) {
            //   $( "#" + e.id ).val( e.min );
        }
        else if (parseFloat(event.value) > parseFloat(event.max)) {
            //   $( "#" + e.id ).val( e.max );
        }
    }

    validateInteger = function (event) {
        // $( "#" + e.id ).val( Math.floor( e.value ) );
    }

    render() {
        return (
            <div id="accordion">
                <div className="card">
                    <a className="card-link" data-toggle="collapse" href="#collapseOne">
                        <div className="card-header">Settings for nerds</div>
                    </a>
                    <div id="collapseOne" className="collapse" data-parent="#accordion" >
                        <div className="card-body">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Sample Rate</th>
                                        <td>
                                            <select name="Sample Rate" id="sample_rate" defaultValue={"48000"}>
                                                <option value="32000">32000 Hz</option>
                                                <option value="44100">44100 Hz</option>
                                                <option value="48000">48000 Hz</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Time</th>
                                        <td>
                                            <input type="number" name="Time" id="sample_duration" min="0.5" max="6" value="2" step="0.5" onChange={this.validateDecimal} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Depth</th>
                                        <td>
                                            <input type="number" name="Depth" id="sample_depth" min="1" max="5" value="2" step="1" onChange={this.validateDecimal} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Min Frequency (Hz)</th>
                                        <td>
                                            <input type="number" name="minfreq" id="minfreq" min="0" max="20000" value="200" step="200" onChange={this.validateDecimal} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Max Frequency (Hz)</th>
                                        <td>
                                            <input type="number" name="maxfreq" id="maxfreq" min="0" max="22000" value="22000" step="200" onChange={this.validateDecimal} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}