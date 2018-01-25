import React from 'react';
import { Link } from 'react-router-dom'

//Material
import Button from 'material-ui/Button';

const categoryList = {
    margin: '20px',
    display: 'inline-block'
}

export default props => (
    <div>
        {
            props.categories !== undefined && props.categories.map((category) => (
                <div style={categoryList}>
                    <Link to={`/${category.name}`} style={{ textDecoration: 'none' }} >
                        <Button color="primary" key={category.name}> {category.name} </Button>
                    </Link>
                </div>
            ))
        }
    </div>
)

