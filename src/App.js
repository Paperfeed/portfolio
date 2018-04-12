import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import Lightbox from 'react-images';
import TabContainer from './Tab.js';
import './styling/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { width: -1 };
    }

    getAllImages() {
        //const files = require.context('./images', false, /\.(png|jpe?g|svg)$/);
        const files = require.context('./images', false, /\.(png|jpe?g|svg)$/);
        let images = [];

        files.keys().map((item) => {
            images.push({src: files(item)})
        });
        return images;
    }

    render() {
        const images = this.getAllImages();
        const width = this.state.width;

        return (
            <div className="App">
                <TabContainer>
                    <div title='About'>About</div>
                    <Measure title='Gallery' bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
                        {
                            ({measureRef}) => {
                                if (width < 1) {
                                    return <div ref={measureRef}></div>;
                                }
                                let columns = 1;
                                if (width >= 480) {
                                    columns = 2;
                                }
                                if (width >= 1024) {
                                    columns = 3;
                                }
                                if (width >= 1824) {
                                    columns = 4;
                                }
                                return <div ref={measureRef}><Gallery photos={images} columns={columns}/></div>
                            }
                        }
                    </Measure>
                    <div title='Blog'>Blog</div>
                    <div title='Login'>Login</div>
                </TabContainer>
            </div>
        );
    }
}

export default App;
