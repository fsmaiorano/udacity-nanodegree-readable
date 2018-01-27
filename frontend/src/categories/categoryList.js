import React from 'react';
import { Link } from 'react-router-dom'

export default props => (
    <div className='category-list'>
        <p>Categories</p>
            {
                props.categories !== undefined && props.categories.map((category) => (
                    <Link key={category.name} to={`/${category.name}`}>
                        <span className='category' key={category.name}> {category.name} </span>
                    </Link>
                ))
            }
    </div>
)

