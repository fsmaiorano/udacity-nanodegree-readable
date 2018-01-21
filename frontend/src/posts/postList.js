import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';

class PostList extends Component {
    render() {
        const { posts } = this.props
        return (
            <div>
                {
                    posts !== undefined && posts.map((post) => (
                        <div  className='post-list'>
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { posts } = state;
    return {
        posts
    }
}

export default withRouter(connect(mapStateToProps, actions)(PostList));
