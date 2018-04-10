import React, {Component} from 'react';
import logo from './logo.svg';
import TabContainer from './Tab.js';
import './styling/App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.tabs = [
            [(<div>About</div>), 'About'],
            [(<div>Gallery</div>), 'Gallery'],
            [(<div>Blog</div>), 'Blog'],
            [(<div>Login</div>), 'Login']
        ];
    }

    render() {
        return (
            <div className="App">
                <TabContainer tabs={this.tabs}/>
            </div>
        );
    }
}

export default App;
