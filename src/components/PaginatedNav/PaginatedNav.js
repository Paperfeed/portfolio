import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Create paginated buttons
const PaginatedNav = (props) => {
    const pages = [];
    for (let i = 0, len = props.length; i < len; i++) {
        pages.push(<NavLink
            exact={(i === 0)}
            to={'/' + props.path + ((i === 0) ? '' : '/' + (i + 1))}
            key={'page' + i}
            >
            {(i + 1)}
        </NavLink>);
    }

    return (
        <PaginationWrapper>
            {pages}
        </PaginationWrapper>
    )
};

const PaginationWrapper = styled.div`
    background: ${props => props.theme.mainColor};
    
    a {
        display: inline-block;
        font-family: ${props => props.theme.subFont};
        margin: 5px;
        color: white;
        text-decoration: none;
        
        &.active {
            color: ${props => props.theme.fourthColor};
        }
    }
`;

PaginationWrapper.defaultProps = {
    theme: {
        mainColor: '#fff',
        subFont: 'Arial, sans-serif',
        fourthColor: '#000'
    }
};

export default PaginatedNav;