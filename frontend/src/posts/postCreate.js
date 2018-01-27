import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { PropTypes } from 'prop-types';
import * as actions from './actions';

class PostCreate extends Component {

    static propTypes = {
        categories: PropTypes.array.isRequired,
    }

    onSubmit = (event) => {
        event.preventDefault()
        const post = serializeForm(event.target, { hash: true });
        this.props.addPost(post, this.props.history)
    }

    render() {
        const { categories } = this.props
        return (
            <div>
                <button onClick={() => this.props.history.goBack()}>Back</button>
                <form onSubmit={this.onSubmit} className='create-post-form'>
                    <div className='create-post-details'>
                        <input type='text' name='title' placeholder='title' />
                        <br />
                        <input type='text' name='body' placeholder='body' />
                        <br />
                        <select name='category'>
                            {
                                categories && categories.map(category => (
                                    <option value={category.name} key={category.name}>{category.name}</option>
                                ))

                            }
                        </select>
                        <br />
                        <button onClick={() => this.props.history.push('/')}>Cancel</button>
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