import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deletePost, votePost } from './actions';

class Post extends Component {

    static propTypes = {
        post: PropTypes.object,
        comments: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
    }

    backToRoot = () => {
        this.props.history.push('/');
    }

    editPost = (postId) => {
        this.props.history.push(`/post/${postId}/edit`);
    }

    render() {
        const { post, history } = this.props;

        return (
            <div>

                {
                    post ? (
                        <div>
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                            <p>Author: {post.author}</p>
                            <p>VoteScore: {post.voteScore}</p>
                            <p>Comments: {post.commentCount}</p>
                            {
                                this.props.history.location.pathname !== '/' ? (<div></div>) : (
                                    <button onClick={() => this.props.history.push(`/${post.category}/${post.id}`)}><i className="fa fa-search fa-3x" aria-hidden="true"></i></button>
                                )
                            }
                            <button onClick={() => this.props.deletePost(post.id, history)}><i className="fa fa-trash-o fa-3x" aria-hidden="true"></i></button>
                            <button onClick={() => this.editPost(post.id)}><i className="fa fa-pencil-square-o fa-3x" aria-hidden="true"></i></button>
                            <button onClick={() => this.props.votePost(post.id, true)}><i className="fa fa-thumbs-o-up fa-3x" aria-hidden="true"></i></button>
                            <button onClick={() => this.props.votePost(post.id, false)}><i className="fa fa-thumbs-o-down fa-3x" aria-hidden="true"></i></button>
                        </div>
                    ) : (<div>Ups! No post here</div>)
                }
            </div>
        )
    }
}

const mapStateToProps = ({ comments }) => ({ comments });

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (postId, history) => dispatch(deletePost(postId, history)),
        votePost: (postId, vote) => dispatch(votePost(postId, vote))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
