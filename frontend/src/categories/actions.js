import * as API from '../utils/api/apiReadable';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

export const getCategories = (categories) => {
    return {
        type: GET_ALL_CATEGORIES,
        categories
    }
}

export const getAllCategories = () => {
    return dispatch => {
        API.fetchAllCategories().then(categories => dispatch(getCategories(categories)))
    }
}