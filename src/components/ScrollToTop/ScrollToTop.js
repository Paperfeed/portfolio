import React, {PureComponent} from "react";
import styled from 'styled-components';

class ScrollToTop extends PureComponent {
    constructor(props) {
        super(props);
        this.scrollDiv = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.scrollDiv.current.scrollTo(0, 0);
        }
    }

    render() {
        return (<ScrollDiv innerRef={this.scrollDiv}>{this.props.children}</ScrollDiv>)
    }
}

const ScrollDiv = styled.div`
    height: 100%;
    width: 100%;
    overflow: scroll;
`;

export default ScrollToTop;