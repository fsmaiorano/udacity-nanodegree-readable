import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as actions from './actions';

class CommentCreate extends Component {

    onCreateComment = (event) => {
        event.preventDefault()
        const comment = serializeForm(event.target, { hash: true });
        if (comment.body) {
            const postId = this.props.match.params.postId;
            this.props.addComment(postId, comment);
            document.getElementById('frmCreateComment').reset();
        }
    }

    render() {
        return (
            <div className='create-comment'>
                <form onSubmit={this.onCreateComment} id="frmCreateComment">
                    <input type='text' name='body' placeholder='input an comment' ref='body' />
                    <input type='text' name='author' placeholder='author of comment' ref='author' />
                    <button>submit comment</button>
                </form>
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


export default withRouter(connect(mapStateToProps, actions)(CommentCreate))