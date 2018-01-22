import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { addComment, getComments } from '../comments/actions';
import Post from './post';
import CommentList from '../comments/commentList';
import serializeForm from 'form-serialize'

class PostDetail extends Component {

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        this.props.getComments(postId);
    }

    onCreateComment = (event) => {
        event.preventDefault()
        const comment = serializeForm(event.target, { hash: true });
        if (comment.body) {
            const postId = this.props.match.params.postId;
            this.props.addComment(postId, comment)
        }
    }

    // renderPost = (posts) => {
    //     const postId = this.props.match.params.postId;
    //     const post = posts.filter((post) => post.id === postId)[0];
    //     if (post) {
    //         return (
    //             <div>
    //                 <p>{post.title}</p>
    //                 <p>{post.body}</p>
    //             </div>
    //         )
    //     }
    // }

    // renderComments = (comments) => {
    //     return (
    //         comments && comments.map(comment => (
    //             comment.deleted === true ? (<div></div>) : (
    //                 <div key={comment.id} >
    //                     <p>{comment.body}</p>
    //                     <p>{comment.author}</p>
    //                 </div>
    //             )
    //         ))
    //     )
    // }

    render() {
        const { posts, comments } = this.props;
        const postId = this.props.match.params.postId;
        const post = posts.filter((post) => post.id === postId)[0];
        return (
            <div>
                <div>
                    <p>Post</p>
                    <Post post={post} />
                </div>
                <div className='comment-create'>
                    <form onSubmit={this.onCreateComment}>
                        <input type='text' name='body' placeholder='input an comment' ref='body' />
                        <input type='text' name='author' placeholder='author of comment' ref='author' />
                        <button>submit comment</button>
                    </form>
                </div>
                <div className='comment-list'>
                    <p>Comments</p>
                    <CommentList comments={comments} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { posts, comments } = state;
    return {
        posts, comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (postId) => dispatch(getComments(postId)),
        addComment: (postId, comment) => dispatch(addComment(postId, comment))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));