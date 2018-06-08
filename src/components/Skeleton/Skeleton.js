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
    from { opacity:0; }
    to { opacity: 1; }
`;

const StyledSkeleton = styled.div`
    background:         linear-gradient(135deg, #ffffff, #efefef);
    animation:          ${GradientAnim} 1s ease-in-out infinite;
    animation-direction: alternate;
    width: 100%;
    height: 100%;
`;

export default Skeleton;