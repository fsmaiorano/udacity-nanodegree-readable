import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

//import * as actions from './actions';
 import { addComment, getComments, orderByMoreVotes, orderByLessVotes, orderByNewer, orderByOlder } from '../comments/actions';
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

    sortBy = (event) => {
        const value = event.target.value
        switch (value) {
            case 'ORDERBY_MORE_VOTES':
                return this.props.orderByMoreVotes()
            case 'ORDERBY_LESS_VOTES':
                return this.props.orderByLessVotes()
            case 'ORDERBY_NEWER':
                return this.props.orderByNewer()
            case 'ORDERBY_OLDER':
                return this.props.orderByOlder()
            default: return ''
        }
    }

    render() {
        const { posts, comments,commentSort } = this.props;
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
                sortBy:
                <select id='vote-score-selector' name='voteScore' onChange={this.sortBy} value={commentSort}>
                    <option value='ORDERBY_MORE_VOTES' >More Votes</option>
                    <option value='ORDERBY_LESS_VOTES' >Less Votes</option>
                    <option value='ORDERBY_NEWER'>Newer</option>
                    <option value='ORDERBY_OLDER' >Older</option>

                </select>
                <div className='comment-list'>
                    <p>Comments</p>
                    <CommentList comments={comments} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { posts, comments, commentSort } = state;
    return {
        posts, comments, commentSort
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getComments: (postId) => dispatch(getComments(postId)),
        addComment: (postId, comment) => dispatch(addComment(postId, comment)),
        orderByMoreVotes : () => dispatch(orderByMoreVotes()),
        orderByLessVotes : () => dispatch(orderByLessVotes()),
        orderByNewer : () => dispatch(orderByNewer()),
        orderByOlder : () => dispatch(orderByOlder())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));

