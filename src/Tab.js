import React, { Component } from 'react';
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
            return({id: title + index, title: title, index: index, component: tab})
        });

        this.state = {
            position: 0
        }
    }

    onChangeTab(e, tab) {
        this.setState({
            position: tab.index
        });
    }

    getOrder(index, position) {
        const numItems = this.tabs.length || 1;

        if (index - position < 0) {
            return numItems - Math.abs(index - position)
        }
        return index - position
    }

    render() {
        return(
            <div className='tab-container'>
                <TabNavigation tabs={this.tabs} activeTab={this.state.position} handleClick={this.onChangeTab.bind(this)} />
                <div className='tab-carousel'>
                    { this.props.children.map((tab, index) => {
                        const order = this.getOrder(index, this.state.position);
                        return(
                            <div className='tab-carousel-slide' key={'tab' + index} style={{order: order}}>
                                {tab}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

// Navigation bar
const TabNavigation = (props) => {
    const tabButtons = props.tabs.map(tab => {

        return <button
            key={tab.title + 'button' + tab.order}
            className={tab.index === props.activeTab ? 'tab-nav-button tab-nav-active' : 'tab-nav-button'}
            onClick={(e) => props.handleClick(e, tab)}>
            {tab.title}
        </button>
    });

    return (<nav className="tab-navigation">
        {tabButtons}
    </nav>);
};

export default TabContainer;