import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as actions from './actions';

//Material
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Save from 'material-ui-icons/Save';

const input = {
    width: '100%'
}

const frmCreateComment = {
    width: '50%'
}

class CommentCreate extends Component {

    onCreateComment = (event) => {
        event.preventDefault()
        const comment = serializeForm(event.target, { hash: true });
        if (comment.body) {
            const postId = this.props.match.params.postId;
            this.props.addComment(postId, comment)
            document.getElementById("frmCreateComment").reset();
        }
    }

    render() {
        return (
            <div style={frmCreateComment}>
                <form onSubmit={this.onCreateComment} id="frmCreateComment">

                    <TextField
                        id="body"
                        label="Body"
                        name="body"
                        margin="normal"
                        style={input}
                    />

                    <TextField
                        id="author"
                        label="Author"
                        name="author"
                        margin="normal"
                        style={input}
                    />
                    <Button raised dense type='submit'>
                        <Save />
                        Create Comment
                    </Button>
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