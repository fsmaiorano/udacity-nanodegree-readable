import React, { Component } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import PostList from './posts/postList';
import CategoryList from './categories/categoryList';
import CategoryDetail from './categories/categoryDetail';
import PostDetails from './posts/postDetail'
import { getAllPosts } from './posts/actions';
import { getAllCategories } from './categories/actions';

class App extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  render() {
    const { posts, categories } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <div>
              <CategoryList categories={categories} />
              <PostList posts={posts} />
              <div>
                <Link to='/posts/create' />
              </div>
            </div>
          )} />
          <Route exact path={'/:category'} component={CategoryDetail} />
          <Route exact path={'/:category/:postId'} component={PostDetails} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { posts, categories } = state;
  return {
    posts, categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getAllPosts()),
    getCategories: () => dispatch(getAllCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
