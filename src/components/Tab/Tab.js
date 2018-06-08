import React, {Component} from 'react';
import {Route, Redirect, Switch, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import posed, {PoseGroup} from 'react-pose';

import ScrollToTop from "../ScrollToTop/ScrollToTop";
import TabNavigation from "./Navigation";

/**
 * This TabContainer component allows you to directly create a tab out of the children components,
 * it will then create a route to these components and dynamically generate a navigation bar for them.
 *
 * It will also apply CSS animations to it. By default the classes applied are:
 * tab-appear, tab-enter, tab-appear-active, tab-enter-active, tab-exit, tab-exit-active, tab-[appear/enter/exit]-done
 *
 * Parent Parameters:
 * ----------------------
 * logo: Displays this text/icon as a logo
 * background: sets this image as the background of the container
 * default: sets the default tab to redirect to
 *
 *
 * Children Parameters:
 * ----------------------
 * title: the title of the tab (will get applied to navigation)
 * style [optional]: custom styling to apply to tab
 * path [optional]: which path to link to, defaults to title
 * match [optional]: id of parameter to match.
 *                   Accessed in the component using match.params.<id> (/: is prefixed automatically)
 *
 *
 * Usage is as simple as:
 * <TabContainer>
 *     <ChildComponent title='Tab1'/>
 *     <AnotherComponent title='Tab2'/>
 *     <Something title='Still a tab' path='tab3' match='itemId'/>
 * </TabContainer>
 *
**/

class TabContainer extends Component {
    constructor(props) {
        super(props);

        const { children } = this.props;

        this.tabs = children.map((tab, index) => {
            const title = tab.props.title;
            return({id: title + index, title: title, index: index, style: tab.props.style, path: tab.props.path})
        });
    }

    shouldComponentUpdate(nextProps) {
        // Don't update if user navigated to same page
        return this.props.location.pathname !== nextProps.location.pathname;
    }

    render() {
        return(
            <Route render={({location}) => (
                <Container>
                    <Background style={{backgroundImage: `url(${this.props.background})`}}/>
                    <TabNavigation tabs={this.tabs} logo={this.props.logo} />
                    <ScrollToTop location={location}>
                        <TabCarousel>
                            <PoseGroup preEnterPose='preEnter' animateOnMount={true}>
                                <TabSlide key={location.key}>
                                    <Switch location={location}>
                                        <Route exact path='/' render={() =>
                                            <Redirect to={
                                                this.props.default ? this.props.default : this.props.children[0].props.title
                                            }/>
                                        }/>
                                        { this.props.children.map((tab, index) => {
                                            let path = tab.props.path ? tab.props.path : tab.props.title;
                                            if (tab.props.match) path += '/:' + tab.props.match;

                                            return (
                                                <Route path={"/" + path}
                                                       key={'route' + index}
                                                       render={ () => (
                                                           <ContentWrapper style={tab.props.style}>{tab}</ContentWrapper>
                                               )}/>
                                            )
                                        })}
                                        <Route render={() => <p>404 - Not Found</p>} />
                                    </Switch>
                                </TabSlide>
                            </PoseGroup>
                        </TabCarousel>
                    </ScrollToTop>
                </Container>
            )}/>
        );
    }
}

const Container = styled.div`
    height: 100%;
`;

const ContentWrapper = styled.div`
    max-width: 800px;
`;

const Background = styled.div.attrs({
    style: props => ({
            backgroundImage: props.background
    })
})`
    position: fixed;
    left: -1.5%;
    top: -1.5%;
    width: 103%;
    height: 103%;
    filter: blur(.5rem);
    z-index: -1;
    background-size: cover;
`;

const TabCarousel = styled.div`
    margin: 2rem 1rem;
    padding-bottom: 200px;
    overflow: hidden;
    
    @media only screen and (max-width: 768px) {
        margin: 2rem 0;
    }
`;

const TabSlide = styled(posed.div({
    preEnter: {
        opacity: 0,
        x: '-80%',
        overflow: 'hidden'
    },
    enter: {
        opacity: 1,
        x: '0%',
        overflow: 'hidden',
        transition: { duration: 350, ease: 'easeInOut' }
    },
    exit: {
        opacity: 0,
        x: '80%',
        overflow: 'hidden',
        transition: { duration: 350, ease: 'easeInOut' }
    }
}))`
    margin: 0 auto;
    padding-top: 1rem;
    width: fit-content;
    background: ${props => props.theme.tabColor};
    min-height: 300px;
    border-radius: 5px;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,.3);
    font-family: 'Open-Sans', sans-serif;
    color: #1d1d1d;
    
    @media only screen and (max-width: 768px) {
        width: 100%;
        border-radius: 0;
        min-width: 0;
        min-height: 300px;
    }
`;

export default withRouter(TabContainer);