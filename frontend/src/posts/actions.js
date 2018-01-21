import * as API from '../utils/api/apiReadable';

export const GET_ALL_POSTS = 'GET_ALL_POSTS'

export const getPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export const getAllPosts = () => {
    return dispatch => {
        API.fetchPosts().then(posts => dispatch(getPosts(posts)))
    }
}