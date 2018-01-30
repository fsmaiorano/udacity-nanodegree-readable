import { orderBy } from 'lodash';

// Format timestamp in formated date
export const dateFormat = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleDateString();
}

// Sort by selected 
export const doSort = (state, sortFunc) => {
    switch (sortFunc.sort) {
        case 'ORDERBY_MORE_VOTES':
            return orderBy(state, 'voteScore', 'desc')
        case 'ORDERBY_LESS_VOTES':
            return orderBy(state, 'voteScore', 'asc')
        case 'ORDERBY_NEWER':
            return orderBy(state, 'timestamp', 'desc')
        case 'ORDERBY_OLDER':
            return orderBy(state, 'timestamp', 'asc')
        default: return state
    }
}