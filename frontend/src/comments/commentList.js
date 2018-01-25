import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateFormat } from '../utils/helpers/helpers';

import { deleteComment } from './actions';

class CommentList extends Component {
    render() {
        const { comments } = this.props;
        return (
            <div>
                {
                    comments.map(comment => (
                        <div>
                            <p>{comment.body}</p>
                            <p>{comment.author}</p>
                            <p>{dateFormat(comment.timestamp)}</p>
                            <p>Votescore: {comment.voteScore}</p>
                            <button onClick={() => this.props.deleteComment(comment.id, comment.parentId)}></button>
                        </div>
                    ))
                }
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     const { comments } = state
//     return {
//         comments
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CommentList))

