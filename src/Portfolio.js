import React, {Component} from 'react';
import './styling/Portfolio.css';

class Portfolio extends Component {
    constructor() {
        super();

        const r = require.context('./svg', true, /\.(svg)$/);
        const files = r.keys().map(r);

        this.icons = [
            ['Chrome Store', files[0],'https://chrome.google.com/webstore/detail/liuchan-chinese-popup-dic/hjpjmkjmkgedphipmbnmejlnfndjcgdf'],
            ['Codepen', files[1], 'https://codepen.io/paperfeed'],
            ['Codewars', files[2],'https://www.codewars.com/users/Paperfeed'],
            ['FreeCodeCamp', files[3],'https://www.freecodecamp.org/paperfeed'],
            ['Github', files[4], 'https://github.com/paperfeed']
        ];
    }

    render() {
        return (
            <div>
                <div className='logos'>
                    { this.icons.map((icon, index) => {
                        return <Logo key={'logo' + index} alt={icon[0]} src={icon[1]} link={icon[2]}/>
                    })}
                </div>
                <div className='projects'>

                </div>
            </div>
        );
    }
}

const Logo = (props) => (
    <div className='svg-container'>
        <a href={props.link}>
            <img className='svg-logo' alt={props.alt} src={props.src}/>
            <span>{props.alt}</span>
        </a>
    </div>
);

export default Portfolio;