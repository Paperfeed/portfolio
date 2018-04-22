import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import NavLink from 'react-router-dom';
import './styling/Tab.css';

class TabContainer extends Component {
    // Tab properties:
    // id, order, component
    constructor(props) {
        super(props);
        /*const tabs = props.tabs.map((tab, index) => {
            return({id: tab[1] + index, title: tab[1], index: index, component: tab[0]})
        });*/

        const { children } = this.props;

        this.tabs = children.map((tab, index) => {
            const title = tab.props.title;
            return({id: title + index, title: title, index: index, component: tab, isActive: false})
        });

        this.state = {
            position: 0
        };

        this.tabs[0].isActive = true;
    }

    onChangeTab(e, tab) {
        this.tabs[this.state.position].isActive = false;

        this.setState({
            position: tab.index
        });

        this.tabs[tab.index].isActive = true;
    }

    changeTabOrder(e) {

    }

    getOrder(index, position) {
        const numItems = this.tabs.length || 1;

        if (index - position < 0) {
            return numItems - Math.abs(index - position)
        }
        return index - position
    }

    /*shouldComponentUpdate() {

    }*/

    render() {
        return(
            <div className='tab-container'>
                <TabNavigation tabs={this.tabs} activeTab={this.state.position} handleClick={this.onChangeTab.bind(this)} />
                <div className='tab-carousel' >
                    { this.props.children.map((tab, index) => {
                        const order = this.getOrder(index, this.state.position);

                        return(
                            <CSSTransition in={this.tabs[index].isActive}
                                           timeout={500}
                                           classNames='tab'
                                           onExited={ this.changeTabOrder.bind(this) }
                                           key={'anim' + index}>
                                <div className='tab-carousel-slide' key={'tab' + index} style={{order: order}}>
                                    {tab}
                                </div>
                            </CSSTransition>
                        )
                    })}
                </div>
            </div>
        );
    }
}

// Navigation bar
const TabNavigation = (props) => {
    console.log(props);

    const tabButtons = props.tabs.map(tab => {

        return <NavLink
            to={"/" + tab.title}
            key={tab.title + 'button' + tab.order}
            /*className={tab.index === props.activeTab ? 'tab-nav-button tab-nav-active' : 'tab-nav-button'}*/
            /*onClick={(e) => props.handleClick(e, tab)}*/>
            {tab.title}
        </NavLink>
    });

    return (<nav className="tab-navigation">
        {tabButtons}
    </nav>);
};

export default TabContainer;