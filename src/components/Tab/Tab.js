import React, { Component, PureComponent } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Route, Redirect, NavLink, Switch} from 'react-router-dom';
import './Tab.css';

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


    render() {

        return(
            <Route render={({location}) => (
                <div className='tab-container'>
                    <div className='tab-background' style={{backgroundImage: `url(${this.props.background})`}}/>
                    <TabNavigation tabs={this.tabs} logo={this.props.logo} />
                    <ScrollToTop location={location}>
                        <TransitionGroup className='tab-carousel'>
                            <CSSTransition key={location.key}
                                           timeout={500}
                                           classNames='tab'
                                           appear
                            >
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

                                                <div className='tab-carousel-slide' style={tab.props.style} key={'tab' + index}>
                                                    {tab}
                                                </div>
                                           )}/>
                                        )
                                    })}
                                    <Route render={() => <div className='tab-carousel-slide error'>404 - Not Found</div>} />
                                </Switch>
                            </CSSTransition>
                        </TransitionGroup>
                    </ScrollToTop>
                </div>
            )}/>
        );
    }
}

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
        return (<div className='tab-scroll' ref={this.scrollDiv}>{this.props.children}</div>)
    }
}

// Navigation bar
const TabNavigation = (props) => {
    const tabButtons = props.tabs.map(tab => {
        return <NavLink
            to={"/" + (tab.path ? tab.path : tab.title)}
            key={tab.title + 'button' + tab.order}
            className={'tab-nav-button'}>
            {tab.title}
        </NavLink>
    });

    return (<nav className="tab-navigation">

        <div className='tab-nav-logo'>
            <div className='tab-nav-slideout'><i/><i/><i/></div>
            <p>{props.logo}</p>
        </div>
        {tabButtons}
    </nav>);
};

export default TabContainer;