const apiUrl = 'http://localhost:3001'

const headers = {
    'Accept': 'application/json',
    'Authorization': 'Readable'
}

//Posts
export const votePost = (postId, isUp) => {
    const body = {option: isUp ? 'upVote':'downVote'}
    return fetch(`${apiUrl}/posts/${postId}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
  }
  

export const deletePost = (postId) => {
    return fetch(`${apiUrl}/posts/${postId}`, {
        method: 'DELETE',
        headers
    })
}

export const updatePost = (post) => {
    return fetch(`${apiUrl}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(res => res.json())
}


export const fetchPosts = () =>
    fetch(`${apiUrl}/posts`, { headers })
        .then(res => res.json());

export const createPost = (body) =>
    fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())

//Categories
export const fetchAllCategories = () =>
    fetch(`${apiUrl}/categories`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

//Comments
export const fetchComments = (postId) => {
    return fetch(`${apiUrl}/posts/${postId}/comments`, { headers })
        .then(res => res.json())
}

export const deleteComment = (commentId) => {
    return fetch(`${apiUrl}/comments/${commentId}`, {
        method: 'DELETE',
        headers
    })
}

export const updateComment = (comment) => {
    return fetch(`${apiUrl}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(res => res.json())
}

export const addComment = (body) => {
    return fetch(`${apiUrl}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => res.json())
}