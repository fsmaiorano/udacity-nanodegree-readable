import React, { Component } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import PostList from './posts/postList';
import { getAllPosts } from './posts/actions';

class App extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <div>
              <PostList posts={posts} />
              <div>
                <Link to='/posts/create' />
              </div>
            </div>
          )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { posts } = state;
  return {
    posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getAllPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
