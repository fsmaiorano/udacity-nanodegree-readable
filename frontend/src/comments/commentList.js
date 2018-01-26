import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateFormat } from '../utils/helpers/helpers';

import Comment from './comment';
import { deleteComment } from './actions';

//Material
import Paper from 'material-ui/Paper';

const card = {
    padding: '4%'
}

class CommentList extends Component {
    render() {
        const { comments, post } = this.props;
        return (
            <div>
                {
                    comments && comments.map(comment => (
                        <Paper elevation={4} style={card}>
                            <Comment comment={comment} category={post.category} action={'create'} />
                        </Paper>
                    ))
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CommentList))

