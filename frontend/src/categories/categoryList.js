import React from 'react';
import { Link } from 'react-router-dom'

export default props => (
    <div>
        <p>Categories</p>
        <ul>
            {
                props.categories !== undefined && props.categories.map((category) => (
                    <Link to={`/${category.name}`}>
                        <li key={category.name}> {category.name} </li>
                    </Link>
                ))
            }
        </ul>
    </div>
)

