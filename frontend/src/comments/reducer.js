import * as ACTIONS from './actions'


export function comments(state = [], action) {
    switch (action.type) {
        case ACTIONS.GET_POST_COMMENTS:
            return action.comments;
        // var newState = []
        // newState = newState.concat(state)
        // action.comments.map(comment => {
        //     if (!contains(newState, comment)) {
        //         newState = newState.concat(comment)
        //     }
        //     return comment
        // })
        // return newState

        default:
            return state
    }
}