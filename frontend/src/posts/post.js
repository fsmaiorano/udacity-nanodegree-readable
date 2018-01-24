import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePost } from './actions';

class Post extends Component {
    render() {
        const { comments, post, history } = this.props;
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
        deletePost: (postId, history) => dispatch(deletePost(postId, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
