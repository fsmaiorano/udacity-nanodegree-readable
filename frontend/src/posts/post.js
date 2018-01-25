import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePost, votePost } from './actions';

class Post extends Component {

    editPost = (postId) => {
        const { history } = this.props;
        this.props.history.push(`/post/${postId}/edit`);
    }

    commentsCount = (postId, comments) => {
        return comments.filter(comment => comment.parentId === postId && !comment.deleted && !comment.parentDeleted)
    }

    render() {
        const { comments, post, history } = this.props;
        const postComments = this.commentsCount(post.id, comments)
        return (
            <div>
                {
                    post !== undefined ? (
                        <div>
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                            <p>VoteScore: {post.voteScore}</p>
                            <p>Comments: {comments.length}</p>
                            <button onClick={() => this.props.deletePost(post.id, history)}>delete</button>
                            <button onClick={() => this.editPost(post.id)}>edit</button>
                            <button onClick={() => this.props.votePost(post.id, true)}>+</button>
                            <button onClick={() => this.props.votePost(post.id, false)}>-</button>
                        </div>
                    ) : (<div></div>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { comments } = state
    return {
        comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (postId, history) => dispatch(deletePost(postId, history)),
        votePost: (postId, vote) => dispatch(votePost(postId, vote))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
