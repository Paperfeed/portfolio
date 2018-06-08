import React from 'react';
import styled, {keyframes} from 'styled-components';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * @param {boolean} [useSpinner=false] - Whether or not to display a loading spinner in the center
 *
 * Functional component which returns a skeleton div that animates the entirety of the component it should be replacing
 * Can use useSpinner prop
 */

const Skeleton = (props) => {
    return <StyledSkeleton {...props}>{props.useSpinner && <LoadingSpinner/>}</StyledSkeleton>
};

const GradientAnim = keyframes`
    from { background-size: 100% 100%}
    to { background-size: 300% 300% }
`;

const StyledSkeleton = styled.div.attrs({
    style: props => props.style
})`
    background:         linear-gradient(135deg, #ffffff, #efefef);
    animation:          ${GradientAnim} 1s ease-in-out infinite;
    animation-direction: alternate;
    width: 100%;
    height: 100%;
`;

export default Skeleton;