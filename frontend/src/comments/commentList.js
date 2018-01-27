import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Comment from './comment';
import { deleteComment } from './actions';

class CommentList extends Component {
    render() {
        const { comments, post } = this.props;
        return (
            <div>
                <p>Comments</p>
                {
                    comments && comments.map(comment => (
                        <div className="comment-list">
                            <Comment comment={comment} category={post.category} action={'create'} />
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CommentList))

