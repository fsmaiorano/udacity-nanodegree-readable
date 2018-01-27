import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as actions from './actions';

class CommentEdit extends Component {

    backToRoot = () => {
        this.props.history.push('/');
    }

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
        let comment = comments.filter(comment => comment.id === commentId)[0];
        if(comment === undefined) {
            this.backToRoot();
        }
        else {
            return comment;
        }
    }

    render() {
        const comment = this.selectedComment();
        return (
            <div>
            <button onClick={() => this.props.history.goBack()}>Back</button>
                <h1>Edit Comment</h1>
                {
                    comment !== undefined ? (
                        <form onSubmit={this.onEditComment} className="edit-comment">
                            <input type='text' name='body' placeholder='input an comment' ref='body' defaultValue={comment.body} />
                            <input type='text' name='author' placeholder='author of comment' ref='author' defaultValue={comment.author} />
                            <button onClick={() => this.props.history.goBack()}>Cancel</button>
                            <button>Edit Commenct</button>
                        </form>
                    ) : (<div>Ups! No comment here</div>)
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