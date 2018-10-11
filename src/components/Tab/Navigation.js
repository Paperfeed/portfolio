import React, {Component} from 'react';
import styled from "styled-components";
import posed from "react-pose";
import {NavLink} from "react-router-dom";
import {lighten} from 'polished';

import Animations from '../../services/animations';
import {device} from '../../styling/devices';
import withMediaQueryListener from "../MediaQueryListener/MediaQueryListener";
import withSmoothScroll from '../SmoothScroll/SmoothScroll';

class TabNavigation extends Component {
    constructor(props) {
        super();

        this.tabButtons = props.tabs.map(tab => {
            return <NavButton
                to={"/" + (tab.path ? tab.path : tab.title.toLowerCase())}
                key={tab.title + 'button' + tab.order}
            >
                {tab.title}
            </NavButton>;
        });

        this.state = {isCollapsed: (props.startCollapsed)};

        this.onMediaQueryChange = this.onMediaQueryChange.bind(this);
    }

    toggleVisibility() {
        this.setState({isCollapsed: !this.state.isCollapsed});
        console.log(this.state);
    }

    onMediaQueryChange(ev) {
        console.log('OK > qeury change', ev, this.state.isCollapsed);
        switch (ev) {
            case 'mobile':
                this.setState({ isCollapsed: true });
                break;
            default:
                this.setState({ isCollapsed: false });
        }
    }

    render() {
        return (
            <NavWrapper onChange={this.onMediaQueryChange}>
                <NavLogo>
                    <div onClick={this.toggleVisibility.bind(this)}><i/><i/><i/></div>
                    <p>{this.props.logo}</p>
                </NavLogo>
                <ButtonWrapper pose={this.state.isCollapsed ? 'hidden' : 'visible'}>
                    {this.tabButtons}
                </ButtonWrapper>
            </NavWrapper>
        );
    }
}

TabNavigation.defaultProps = {
    startCollapsed: true
};


//TODO create collapsible state

const NavWrapper = withMediaQueryListener(styled.nav`
    position: absolute;
    z-index:  10;
    left:     0;
    right:    0;
    
    display: flex;
    justify-content: center;
    background: ${props => props.theme.mainColor};
    animation: ${Animations.slideInTop} 1s;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,.3);
    -webkit-font-smoothing: antialiased;
    
    @media ${device.tablet} {
        flex-direction: column;
    }
`);

const ButtonWrapper = styled(posed.div({
    visible: {
        y: '0%',
        opacity: 1,
        staggerChildren: 200,
        transition: {
            beforeChildren: false,
            ease: 'easeIn',
            duration: 500
        }
    },
    hidden: {
        y: '-100%',
        opacity: 0
    }
}))`
    display: flex;
    background: ${props => props.theme.mainColor};
    
    @media ${device.tablet} {
        position: absolute;
        top:      100%;
        left:     0;
        right:    0;
        flex-direction: column;
    }
`;

const PosedNavLink = ({hostRef, ...rest}) => <NavLink innerRef={hostRef} {...rest} />;

const NavButton = styled(posed(PosedNavLink)({
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
}))`
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
    
    @media ${device.tablet} {
        border: 4px solid ${props => props.theme.mainColor};
        border-top: 0;
        border-bottom: 0;
        
        &.active {
            border: 4px solid ${props => lighten(0.5, props.theme.mainColor)};
            border-top: 0;
            border-bottom: 0;
        }
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
        z-index: 20;
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
    
    @media ${device.tablet} {
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