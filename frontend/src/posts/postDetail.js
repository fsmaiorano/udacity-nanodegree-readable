import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getComments, orderByMoreVotes, orderByLessVotes, orderByNewer, orderByOlder } from '../comments/actions';
import Post from './post';
import CommentCreate from '../comments/commentCreate';
import CommentList from '../comments/commentList';
import { PropTypes } from 'prop-types';

class PostDetail extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
    }

    backToRoot = () => {
        this.props.history.push('/');
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        this.props.getComments(postId);
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

    commentsCount = (post, comments) => {
        if (post !== undefined) {
            const commentCount = comments.filter(comment => comment.parentId === post.id && !comment.deleted && !comment.parentDeleted)
            return commentCount.length;
        }
        else {
            return this.backToRoot();
        }
    }

    render() {
        const { posts, comments, commentSort } = this.props;
        const postId = this.props.match.params.postId;
        const post = posts.filter((post) => post.id === postId)[0];

        if (post) post.commentCount = this.commentsCount(post, comments);
        return (
            <div>
                <button onClick={() => this.props.history.goBack()}>Back</button>
                <h1>Post Detail</h1>
                <div className='post-detail'>
                    <Post post={post} />
                </div>
                <div className='comment-create'>
                    <CommentCreate />
                </div>
                sortBy:
                <select id='vote-score-selector' name='voteScore' onChange={this.sortBy} value={commentSort}>
                    <option value='ORDERBY_MORE_VOTES' >More Votes</option>
                    <option value='ORDERBY_LESS_VOTES' >Less Votes</option>
                    <option value='ORDERBY_NEWER'>Newer</option>
                    <option value='ORDERBY_OLDER' >Older</option>

                </select>
                <div>
                    <CommentList post={post} comments={comments} />
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
        orderByMoreVotes: () => dispatch(orderByMoreVotes()),
        orderByLessVotes: () => dispatch(orderByLessVotes()),
        orderByNewer: () => dispatch(orderByNewer()),
        orderByOlder: () => dispatch(orderByOlder())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetail));

