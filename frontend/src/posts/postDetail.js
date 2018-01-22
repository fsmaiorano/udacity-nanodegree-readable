import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../comments/actions';

class PostDetail extends Component {

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        this.props.getComments(postId);
    }

    renderPost = () => {
        const { posts } = this.props;
        const postId = this.props.match.params.postId;
        const post = posts.filter((post) => post.id === postId)[0];
        if (post) {
            return (
                <div>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                </div>
            )
        }
    }

    renderComments = () => {
        const { comments } = this.props;
        if (comments.length > 0) {
            return (
                comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.body}</p>
                        <p>{comment.author}</p>
                    </div>
                ))
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

    render() {
        const { posts, comments } = this.props;
        return (
            <div>
                <p>Post</p>
                {this.renderPost()}

                <p>Comments</p>
                {this.renderComments()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { posts, comments } = state;
    return {
        posts, comments
    }
}

export default withRouter(connect(mapStateToProps, actions)(PostDetail));