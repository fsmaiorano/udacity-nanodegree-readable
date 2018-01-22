import * as API from '../utils/api/apiReadable';

export const GET_POST_COMMENTS = 'GET_COMMENT_DETAIL';
export const ADD_COMMENT = 'ADD_COMMENT';

export const addCommentSuccess = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const getComments = (postId) => {
    return dispatch => {
        API.fetchComments(postId).then(comments => {
            dispatch({
                type: GET_POST_COMMENTS,
                comments
            })
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