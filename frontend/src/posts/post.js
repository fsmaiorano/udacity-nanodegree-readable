import React from 'react';

export default props => (
    <div>
        {
            props.post !== undefined ? (
                <div>
                    <p>{props.post.title}</p>
                    <p>{props.post.body}</p>
                </div>
            ) : (<div></div>)
        }
    </div>
)