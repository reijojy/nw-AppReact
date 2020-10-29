import React, {Component} from 'react';
import './App.css';
import 'react-clock/dist/Clock.css';
import Clock from 'react-clock';
import Helpit from './Helpit';

class AnalogWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pvm: new Date()
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({
           pvm: new Date()
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div className="analogikello">
                <Clock value={this.state.pvm} />
                <Helpit moduli="AnalogWatch" />
            </div>
    );
  }
}

export default AnalogWatch;
