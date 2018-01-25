import React, { Component } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import PostCreate from './posts/postCreate';
import PostEdit from './posts/postEdit';
import PostList from './posts/postList';
import CategoryList from './categories/categoryList';
import CategoryDetail from './categories/categoryDetail';
import CommentEdit from './comments/commentEdit';
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
              <div className="post-create">
                <Link to='/post/create'>X</Link>
              </div>
            </div>
          )} />
          <Route exact path={'/post/create'} component={PostCreate} />
          <Route path={'/post/:postId/edit'} component={PostEdit} />
          <Route exact path={'/:category'} component={CategoryDetail} />
          <Route exact path={'/:category/:postId'} component={PostDetails} />
          <Route exact path={'/:category/:postId'} component={PostDetails} />
          <Route exact path={'/:category/:postId/comment/:commentId/edit'} component={CommentEdit} />
        </Switch>
      </div>
    );
  }
}

// <Route exact path={'/:category/:postId/comment/:commentId/edit'} component={PostDetails} />
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
