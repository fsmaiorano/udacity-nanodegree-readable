import * as ACTIONS from './actions'
import {doSort} from '../utils/helpers/helpers';

export const posts = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.ADD_POST:
            return state.concat(action.post)
        case ACTIONS.DELETE_POST:
            return state.filter((post) => {
                return post.id !== action.postId
            })
        case ACTIONS.GET_ALL_POSTS:
            return action.posts.filter(post => post.deleted === false);
        case ACTIONS.ORDERBY_LESS_VOTES:
        case ACTIONS.ORDERBY_MORE_VOTES:
        case ACTIONS.ORDERBY_OLDER:
        case ACTIONS.ORDERBY_NEWER:
            return doSort(state, action.type)
        case ACTIONS.VOTE_POST:
            return state.map(post => {
                if (post.id === action.post.id) {
                    return action.post
                }
                return post
            })
        default: return state;
    }
}

export function postSort(state={sort:'ORDERBY_MORE_VOTES'}, action) {
    switch (action.type) {
      case ACTIONS.ORDERBY_OLDER:
        return {sort : 'ORDERBY_OLDER'}
      case ACTIONS.ORDERBY_NEWER:
        return {sort : 'ORDERBY_NEWER'}
      case ACTIONS.ORDERBY_LESS_VOTES:
        return {sort : 'ORDERBY_LESS_VOTES'}
      case ACTIONS.ORDERBY_MORE_VOTES:
        return {sort : 'ORDERBY_MORE_VOTES'}
      default:
        return state
    }
  }
 
