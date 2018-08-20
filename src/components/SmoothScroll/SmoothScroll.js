import React, {Component} from 'react';


const withSmoothScroll = (WrappedComponent, selectData) => {
    return class extends Component {
        constructor(props) {
            super(props);

            this.scrollPosition = 0;
            this.elem = React.createRef();

            this.onScroll = this.onScroll.bind(this);
        }

        componentDidMount() {
            this.elem.current.onscroll = this.onScroll.bind(this);
        }

        componentWillUnmount() {
            this.elem.current.onscroll = '';
        }

        onScroll() {
            const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
            console.log(currentPosition);
            // Hide nav when scrolling down, reveal when scrolling  back up
            if (this.props.isNav) {
                if (currentPosition > 70 && this.scrollPosition < currentPosition) {
                    // Scrolling Down
                    if (!this.navHidden) {
                        this.navBar.classList.remove("navSlideDown");
                        this.navBar.classList.add("navSlideUp");
                        this.navHidden = true;
                    }
                    this.scrollPosition = currentPosition;
                } else if ((this.scrollPosition - currentPosition) >= 60) {
                    // Scrolling Up
                    if (this.navHidden) {
                        this.navBar.classList.remove("navSlideUp");
                        this.navBar.classList.add("navSlideDown");
                        this.navHidden = false;
                    }
                    this.scrollPosition = currentPosition;
                }
            }

            // Set active class on navlink when corresponding section is in view
            if (!this.sections) this.sections = document.getElementsByTagName('section');
            if (!this.navLinks) this.navLinks = document.getElementsByClassName('nav-link');

            for (let i = 0, len = this.sections.length; i < len; i++) {
                if (this.isVisible(this.sections[i])) {
                    if (this.activeNav) this.activeNav.classList.remove('active');
                    this.activeNav = this.navLinks[i];
                    this.navLinks[i].classList.add('active');
                    break;
                }
            }
        };

        render() {
            // ... and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return <WrappedComponent ref={this.elem} {...this.props} />;
        }
    };
};

export default withSmoothScroll;