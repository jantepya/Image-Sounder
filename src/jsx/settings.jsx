import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

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

    handleChange = (event) => {
        if (event?.target) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    render() {
        return (
            <Accordion>
                <Card>
                    <div className="settingsToggle">
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                            Settings for nerds
                        </Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th>Sample Rate</th>
                                        <td>
                                            <select name="sampleRate" value={this.state.sampleRate} onChange={this.handleChange}>
                                                <option value="32000">32000 Hz</option>
                                                <option value="44100">44100 Hz</option>
                                                <option value="48000">48000 Hz</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Time</th>
                                        <td>
                                            <input type="number" name="time" min="0.5" max="6" value={this.state.time} step="0.5" onChange={this.handleChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Depth</th>
                                        <td>
                                            <input type="number" name="depth" min="1" max="5" value={this.state.depth} step="1" onChange={this.handleChange} />
                                        </td>
                                    </tr>

                                    <tr>
                                        <th>Min Frequency (Hz)</th>
                                        <td>
                                            <input type="number" name="minfreq" min="0" max="20000" value={this.state.minfreq} step="200" onChange={this.handleChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Max Frequency (Hz)</th>
                                        <td>
                                            <input type="number" name="maxfreq" min="0" max="22000" value={this.state.maxfreq} step="200" onChange={this.handleChange} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}