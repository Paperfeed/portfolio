import React, { Component } from 'react';
import {createClient} from 'contentful';
import ReactMarkdown from 'react-markdown';
import {Route, Link, Switch} from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.js';

import './Blog.css';
import styled, {keyframes} from "styled-components";
import posed from 'react-pose';

class Blog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        this.client = createClient({
            space: 'rn6hticz21is',
            accessToken: 'c33284817ee0a5e32c3692e576a3042e9fd25283cea3c027d1ba530e7431171b'
        });

        this.setPosts = response => {
            this.setState({
                posts: response.items,
                isLoading: true
            })
        };

        this.path = (this.props.path ? this.props.path : this.props.title);
    }

    shouldComponentUpdate() {
        return !this.state.isLoading;
    }

    fetchPosts() {
        return this.client.getEntries({
            'content_type': 'blogPost'
        });
    }

    setPosts(posts) {
        this.setState({
            posts: posts.items
        });
    }

    async componentDidMount() {
        // Retrieve posts here
        const posts = await this.fetchPosts();
        await this.setPosts(posts);
        await this.setState( { isLoading: false });
        this.forceUpdate();
    }



    render() {
        const {isLoading} = this.state;

        if (isLoading) return <LoadingSpinner/>;

        return(
            <Switch>
                <Route path={"/" + this.path + "/:post"}
                       render={({match}) => {
                           const post = this.state.posts.find((post) => {
                               return post.fields.slug === match.params.post
                           });

                           if (post !== undefined) return <BlogPost path={this.path} className="post" {...post.fields}/>;

                           return <LoadingSpinner/>;
                       }}
                />
                <Route exact path={"/" + this.path}
                       render={ () => (
                           <PoseTest>
                               { this.state.posts.map(({fields}, index) => {
                                   return <BlogPost path={this.path} className="post" shortened={true} key={index} {...fields}/>
                               })}
                           </PoseTest>
                       )}
                />
            </Switch>
        );
    }
}

const PoseTest = posed.div({
    open: {
        staggerChildren: 500
    }

});
const fadeIn = keyframes`
    0% { opacity: 0; }
  100% {opacity: 1; }
`;

const BlogPost = (props) => {
    return <StyledBlogPost>
        <Link to={'/' + props.path + '/' + props.slug} className='blog-post-title'><h1>{props.title}</h1></Link>
        <Author className='blog-post-author' date={props.date} {...props.author}/>
        <ReactMarkdown
            className='blog-post-content'
            source={(props.shortened) ? props.post.slice(0, Math.min(props.summaryLength, props.post.length)) + '...' : props.post}/>
        { props.shortened && <Link to={'/' + props.path + '/' + props.slug} className='read-more'><p>Read more...</p></Link>}
    </StyledBlogPost>
};

BlogPost.defaultProps = {
    summaryLength: 600
};

const StyledBlogPost = styled(posed.div({
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
}))`
    opacity: 0;
    width: 80%;
    text-align: left;
    padding-bottom: 40px;
    margin: 50px auto 0;
    border-bottom: 2px solid lightgrey;
    animation: ${fadeIn} .5s ease-in-out;
    animation-delay: .5s;
    animation-fill-mode: forwards;
    
    p {
        margin: 1rem;
    }
    
    img {
        width: 100%;
        max-width: max-content;
    }
`;


const Author = (props) => {
    const {fields} = props;
    if (fields === undefined) return <div/>;
    return <div className='post-author'>
        { fields.avatar && <div className='author-avatar'><img src={fields.avatar.fields.file.url} alt='avatar'/></div>}
        <div className='author-name'>{fields.name}</div>
        { fields.summary && <div className='author-summary'>{fields.summary}</div>}
        { props.date && <div className='post-date'>Posted on: {props.date}</div> }
    </div>
};



export default Blog;