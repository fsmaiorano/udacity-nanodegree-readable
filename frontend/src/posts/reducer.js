import * as ACTIONS from './actions'

export const posts = (state = [], action) => {
    switch (action.type) {
        case ACTIONS.GET_ALL_POSTS:
            return action.posts.filter(post => post.deleted === false);

        default: return state;
    }
}