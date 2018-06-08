import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {lighten} from 'polished';
import Animations from '../../services/animations';

const TabNavigation = (props) => {
    const tabButtons = props.tabs.map(tab => {
        return <NavButton
            to={"/" + (tab.path ? tab.path : tab.title)}
            key={tab.title + 'button' + tab.order}
        >
            {tab.title}
        </NavButton>
    });

    return (
        <NavWrapper>
            <NavLogo>
                <div><i/><i/><i/></div>
                <p>{props.logo}</p>
            </NavLogo>
            {tabButtons}
        </NavWrapper>
    );
};

const NavWrapper = styled.nav`
    display: flex;
    width: 100%;
    justify-content: center;
    background: ${props => props.theme.mainColor};
    animation: ${Animations.slideInTop} 1s;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,.3);
    -webkit-font-smoothing: antialiased;
    
    @media only screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

const NavButton = styled(NavLink)`
    border: none;
    padding: 1.1rem 1rem;
    color: ${props => props.theme.tabNavColor};
    text-transform: uppercase;
    font-weight: 200;
    font-family: ${props => props.theme.subFont};
    transition: all .2s ease-in-out;
    text-decoration: none;
    border-bottom: 2px solid ${props => props.theme.mainColor};
    
    &:focus {
        outline: none;
    }
    
    &.active {
        border-bottom: 2px solid ${props => lighten(0.5, props.theme.mainColor)};
        background: ${props => lighten(0.1, props.theme.mainColor)};
    }
    
    @media only screen and (max-width: 768px) {
        display: none;
    }
`;

const NavLogo = styled.div`
    display: inline-flex;
    width: 100%;
    padding: 0.4rem 1rem;
    align-items: stretch;
    align-self: center;
    text-transform: uppercase;
    color: ${props => props.theme.thirdColor};
    font-size: 1.2em;
    font-weight: 800;
    font-family: ${props => props.theme.titleFont};
    user-select: none;
    
    p {
        margin: 0;
    }
    
    div {
        display: none;
        cursor: pointer;
        margin-left: 15px;
        width: 25px;
        height: 25px;
        flex-direction: column;
        justify-content: space-between;
        align-self: center;
        
        i {
            background-color: ${props => props.theme.thirdColor};
            border-radius: 2px;
            content: '';
            display: block;
            width: 100%;
            height: 2px;
        }
    }
    
    @media only screen and (max-width: 769px) {
        p {
            margin: .5em;
            flex-grow: 1;
        }
        
        div {
            display: inline-flex;
        }
    }
`;

export default TabNavigation;