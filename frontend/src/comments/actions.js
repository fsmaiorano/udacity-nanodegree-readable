import * as API from '../utils/api/apiReadable';

export const GET_POST_COMMENTS = 'GET_COMMENT_DETAIL';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ORDERBY_MORE_VOTES = 'ORDERBY_MORE_VOTES'
export const ORDERBY_LESS_VOTES = 'ORDERBY_LESS_VOTES'
export const ORDERBY_NEWER = 'ORDERBY_NEWER'
export const ORDERBY_OLDER = 'ORDERBY_OLDER'

export function orderByMoreVotes() {
    return {
        type: ORDERBY_MORE_VOTES
    }
}

export function orderByLessVotes() {
    return {
        type: ORDERBY_LESS_VOTES
    }
}

export function orderByNewer() {
    return {
        type: ORDERBY_NEWER
    }
}

export function orderByOlder() {
    return {
        type: ORDERBY_OLDER
    }
}

export const addCommentSuccess = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const getPostComments = (comments) => {
    return {
        type: GET_POST_COMMENTS,
        comments
    }
}

export const setDeleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const setUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}


export const deleteComment = (commentId, postId) => {
    return dispatch => {
        API.deleteComment(commentId).then(data => {
            if (data.status === 200) {
                dispatch(setDeleteComment(commentId));
                dispatch(getComments(postId));
                // dispatch({
                //     type: DELETE_COMMENT,
                //     commentId
                // })
            }
        })
    }
}

export function voteComment(commentId, isUp) {
    return dispatch => {
      API.voteComment(commentId, isUp).then(comment => {
        dispatch({
          type : VOTE_COMMENT,
          comment
        })
      })
    }
  }

export const getComments = (postId) => {
    return dispatch => {
        API.fetchComments(postId).then(comments => {
            dispatch(getPostComments(comments));
            // dispatch({
            //     type: GET_POST_COMMENTS,
            //     comments
            // })
        })
    }
}

export function updateComment(editedComment, selectedComment, history) {
    selectedComment.body = editedComment.body;
    selectedComment.author = editedComment.author;
    selectedComment.timestamp = new Date().getTime();
    return dispatch => {
        API.updateComment(selectedComment).then(comment => {
            dispatch(setUpdateComment(comment));
            history.goBack();
            // dispatch({
            //   type : UPDATE_COMMENT,
            //   comment
            // })
        })
    }
}


export const addComment = (postId, comment) => {
    const newComment = {
        body: comment.body,
        author: comment.author || 'Anonymous',
        id: Math.random().toString(36).substr(2, 16) + Math.random().toString(36).substr(2, 16),
        parentId: postId,
        timestamp: new Date().getTime(),
    }

    return dispatch => {
        API.addComment(newComment).then(data => {
            dispatch(addCommentSuccess(data))
        })
    }
}