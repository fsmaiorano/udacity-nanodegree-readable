import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as actions from './actions';

//Material
import TextField from 'material-ui/TextField';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import BackRoute from 'material-ui-icons/ChevronLeft';
import Save from 'material-ui-icons/Save';
import Back from 'material-ui-icons/Close';
import Button from 'material-ui/Button';

const input = {
    width: '100%'
}

const frmEditComment = {
    width: '50%',
    transform: 'translate(50%)'
}


const link = {
    textDecoration: 'none'
}

const buttons = {
    margin: '10%'
}

const button = {
    marginLeft: '20%'
}


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
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Link to='/' style={link}>
                            <BackRoute />
                        </Link>
                    </Toolbar>
                </AppBar>
                <div style={frmEditComment}>
                    {
                        comment !== undefined ? (
                            <form onSubmit={this.onEditComment} >
                                <TextField
                                    id="body"
                                    label="Body"
                                    name="body"
                                    margin="normal"
                                    style={input}
                                    defaultValue={comment.body}
                                />

                                <TextField
                                    id="author"
                                    label="Author"
                                    name="author"
                                    margin="normal"
                                    style={input}
                                    defaultValue={comment.author}
                                />
                                <div style={buttons}>

                                    <Button raised dense onClick={() => this.props.history.goBack()} >
                                        <Back />
                                        Cancel
                                </Button>

                                    <Button raised dense style={button} type='submit'>
                                        <Save />
                                        Edit Comment
                                </Button>
                                </div>
                            </form>
                        ) : (<div></div>)
                    }
                </div>
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