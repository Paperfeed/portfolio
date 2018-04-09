import React, {Component} from 'react';
import logo from './logo.svg';
import TabContainer from './Tab.js';
import './styling/App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.components = [
            [(<div/>), 'About'],
            [(<div/>), 'Gallery'],
            [(<div/>), 'Blog']
        ];
    }

    render() {
        return (
            <div className="App">
                <TabContainer components={this.components}/>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
