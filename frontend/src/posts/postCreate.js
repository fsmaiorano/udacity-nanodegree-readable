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
import Select from 'material-ui/Select'
import Save from 'material-ui-icons/Save';
import Back from 'material-ui-icons/Close';
import BackRoute from 'material-ui-icons/ChevronLeft';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';

const link = {
    textDecoration: 'none'
}

const createPostForm = {
    padding: '5%',
    width: '50%',
    left: '50%',
    position: 'relative',
    transform: 'translate(-50%, 25%)'
}

const input = {
    width: '100%'
}

const buttons = {
    margin: '10%'
}

const button = {
    marginLeft: '20%'
}

class PostCreate extends Component {

    state = {
        category: 'react'
    }

    onSubmit = (event) => {
        event.preventDefault()
        const post = serializeForm(event.target, { hash: true });
        this.props.addPost(post, this.props.history)
    }

    handleChange = event => {
        this.setState({ category: event.target.value });
    };

    render() {
        const { categories, history, posts } = this.props

        let category = 'react';
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Link to='/' style={link}>
                            <BackRoute />
                        </Link>
                    </Toolbar>
                </AppBar>

                <Paper elevation={4} style={createPostForm}>
                    <form onSubmit={this.onSubmit}  >
                        <TextField
                            id="title"
                            label="Title"
                            name="title"
                            margin="normal"
                            style={input}
                        />

                        <TextField
                            id="body"
                            label="Body"
                            name="body"
                            margin="normal"
                            style={input}
                        />

                        <FormControl >
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                value={this.state.category}
                                inputProps={categories}
                                name='category'
                                style={input}
                                onChange={this.handleChange}
                            >
                                {
                                    categories && categories.map(category => (
                                        <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>

                        <div style={buttons}>
                            <Link to='/' style={link}>
                                <Button raised dense>
                                    <Back />
                                    Cancel
                                </Button>
                            </Link>

                            <Button raised dense style={button} type='submit'>
                                <Save />
                                Create Post
                                </Button>
                        </div>
                    </form>
                </Paper>

            </div>
        )
    }
}


function mapStateToProps(state) {
    const { categories, posts } = state
    return {
        categories,
        posts
    }
}


export default withRouter(connect(mapStateToProps, actions)(PostCreate))