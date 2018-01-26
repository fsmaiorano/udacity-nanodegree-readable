import React from 'react';
import { Link } from 'react-router-dom'

export default props => (
    <div>
        <p>Categories</p>
            {
                props.categories !== undefined && props.categories.map((category) => (
                    <Link to={`/${category.name}`}>
                        <span key={category.name}> {category.name} </span>
                    </Link>
                ))
            }
    </div>
)

