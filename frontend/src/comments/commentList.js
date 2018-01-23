import React from 'react';
import { dateFormat } from '../utils/helpers/helpers';

export default props => (
    <div>
        {
            props.comments.map(comment => (
                <div>
                    <p>{comment.body}</p>
                    <p>{comment.author}</p>
                    <p>{dateFormat(comment.timestamp)}</p>
                    <p>Votescore: {comment.voteScore}</p>
                </div>
            ))
        }
    </div>
);