import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions';

class PostCreate extends Component {
    render() {
        return (
            <div>post create</div>
        )
    }
}


function mapStateToProps(state) {
    const { categories, posts } = state
    return {
        categories,
        posts
    }
}


export default withRouter(connect(mapStateToProps, actions)(PostCreate))