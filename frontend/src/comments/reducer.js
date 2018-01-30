import * as ACTIONS from './actions'
import {doSort} from '../utils/helpers/helpers';

export function comments(state = [], action) {
    switch (action.type) {
        case ACTIONS.GET_POST_COMMENTS:
            return action.comments;
        case ACTIONS.ADD_COMMENT:
            return state.concat(action.comment)
        case ACTIONS.DELETE_COMMENT:
            return state.map(comment => {
                if (comment.id === action.commentId) {
                    comment.deleted = true
                }
                return comment
            })
        case ACTIONS.UPDATE_COMMENT:
            return state.map(comment => {
                if (comment.id === action.comment.id) {
                    return action.comment
                }
                return comment
            })
        case ACTIONS.VOTE_COMMENT:
            return state.map(comment => {
                if (comment.id === action.comment.id) {
                    return action.comment
                }
                return comment
            })
        case ACTIONS.ORDERBY_LESS_VOTES:
        case ACTIONS.ORDERBY_MORE_VOTES:
        case ACTIONS.ORDERBY_OLDER:
        case ACTIONS.ORDERBY_NEWER:
            return doSort(state, action.type)
        default:
            return state
    }
}