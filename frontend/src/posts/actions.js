import * as API from '../utils/api/apiReadable';
import { getComments } from '../comments/actions'


export const GET_ALL_POSTS = 'GET_ALL_POSTS'
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

export const getPosts = (posts) => {
    return {
        type: GET_ALL_POSTS,
        posts
    }
}

export const getAllPosts = () => {
    return dispatch => {
        API.fetchPosts().then(posts => {
            dispatch(getPosts(posts))
            dispatch(orderByMoreVotes())
            posts.map(post=>{
                dispatch(getComments(post.id))
                return post
              })
        })
    }
}