import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Comment from './comment';
import { deleteComment } from './actions';

class CommentList extends Component {

    static propTypes = {
        post: PropTypes.object,
        comments: PropTypes.array.isRequired,
    }

    render() {
        const { comments, post } = this.props;
        return (
            <div>
                <p>Comments</p>
                {
                    post && comments && comments.map(comment => (
                        <div className="comment-list" key={comment.id}>
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

