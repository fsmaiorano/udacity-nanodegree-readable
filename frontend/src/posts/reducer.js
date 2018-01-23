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

export const posts = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.ADD_POST:
        return state.concat(action.post)
        case ACTIONS.GET_ALL_POSTS:
            return action.posts.filter(post => post.deleted === false);
        case ACTIONS.ORDERBY_LESS_VOTES:
        case ACTIONS.ORDERBY_MORE_VOTES:
        case ACTIONS.ORDERBY_OLDER:
        case ACTIONS.ORDERBY_NEWER:
            return doSort(state, action.type)
        default: return state;
    }
}
