import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deletePost, votePost } from './actions';

//Material
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import SearchIcon from 'material-ui-icons/Search';
import ModeEdit from 'material-ui-icons/ModeEdit';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Tooltip from 'material-ui/Tooltip';

const postInfo = {
    display: 'inline-block',
    width: '100%'
}

const info ={
    width: '33%',
    display: 'inline-block'
}

class Post extends Component {

    editPost = (postId) => {
        const { history } = this.props;
        this.props.history.push(`/post/${postId}/edit`);
    }

    commentsCount = (postId, comments) => {
        return comments.filter(comment => comment.parentId === postId && !comment.deleted && !comment.parentDeleted)
    }

    render() {
        const { comments, post, history } = this.props;
        const postComments = this.commentsCount(post.id, comments)
        return (
            <div>
                {
                    post !== undefined ? (
                        <div>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            <div style={postInfo}>
                                <p style={info}>Category: {post.category}</p>
                                <p style={info}>VoteScore: {post.voteScore}</p>
                                <p style={info}>Comments: {comments.length}</p>
                            </div>

                            <Tooltip id="tooltip-icon" title="Post Details">
                                <Link to={`/${post.category}/${post.id}`}>
                                    <IconButton color="primary">
                                        <SearchIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            <Tooltip id="tooltip-icon" title="Delete this post">
                                <IconButton color="primary" onClick={() => this.props.deletePost(post.id, history)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip id="tooltip-icon" title="Edit this post">
                                <IconButton color="primary" onClick={() => this.editPost(post.id)}>
                                    <ModeEdit />
                                </IconButton>
                            </Tooltip>

                            <Tooltip id="tooltip-icon" title="Like">
                                <IconButton color="primary" onClick={() => this.props.votePost(post.id, true)}>
                                    <ExpandLess />
                                </IconButton>
                            </Tooltip>

                            <IconButton disabled color="primary" onClick={() => this.props.votePost(post.id, true)}>
                                <ThumbUp color="primary" />
                            </IconButton>

                            <Tooltip id="tooltip-icon" title="Dislike">
                                <IconButton color="primary" onClick={() => this.props.votePost(post.id, false)}>
                                    <ExpandMore />
                                </IconButton>
                            </Tooltip>


                        </div>
                    ) : (<div></div>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { comments } = state
    return {
        comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (postId, history) => dispatch(deletePost(postId, history)),
        votePost: (postId, vote) => dispatch(votePost(postId, vote))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
