import React, { Component } from 'react';
import './styling/Tab.css';

class TabContainer extends Component {
    constructor(props) {
        super(props);

        this.navigator = React.createRef();
    }

    componentDidMount() {
        this.createTabs();
    }

    createTabs() {
        this.tabComponents = this.props.components.map((data, index) => {
            this.navigator.current.addTabNav(data[1]);
            return (<Tab key={index} className={'tab' + index} component={data[0]}/>)
        });

        this.navigator.current.forceUpdate();
    }

    onChangeTab(tab) {
        this.navigator.current.setState({activeTab: tab});
        // Change to another tab
    }

    render() {
        return (
            <div className='tab-container'>
                <TabNavigation ref={this.navigator} activeTab={this.activeTab} onChangeTab={this.onChangeTab.bind(this)}/>
                {this.tabComponents}
            </div>
        );
    }
}

class TabNavigation extends Component {
    constructor(props) {
        super(props);
        this.tabs = [];

        this.state = {activeTab: 0}
    }

    handleClick(id) {
        this.props.onChangeTab(id);
    }

    addTabNav(title) {
        const id = this.tabs.length;
        console.log('Adding new TABNAV', id);

        this.tabs.push(
            <button key={title + id}
                    className={this.state.activeTab === id ? 'tab-nav-button tab-nav-active' : 'tab-nav-button' }
                    onClick={this.handleClick(id)}>
                {title}
            </button>
        );
    }

    removeTabNav(tab) {
        this.tabs.splice(tab);
    }

    render() {
        const tabs = this.tabs;
        console.log(tabs);

        return (
            <nav className="tab-navigation">
                {tabs && tabs.map(tab => {return(tab)})}
            </nav>
        )
    }
}
/*
const TabNavigation = (props) => {
    return (
        <nav className="tab-navigation">
            {props.titles.map(title => { return( <button className={'tab-navbutton' } onClick={props.onChangeTab}>{title}</button>) })}
        </nav>
    )
}*/

const Tab = (props) => {
    return(
        <div className='tab' key={props.id}>
            {props.component}
        </div>
    );
};
export default TabContainer;