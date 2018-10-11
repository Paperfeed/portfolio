import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import TabContainer from './components/Tab/Tab.js';
import PhotoGallery from './scenes/Gallery/Gallery.js';
import Blog from './scenes/Blog/Blog.js';
import Portfolio from './scenes/Portfolio/Portfolio.js';
import {ThemeProvider} from 'styled-components';
import './styling/App.css';


const theme = {
    mainColor: '#2D445D',
    secondColor: '#4173A9',
    thirdColor: '#6385A9',
    fourthColor: '#d9a23b',
    fifthColor: '#5D4B2D',
    tabColor: 'white',
    tabNavColor: '#dde3ef',
    titleFont: '\'Montserrat\', sans-serif',
    subFont: '\'Dosis\', sans-serif',
    mainFont: '\'Open-Sans\', sans-serif',
};

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
            <ThemeProvider theme={theme}>
            <Router>
                <div className="App">
                    <TabContainer key={'tab-container'} logo='Aldert Vaandering' background={this.getRandomBackground()}>
                        <Blog title='Blog'>Blog</Blog>
                        <PhotoGallery title='Gallery' match='page?' pagination={9}/>
                        <Portfolio title='Portfolio'/>
                    </TabContainer>
                </div>
            </Router>
            </ThemeProvider>
        );
    }
}

export default App;