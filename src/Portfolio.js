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
                    <h2>LiuChan Chinese Popup Dictionary <Tag color='#c4e8f3'>JS</Tag><Tag color='#c4e8f3'>Chrome</Tag><Tag color='#c4e8f3'>Plugin</Tag></h2>
                    <p>LiuChan (liú chàng) is an extension for chrome that allows you to mouse-over Chinese to
                        instantly lookup the dictionary.</p>
                    <p>It started out as a port of RikaiChan (and its Rikai derivatives) and has since grown into an
                        extension that holds its own with new features and improved performance.</p>
                    <a className='read-more' href='https://paperfeed.github.io/LiuChan/'>
                        <p>Read more...</p>
                    </a>

                    <h2>Nextgen Nivo Slider (Deprecated) <Tag color='#c4e8f3'>PHP</Tag><Tag color='#c4e8f3'>Wordpress</Tag><Tag color='#c4e8f3'>Plugin</Tag></h2>
                    <p>NextGen NivoSlider allows you to create a NivoSlider as a widget or with a shortcode.
                        This plugin uses the ‘NextGen Gallery’ plugin to obtain the images using tags or gallery IDs.</p>
                    <p>NivoSlider is a great responsive image slideshow that is highly customizable. With a large array
                        of effects and many additional options you are sure to find a combination that will suit your website.</p>
                    <a className='read-more' href='https://wordpress.org/plugins/nextgen-nivoslider/'>
                        <p>Read more...</p>
                    </a>

                    <h2>Awesome TTS (unofficial update) <Tag color='#c4e8f3'>Python</Tag><Tag color='#c4e8f3'>Plugin</Tag></h2>
                    <p>A text-to-speech plugin for Anki</p>
                    <p>This update changed name generation to use MD5 hashing to prevent duplicate file-generation.</p>
                    <p>It also changed the way files were being pulled from the Google translate services (using urllib2
                        and cookielib) preventing the user from being banned regularly</p>
                    <a className='read-more' href='https://github.com/Paperfeed/AwesomeTTS'>
                        <p>Read more...</p>
                    </a>


                </div>
            </div>
        );
    }
}

const Tag = (props) => {
    return <span className='tag' style={{background: props.color}}>{props.children}</span>
};

const Logo = (props) => (
    <div className='svg-container'>
        <a href={props.link}>
            <img className='svg-logo' alt={props.alt} src={props.src}/>
            <span>{props.alt}</span>
        </a>
    </div>
);

export default Portfolio;