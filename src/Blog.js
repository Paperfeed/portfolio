import React, { Component } from 'react';
import {createClient} from 'contentful';
import ReactMarkdown from 'react-markdown';
import {Route, Link, Switch} from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner.js';
import './styling/Blog.css';

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
        }
    }

    fetchPosts() {
        return this.client.getEntries();
    }

    shouldComponentUpdate() {
        return !this.state.isLoading;
    }

    setPosts(posts) {
        this.setState({
            posts: posts.items
        });
        console.log(posts.items);
    }

    async componentDidMount() {
        // Retrieve posts here
        const posts = await this.fetchPosts();
        await this.setPosts(posts);
        await this.setState( { isLoading: false });
    }

    render() {
        const {isLoading} = this.state;
        if (isLoading) return <LoadingSpinner/>;

        return(
            <Switch>
                <Route path="/blog/:post"
                       render={({match}) => {
                           const post = this.state.posts.find((post) => {
                               return post.fields.slug !== match.params.post
                           });

                           if (post !== undefined) return <BlogPost className="post" {...post.fields}/>;

                           return <LoadingSpinner/>;
                       }}
                />
                <Route exact path="/blog"
                       render={ () => (
                           this.state.posts.map(({fields}, index) => {
                               return <BlogPost className="post" key={index} {...fields}/>
                           })
                       )}
                />
            </Switch>
        );
    }
}

const BlogPost = (props) => {
    console.log(props);
    return <div className="blog-post">
        <Link to={'/blog/' + props.slug} className='blog-post-title'><h1>{props.title}</h1></Link>
        <Author className='blog-post-author' date={props.date} {...props.author}/>
        <ReactMarkdown className='blog-post-content' source={props.post}/>
    </div>
};

const Author = (props) => {
    const {fields} = props;
    if (fields === undefined) return <div/>;
    return <div className='post-author'>
        { fields.avatar && <div className='author-avatar'><img src={fields.avatar.fields.file.url} alt='avatar'/></div>}
        <div className='author-name'>{fields.name}</div>
        { fields.summary && <div className='author-summary'>{fields.summary}</div>}
        { props.date && <div className='post-date'>{props.date}</div> }
    </div>
};



export default Blog;