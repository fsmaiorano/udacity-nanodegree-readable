import { posts } from './posts/reducer';
import { categories } from './categories/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    posts,
    categories
})
