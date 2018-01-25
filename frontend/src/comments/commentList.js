import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateFormat } from '../utils/helpers/helpers';

import Comment from './comment';
import { deleteComment } from './actions';

class CommentList extends Component {
    render() {
        const { comments, post } = this.props;
        return (
            <div>
                {
                    comments && comments.map(comment => (
                        <Comment comment={comment} category={post.category} action={'create'} />
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

