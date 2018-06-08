import React, {Component} from 'react';
import styled from 'styled-components';
import Lightbox from 'react-images';
import Photo from './Photo.js';

import { withRouter } from 'react-router'
import PaginatedNav from '../../components/PaginatedNav/PaginatedNav.js'

/**
 * This component constructs a gallery (react-photo-gallery) out of the images in the images directory.
 * It will change the amount of columns based on the width of the container (using react-measure)
 * and includes a lightbox from react-images
 *
 * Image index is stored in the data-index attribute and loaded by lightbox on click.
 *
 * It will also automatically paginate the gallery and synchronize the pages with the user's position in the lightbox.
**/

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            currentPage: this.props.match.params.page ? (this.props.match.params.page - 1) : 0,
            lightboxIsOpen: false,
            columns: 4
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);

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

    openLightbox(event) {
        this.setState({
            currentImage: parseInt(event.target.dataset.index, 10),
            lightboxIsOpen: true
        });
    }

    closeLightbox() {
        // If user has browsed through images not shown on current page, automatically load the page that image is on
        console.log('Currently on page: ' + this.props.match.params.page, 'Currently stored state page: ' + this.state.currentPage);
        if ((this.props.match.params.page ? this.props.match.params.page - 1 : 0) !== this.state.currentPage) {
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

    render() {
        const galleryImages = this.getPaginatedImages(this.state.currentPage);
        const {currentImage, currentPage, lightboxIsOpen} = this.state;
        const {pagination, columns} = this.props;

        return (
            <GalleryWrapper>
                <PhotoGrid>
                    { galleryImages.map((photo, index) => {
                        return (
                            <Photo {...photo}
                                       onClick={this.openLightbox}
                                       i={index}
                                       key={index}
                                       pagination={pagination}
                                       columns={columns}
                                       data-index={(currentPage * pagination) + index}
                            />
                        )
                    })}
                </PhotoGrid>
                <Lightbox images={this.images}
                          onClose={this.closeLightbox}
                          onClickPrev={this.gotoPrevious}
                          onClickNext={this.gotoNext}
                          currentImage={currentImage}
                          isOpen={lightboxIsOpen}
                          backdropClosesModal={true}
                />
                <PaginatedNav length={this.images.length / this.props.pagination} path={this.path} />
            </GalleryWrapper>
        );
    }
}

const GalleryWrapper = styled.div`
  margin: 1rem;
`;

const PhotoGrid = styled.div`
    display: grid;
    justify-content: center;
    grid-auto-flow: dense;
    grid-template-columns: repeat(12, var(--cellWidth));
    grid-auto-rows:  var(--cellWidth);
    background: #222;
  
    @media (min-width: 960px) {
        --cellWidth: 5.3vw;
    }
`;

PhotoGallery.defaultProps = {
    pagination: 9
};

export default withRouter(PhotoGallery);