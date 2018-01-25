import * as API from '../utils/api/apiReadable';
import { getComments } from '../comments/actions'

export const VOTE_POST = 'VOTE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
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

function addPostSuccess(post) {
    return {
        type: ADD_POST,
        post
    }
}


function deletePostSuccess(postId) {
    return {
        type: DELETE_POST,
        postId
    }
}


export const getPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}


export const updatePostSuccess = (post) => {
    return {
        type: UPDATE_POST,
        post
    }
}

function votePostSuccess(post) {
    return {
      type : VOTE_POST,
      post
    }
  }

export function votePost(postId, isUp) {
    return dispatch => {
      API.votePost(postId, isUp).then(data => {
        dispatch(votePostSuccess(data))
      })
    }
  }

export function addPost(post, history) {
    const newPost = {
        title: post.title,
        body: post.body,
        author: post.author || 'Anonymous',
        category: post.category,
        id: Math.random().toString(36).substr(2, 16) + Math.random().toString(36).substr(2, 16),
        parentId: post.id,
        timestamp: new Date().getTime(),
    }

    return dispatch => {
        API.createPost(newPost).then((data) => {
            dispatch(addPostSuccess(data))
            history.goBack()
        })
    }
}

export function updatePost(editedPost, selectedPost, history) {

    selectedPost.title = editedPost.title;
    selectedPost.body = editedPost.body;
    selectedPost.author = editedPost.author;
    selectedPost.category = editedPost.category;
    selectedPost.timestamp = new Date().getTime()

    return dispatch => {
        API.updatePost(selectedPost).then(data => {
            dispatch(updatePostSuccess(data))
            history.goBack()
        })
    }
}

export const getAllPosts = () => {
    return dispatch => {
        API.fetchPosts().then(posts => {
            posts.map(post=>{
                dispatch(getComments(post.id))
                return post
              })
            dispatch(getPosts(posts))
            dispatch(orderByMoreVotes())
        })
    }
}

export const deletePost = (postId, history) => {
    return dispatch => {
        API.deletePost(postId).then((data) => {
            if (data.status === 200) {
                dispatch(deletePostSuccess(postId))
                if (history) {
                    history.goBack()
                }
            }
        })
    }
}