import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as actions from './actions';

class CommentEdit extends Component {

    onEditComment = (event) => {
        const { history } = this.props;
        event.preventDefault()
        const editedComment = serializeForm(event.target, { hash: true });
        const selectedComment = this.selectedComment();
        this.props.updateComment(editedComment, selectedComment, history);
    }

    selectedComment = () => {
        const { comments } = this.props;
        const commentId = this.props.match.params.commentId;
        return comments.filter(comment => comment.id === commentId)[0];
    }

    render() {
        const comment = this.selectedComment();
        return (
            <div>
                {
                    comment !== undefined ? (
                        <form onSubmit={this.onEditComment}>
                            <input type='text' name='body' placeholder='input an comment' ref='body' defaultValue={comment.body} />
                            <input type='text' name='author' placeholder='author of comment' ref='author' defaultValue={comment.author} />
                            <button>submit comment</button>
                        </form>
                    ) : (<div></div>)
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { comments } = state
    return {
        comments
    }
}


export default withRouter(connect(mapStateToProps, actions)(CommentEdit))