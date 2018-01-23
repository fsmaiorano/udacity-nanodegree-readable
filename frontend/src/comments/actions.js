import * as API from '../utils/api/apiReadable';

export const GET_POST_COMMENTS = 'GET_COMMENT_DETAIL';
export const ADD_COMMENT = 'ADD_COMMENT';
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