import * as ACTIONS from './actions'
import { orderBy } from 'lodash';

function doSort(state, sortFunc) {
    switch (sortFunc) {
        case 'ORDERBY_MORE_VOTES':
            return orderBy(state, 'voteScore', 'desc')
        case 'ORDERBY_LESS_VOTES':
            return orderBy(state, 'voteScore', 'asc')
        case 'ORDERBY_NEWER':
            return orderBy(state, 'timestamp', 'desc')
        case 'ORDERBY_OLDER':
            return orderBy(state, 'timestamp', 'asc')
        default: return ''
    }
}


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
        case ACTIONS.ORDERBY_LESS_VOTES:
        case ACTIONS.ORDERBY_MORE_VOTES:
        case ACTIONS.ORDERBY_OLDER:
        case ACTIONS.ORDERBY_NEWER:
            return doSort(state, action.type)
        default:
            return state
    }
}