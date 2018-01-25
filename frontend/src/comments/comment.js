import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateFormat } from '../utils/helpers/helpers';
import { deleteComment, voteComment } from './actions';

class Comment extends Component {

    editComment = (commentId, commentParentId) => {
        const { history, category, postId } = this.props;
        this.props.history.push(`/${category}/${commentParentId}/comment/${commentId}/edit`);
    }

    renderCommentCreateForm = () => {
        const { comment } = this.props;
        return (
            <div>
                {
                    comment !== undefined ? (
                        <div>
                            <p>{comment.body}</p>
                            <p>{comment.author}</p>
                            <p>{dateFormat(comment.timestamp)}</p>
                            <p>Votescore: {comment.voteScore}</p>
                            <button onClick={() => this.props.deleteComment(comment.id, comment.parentId)}></button>
                            <button onClick={() => this.editComment(comment.id, comment.parentId)}></button>
                            <button onClick={() => this.props.voteComment(comment.id, true)}>+</button>
                            <button onClick={() => this.props.voteComment(comment.id, false)}>-</button>
                        </div>) : (<div></div>)
                }
            </div>
        )
    }

    render() {
        const { action } = this.props;
        switch (action) {
            case 'create':
                return (
                    this.renderCommentCreateForm()
                )
                break;

            default:
                break;
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId)),
        voteComment: (commentId, vote) => dispatch(voteComment(commentId, vote))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Comment))
