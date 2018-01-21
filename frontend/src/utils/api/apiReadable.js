const apiUrl = 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Authorization': 'Readable'
}

//Posts
export const fetchPosts = () =>
    fetch(`${apiUrl}/posts`, { headers })
        .then(res => res.json());