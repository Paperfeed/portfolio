import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import TabContainer from './Tab.js';
import PhotoGallery from './Gallery.js';
import Blog from './Blog.js';
import Portfolio from './Portfolio.js';
import './styling/App.css';

class App extends Component {
    getRandomBackground() {
        // Use webpack sizeof-loader to obtain image size for construction of gallery
        const r = require.context('./images', true, /\.(png|jpe?g|svg)$/);
        const files = r.keys().map(r);

        let images = [];
        files.forEach((item) => {
            images.push({src: item.src, height: item.height, width: item.width});
        });

        return images[Math.floor(Math.random() * images.length) ].src;
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <TabContainer key={'tab-container'} logo='Aldert Vaandering' background={this.getRandomBackground()}>
                        <Blog title='Blog'>Blog</Blog>
                        <PhotoGallery title='Gallery' match='page?' pagination={9} style={{maxWidth: 1200 + 'px'}}/>
                        <Portfolio title='Portfolio'/>
                    </TabContainer>
                </div>
            </Router>
        );
    }
}

export default App;