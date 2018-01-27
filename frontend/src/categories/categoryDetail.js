import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CategoryList from './categoryList';
import PostList from '../posts/postList';

class CategoryDetail extends Component {

    validateRoute = (categories, category) => {

        if (!categories[category]) {
            return (
                <div>
                    <p>Invalid Route!</p>
                </div>
            )
        }
    }

    render() {
        const { categories, posts } = this.props;
        const category = categories.filter((category) => category.name === this.props.match.params.category);

        this.validateRoute(categories, category);

        let filterByCategory = posts && posts.filter((post) => post.category === this.props.match.params.category);

        return (
            <div>
                <button onClick={() => this.props.history.goBack()}>Back</button>
                <div>
                    <CategoryList categories={category} />
                    <PostList posts={filterByCategory} />
                </div>
                <div className="add-post">
                    <Link to='/post/create' />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { categories, posts } = state;
    return {
        categories,
        posts
    }
}

export default withRouter(connect(mapStateToProps)(CategoryDetail));
