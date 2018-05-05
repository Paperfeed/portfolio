import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import TabContainer from './Tab.js';
import PhotoGallery from './Gallery.js';
import Blog from './Blog.js';
import Portfolio from './Portfolio.js';
import Background from './images/U81uHFwmndGFpeFMze6GTNvnZ2kYJaBTZc7ngex2uFM.jpg'
import './styling/App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <TabContainer key={'tab-container'} logo='Aruderuto' background={Background}>
                        <div title='About'>About</div>
                        <Blog title='Blog' path=''>Blog</Blog>
                        <PhotoGallery title='Gallery' style={{maxWidth: 1200 + 'px'}}/>
                        <Portfolio title='Portfolio'/>
                    </TabContainer>
                </div>
            </Router>
        );
    }
}

export default App;