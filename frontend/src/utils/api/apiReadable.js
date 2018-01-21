const apiUrl = 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Authorization': 'Readable'
}

//Posts
export const fetchPosts = () =>
    fetch(`${apiUrl}/posts`, { headers })
        .then(res => res.json());

//Categories
export const fetchAllCategories = () =>
    fetch(`${apiUrl}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)