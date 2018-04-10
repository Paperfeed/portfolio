import React, { Component } from 'react';
import './styling/Tab.css';

class TabContainer extends Component {
    // Tab properties:
    // id, order, component
    constructor(props) {
        super(props);
        const tabs = props.tabs.map((tab, index) => {
            return({id: tab[1] + index, title: tab[1], index: index, component: tab[0]})
        });

        this.state = {
            tabs: tabs,
            position: 0
        }
    }

    onChangeTab(e, tab) {
        this.setState({
            position: tab.index
        });
    }

    getOrder(index, position) {
        const numItems = this.props.tabs.length || 1;

        if (index - position < 0) {
            return numItems - Math.abs(index - position)
        }
        return index - position
    }

    render() {
        return(
            <div className='tab-container'>
                <TabNavigation tabs={this.state.tabs} activeTab={this.state.position} handleClick={this.onChangeTab.bind(this)} />
                <div className='tab-carousel'>
                    {  this.state.tabs.map((tab, index) => {
                            const order = this.getOrder(tab.index, this.state.position);
                            return(
                                <Tab key={'tab' + index} id={tab.id} order={order} component={tab.component} title={tab.title}/>
                            )}
                        )
                    }
                </div>
            </div>
        );
    }
}

// Navigation bar
const TabNavigation = (props) => {
    const tabButtons = props.tabs.map(tab => {

        return <button
            key={tab.order}
            className={tab.index === props.activeTab ? 'tab-nav-button tab-nav-active' : 'tab-nav-button'}
            onClick={(e) => props.handleClick(e, tab)}>
            {tab.title}
        </button>
    });

    return (<nav className="tab-navigation">
        {tabButtons}
    </nav>);
};

// Tab slides
const Tab = (props) => {
    return(<div className='tab-carousel-slide' key={props.id} style={{order: props.order}}>
        {props.component}
    </div>);
};

export default TabContainer;