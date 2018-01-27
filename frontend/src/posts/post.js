import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePost, votePost } from './actions';

class Post extends Component {

    backToRoot = () => {
        this.props.history.push('/');
    }

    editPost = (postId) => {
        const { history } = this.props;
        this.props.history.push(`/post/${postId}/edit`);
    }

    commentsCount = (post, comments) => {
        if (post !== undefined) {
            return comments.filter(comment => comment.parentId === post.id && !comment.deleted && !comment.parentDeleted)
        }
        else {
            return this.backToRoot();
        }
    }

    render() {
        const { comments, post, history } = this.props;
        const postComments = this.commentsCount(post, comments)

        let commentCount = postComments.length === 0 ? post.commentCount : postComments.length;

        return (
            <div>

                {
                    post !== undefined ? (
                        <div>
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                            <p>VoteScore: {post.voteScore}</p>
                            <p>Comments: {commentCount}</p>
                            {
                                this.props.history.location.pathname !== '/' ? (<div></div>) : (
                                    <button onClick={() => this.props.history.push(`/${post.category}/${post.id}`)}><i class="fa fa-search fa-3x" aria-hidden="true"></i></button>
                                )
                            }
                            <button onClick={() => this.props.deletePost(post.id, history)}><i class="fa fa-trash-o fa-3x" aria-hidden="true"></i></button>
                            <button onClick={() => this.editPost(post.id)}><i class="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i></button>
                            <button onClick={() => this.props.votePost(post.id, true)}><i class="fa fa-thumbs-o-up fa-3x" aria-hidden="true"></i></button>
                            <button onClick={() => this.props.votePost(post.id, false)}><i class="fa fa-thumbs-o-down fa-3x" aria-hidden="true"></i></button>
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
