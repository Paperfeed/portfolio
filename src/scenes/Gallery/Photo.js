import React, {Component} from 'react';
import styled from 'styled-components';
import Animations from '../../services/animations';
import Skeleton from '../../components/Skeleton/Skeleton.js';

/**
 * Will load an image and populate a CSS grid with column width of span 4
 * and height span based on the image's aspect ratio. As such one column is 4 span.
 * You can adjust the grid columns based on multiples of 4
 *
 * It will first load in a skeleton div with a loading animation,
 * once the image has loaded it will fade in, replacing the skeleton.
 */
class Photo extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        };

        this.handleOnLoad = this.handleOnLoad.bind(this);
    }

    handleOnLoad() {
        /*window.setTimeout(()=>
        this.setState({
            isLoading: false
        }),3000)*/
        this.setState({
            isLoading: false
        })
    }

    render() {
        return (
            <Container {...this.props}>
                {this.state.isLoading && <Skeleton {...this.props}/>}
                <StyledImg {...this.props}
                           onLoad={this.handleOnLoad}
                           isLoading={this.state.isLoading}
                />
            </Container>
        );
    }
}



const Container = styled.div.attrs({
    style: props => ({
        gridColumn: 'span 4' /*+ Math.ceil(props.height / props.width)*/,
        gridRow: 'span ' + Math.ceil(4 * (props.height / props.width))
    })
})`
    
`;
const StyledImg = styled.img.attrs({
    style: props => ({
        display: props.isLoading ? 'none' : ''
    })
})`
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${Animations.fadeIn} 1s ease-in-out;
`;

export default Photo;