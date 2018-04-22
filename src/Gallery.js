import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import Lightbox from 'react-images';

import './styling/Gallery.css'

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            width: -1
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
    }

    getAllImages() {
        //const files = require.context("./images", true, /^\.\/.*\.jpg$/);

        const r = require.context('./images', true, /\.(png|jpe?g|svg)$/);
        const files = r.keys().map(r);

        let images = [];
        files.forEach((item) => {
            images.push({src: item.src, height: item.height, width: item.width})
        });

        return images;
    }
    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    }

    render() {
        const images = this.getAllImages();
        const width = this.state.width;

        return (
            <Measure bounds
                     onResize={(contentRect) => this.setState({width: contentRect.bounds.width})}>
                {
                    ({measureRef}) => {
                        let columns;
                        if (width >= 1824) {
                            columns = 4;
                        } else if (width >= 1024) {
                            columns = 3;
                        } else if (width >= 480) {
                            columns = 2;
                        } else {
                            columns = 1;
                        }

                        return (
                            <div ref={measureRef} className='photo-gallery'>
                                <Gallery photos={images} columns={columns} onClick={this.openLightbox}/>
                                <Lightbox images={images}
                                          onClose={this.closeLightbox}
                                          onClickPrev={this.gotoPrevious}
                                          onClickNext={this.gotoNext}
                                          currentImage={this.state.currentImage}
                                          isOpen={this.state.lightboxIsOpen}
                                          backdropClosesModal={true}
                                />
                            </div>
                        );
                    }
                }
            </Measure>
        );
    }
}

export default PhotoGallery;