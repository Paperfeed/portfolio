import React, {Component} from 'react';
import {device} from '../../styling/devices';

/**
 * @arg {object} device - Custom list of queries (along with keys) to listen for
 *
 * Keeps track of changes in media queries, saves it as a state and passes it down to its children as a prop
 *
 * Can pass custom queries through the device prop.
 *
 * e.g.: device = {
            mobile: '425px',
            laptop: '1024px',
            desktop: '2560px'
        }
 */

const withMediaQueryListener = (WrappedComponent) => {
    return class extends Component {
        constructor() {
            super();
            this.mediaQueries = [];
            //this.state = { device: 'desktop' };
        }

        static defaultProps = {
            device,
            onChange: (e) => (console.log(e))
        };

        handleQueryChange(device, event) {
            if (event.matches) {
                //this.setState({device});
                this.props.onChange(device);
            }
        }

        componentDidMount(){
            let {device} = this.props;
            let mediaQueryList, query, hadMatch = false;

            for (query in device) {
                mediaQueryList = window.matchMedia(device[query]);

                if (!hadMatch && mediaQueryList.matches) {
                    //this.setState({device: query});
                    this.props.onChange(device);
                    hadMatch = true;
                }
                this.mediaQueries.push(mediaQueryList);
                mediaQueryList.addListener(this.handleQueryChange.bind(this, query));
            }
        }

        componentWillUnmount() {
            this.mediaQueries.forEach(query => query.removeListener(this.handleQueryChange));
        }

        render() {
            return <WrappedComponent device={device} {...this.props} />
        }
    };
};

class MediaQueryListener extends Component {
    constructor() {
        super();
        this.mediaQueries = [];

        this.state = { device: 'desktop'}
    }

    handleQueryChange(device, event) {
        console.log(device, event);
        if (event.matches) {
            this.setState({device});

            this.props.onChange(device)
        }
    }

    componentDidMount(){
        let {device} = this.props;
        let mediaQueryList, query, hadMatch = false;

        for (query in device) {
            mediaQueryList = window.matchMedia(device[query]);
            if (!hadMatch && mediaQueryList.matches) {
                this.setState({device: query});
                hadMatch = true;
            }
            this.mediaQueries.push(mediaQueryList);
            mediaQueryList.addListener(this.handleQueryChange.bind(this, query));
        }
    }

    componentWillUnmount() {
        this.mediaQueries.forEach(query => query.removeListener(this.handleQueryChange));
    }

    render() {
        // return React.Children.map(this.props.children, (child) => {
        //     return React.cloneElement(child, {mediaQueryDevice: this.state.device})
        // })
        return this.props.children;
    }
}

// Assign default media queries if user doesn't specify their own
 MediaQueryListener.defaultProps = {
     device,
     onChange: (e) => (console.log(e))
 };

export default withMediaQueryListener;