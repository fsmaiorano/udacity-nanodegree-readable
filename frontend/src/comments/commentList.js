import React from 'react';

export default props => (
    <div>
        {
            props.comments.map(comment => (
                <div>
                    <p>{comment.body}</p>
                    <p>{comment.author}</p>
                </div>
            ))
        }
    </div>
);