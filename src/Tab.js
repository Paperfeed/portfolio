import React, { Component } from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Route, NavLink, Switch} from 'react-router-dom';
import './styling/Tab.css';

/*
* This TabContainer component allows you to directly create a tab out of the children components,
* it will then create a route to these components and dynamically generate a navigation bar for them.
*
* It will also apply CSS animations to it. By default the classes applied are:
* tab-appear, tab-enter, tab-appear-active, tab-enter-active, tab-exit, tab-exit-active, tab-[appear/enter/exit]-done
*
* Usage is as simple as:
* <TabContainer>
*     <ChildComponent title='Tab1'/>
*     <AnotherComponent title='Tab2'/>
*     <Something title='Still a tab'/>
* </TabContainer>
*/
class TabContainer extends Component {
    constructor(props) {
        super(props);

        const { children } = this.props;

        this.tabs = children.map((tab, index) => {
            const title = tab.props.title;
            return({id: title + index, title: title, index: index})
        });
    }


    render() {

        return(
            <Route render={({location}) => (
                <div className='tab-container'>
                    <TabNavigation tabs={this.tabs} />
                    <TransitionGroup className='tab-carousel'>
                        <CSSTransition key={location.key}
                                       timeout={500}
                                       classNames='tab'
                                       appear
                        >
                            <Switch location={location}>
                                { this.props.children.map((tab, index) => {
                                    return (
                                        <Route path={"/" + tab.props.title}
                                               key={'route' + index}
                                               render={ () => (
                                            <div className='tab-carousel-slide' key={'tab' + index}>
                                                {tab}
                                            </div>
                                       )}/>
                                    )
                                })}
                                <Route render={() => <div>Not Found</div>} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            )}/>
        );
    }
}

// Navigation bar
const TabNavigation = (props) => {
    const tabButtons = props.tabs.map(tab => {
        return <NavLink
            to={"/" + tab.title}
            key={tab.title + 'button' + tab.order}
            className={'tab-nav-button'}>
            {tab.title}
        </NavLink>
    });

    return (<nav className="tab-navigation">
        {tabButtons}
    </nav>);
};

export default TabContainer;