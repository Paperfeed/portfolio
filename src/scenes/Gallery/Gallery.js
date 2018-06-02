import React, {Component} from 'react';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';
import Lightbox from 'react-images';
import Photo from './Photo.js';

import { withRouter } from 'react-router'
import PaginatedNav from '../../components/PaginatedNav/PaginatedNav.js'

import './Gallery.css'

/**
 * This component constructs a gallery (react-photo-gallery) out of the images in the images directory.
 * It will change the amount of columns based on the width of the container (using react-measure)
 * and includes a lightbox from react-images
 *
 * It will also automatically paginate the gallery and synchronize the pages with the user's position in the lightbox
**/

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            currentPage: this.props.match.params.page ? (this.props.match.params.page - 1) : 0,
            columns: 1,
            lightboxIsOpen: false
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.checkWidth = this.checkWidth.bind(this);

        this.images = this.getAllImages();
        this.path = (this.props.path) ? this.props.path : this.props.title;
    }

    getAllImages() {
        // Use webpack sizeof-loader to obtain image size for construction of gallery
        const r = require.context('../../images', true, /\.(png|jpe?g|svg)$/);
        const files = r.keys().map(r);

        let images = [];
        files.forEach((item) => {
            images.push({
                src: item.src,
                height: item.height,
                width: item.width,
                // onLoad: (img) => { img.target.src = item.src}
            });
        });

        return images;
    }

    getPaginatedImages(page) {
        const imagesPerPage = this.props.pagination;
        const currentLocation = page * imagesPerPage;
        return this.images.slice(currentLocation, Math.min(currentLocation + imagesPerPage, this.images.length))
    }

    openLightbox(event, obj) {
        this.setState({
            currentImage: (this.props.pagination * this.state.currentPage) + obj.index,
            lightboxIsOpen: true
        });
    }

    closeLightbox() {
        // If user has browsed through images not shown on current page, automatically load the page that image is on
        if (this.props.match.params.page !== this.state.currentPage) {
            this.props.history.push('/' + this.path + '/' + (this.state.currentPage + 1));
        }

        this.setState({
            lightboxIsOpen: false
        });
    }

    goto(direction) {
        const currentPage = Math.ceil(((this.state.currentImage + direction) + 1) / this.props.pagination) - 1;

        this.setState({
            currentImage: this.state.currentImage + direction,
            currentPage: currentPage
        });
    }

    gotoNext() {
        this.goto(1);
    }

    gotoPrevious() {
        this.goto(-1);
    }

    checkWidth(contentRect) {
        const width = contentRect.bounds.width;

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

        if (columns !== this.state.columns) this.setState({columns: columns});
    }

    render() {
        console.log(this.state);
        const galleryImages = this.getPaginatedImages(this.state.currentPage);
        const {columns, currentImage, lightboxIsOpen} = this.state;

        return (
            <Measure bounds onResize={this.checkWidth}>
                { ({measureRef}) => {
                    return (
                        <div ref={measureRef} className='photo-gallery'>
                            <Gallery photos={galleryImages} columns={columns} onClick={this.openLightbox}/>
                            <Lightbox images={this.images}
                                      onClose={this.closeLightbox}
                                      onClickPrev={this.gotoPrevious}
                                      onClickNext={this.gotoNext}
                                      currentImage={currentImage}
                                      isOpen={lightboxIsOpen}
                                      backdropClosesModal={true}
                            />
                            <PaginatedNav length={this.images.length / this.props.pagination} path={this.path} />
                        </div>
                    );
                }}
            </Measure>
        );
    }
}

PhotoGallery.defaultProps = {
    pagination: 9
};

export default withRouter(PhotoGallery);