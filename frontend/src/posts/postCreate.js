import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as actions from './actions';

class PostCreate extends Component {

    onSubmit = (event) => {
        event.preventDefault()
        const post = serializeForm(event.target, { hash: true });
        this.props.addPost(post, this.props.history)
    }

    render() {
        const { categories, history, posts } = this.props
        return (
            <div>
                <a onClick={() => history.goBack()} className='close'> back </a>
                <form onSubmit={this.onSubmit} className='create-post-form'>
                    <div className='create-post-details'>
                        <input type='text' name='title' placeholder='title' />
                        <br />
                        <input type='text' name='body' placeholder='body'  />
                        <br />
                        <select name='category'>
                            {
                                categories && categories.map(category => (
                                    <option value={category.name} key={category.name}>{category.name}</option>
                                ))

                            }
                        </select>
                        <br/>
                        <button onClick={() => this.props.history.goBack()}>Cancel</button>
                        <button>Create Post</button>
                    </div>
                </form>
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