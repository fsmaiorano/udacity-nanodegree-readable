import { posts, postSort } from './posts/reducer';
import { categories } from './categories/reducer';
import { comments,commentSort } from './comments/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    posts,
    categories,
    comments,
    postSort,
    commentSort
})
