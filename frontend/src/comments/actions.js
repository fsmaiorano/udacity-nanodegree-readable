import * as API from '../utils/api/apiReadable';

export const GET_POST_COMMENTS = 'GET_COMMENT_DETAIL'

export function getComments(postId) {
    return dispatch => {
      API.fetchComments(postId).then(comments => {
        dispatch({
          type : GET_POST_COMMENTS,
          comments
        })
      })
    }
  }