import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateFormat } from '../utils/helpers/helpers';
import { deleteComment, voteComment } from './actions';

//Material
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import SearchIcon from 'material-ui-icons/Search';
import ModeEdit from 'material-ui-icons/ModeEdit';
import ExpandMore from 'material-ui-icons/ExpandMore';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ThumbUp from 'material-ui-icons/ThumbUp';
import Tooltip from 'material-ui/Tooltip';


class Comment extends Component {

    editComment = (commentId, commentParentId) => {
        const { history, category, postId } = this.props;
        this.props.history.push(`/${category}/${commentParentId}/comment/${commentId}/edit`);
    }

    renderCommentCreateForm = () => {
        const { comment } = this.props;
        return (
            <div>
                {
                    comment !== undefined ? (
                        <div>
                            <p>{comment.body}</p>
                            <p>{comment.author}</p>
                            <p>{dateFormat(comment.timestamp)}</p>
                            <p>Votescore: {comment.voteScore}</p>

                            <Tooltip id="tooltip-icon" title="Delete this comment">
                                <IconButton color="primary" onClick={() => this.props.deleteComment(comment.id, comment.parentId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip id="tooltip-icon" title="Edit this comment">
                                <IconButton color="primary" onClick={() => this.editComment(comment.id, comment.parentId)}>
                                    <ModeEdit />
                                </IconButton>
                            </Tooltip>

                            <Tooltip id="tooltip-icon" title="Like">
                                <IconButton color="primary" onClick={() => this.props.voteComment(comment.id, true)}>
                                    <ExpandLess />
                                </IconButton>
                            </Tooltip>

                            <IconButton disabled color="primary" >
                                <ThumbUp color="primary" />
                            </IconButton>

                            <Tooltip id="tooltip-icon" title="Dislike">
                                <IconButton color="primary" onClick={() => this.props.voteComment(comment.id, false)}>
                                    <ExpandMore />
                                </IconButton>
                            </Tooltip>
                           
                        </div>) : (<div></div>)
                }
            </div>
        )
    }

    render() {
        const { action } = this.props;
        switch (action) {
            case 'create':
                return (
                    this.renderCommentCreateForm()
                )
                break;

            default:
                break;
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (commentId, postId) => dispatch(deleteComment(commentId, postId)),
        voteComment: (commentId, vote) => dispatch(voteComment(commentId, vote))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Comment))
