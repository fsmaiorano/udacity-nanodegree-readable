import React from 'react';

export default props => (
    <div>
        {
            props.comments.map(comment => (
                <p>{comment.body}</p>
            ))
        }
    </div>
);