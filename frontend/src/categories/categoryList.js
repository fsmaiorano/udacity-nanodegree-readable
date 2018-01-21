import React from 'react';

export default props => (
    <div>
        <p>Categories</p>
        <ul>
            {
                props.categories !== undefined && props.categories.map((category) => (
                    // <li key={category.name}> {category.name} </li>
                    <div>{category.name}</div>
                ))
            }
        </ul>
    </div>
)

