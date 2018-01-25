import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as actions from './actions';

class PostEdit extends Component {

    onSubmit = (event) => {
        const { posts, history } = this.props;
        event.preventDefault()
        const editedPost = serializeForm(event.target, { hash: true });
        const selectedPost = this.selectedPost();


        if (selectedPost) {
            this.props.updatePost(editedPost, selectedPost, history);
        }


        // const curPost = this.getCurPost()
        // if (curPost) {
        //     curPost.title = post.title
        //     curPost.body = post.body
        //     curPost.category = post.category
        //     this.props.updatePost(curPost, this.props.history)
        // } else {
        //     this.props.addPost(post, this.props.history)
        // }
    }

    selectedPost = () => {
        const { posts } = this.props;
        const postId = this.props.match.params.postId
        return posts.filter(post => post.id === postId)[0];
    }

    render() {
        const { categories, history, posts } = this.props
        const post = this.selectedPost();
        return (
            <div>
                <a onClick={() => history.goBack()} className='close'> back </a>
                <form onSubmit={this.onSubmit} className='create-post-form'>
                    <div className='create-post-details'>
                        <input type='text' name='title' placeholder='title' defaultValue={post && post.title} />
                        <br />
                        <input type='text' name='body' placeholder='body' defaultValue={post && post.body} />
                        <br />
                        <select name='category' defaultValue={post && post.category}>
                            {
                                categories && categories.map(category => (
                                    <option value={category.name} key={category.name}>{category.name}</option>
                                ))

                            }
                        </select>
                        <button>Update Post</button>
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


export default withRouter(connect(mapStateToProps, actions)(PostEdit))