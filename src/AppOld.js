import React, {Component} from 'react';
import TabContainer from './Tab.js';
import PhotoGallery from './Gallery.js'

import './styling/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TabContainer key={'tabcontainer'}>
                    <div title='About'>About</div>
                    <div title='Blog'>Blog</div>
                    <PhotoGallery title='Gallery'/>
                    <div title='Login'>Login</div>
                </TabContainer>
            </div>
        );
    }
}

export default App;
