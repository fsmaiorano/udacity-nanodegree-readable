import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../comments/actions';

class PostDetail extends Component {
    render() {
        return (
            <div>fasdfsda</div>
        )
    }
}

const mapStateToProps = (state) => {
    const { post, comments } = state;
    return {
        post, comments
    }
}

export default withRouter(connect(mapStateToProps, actions)(PostDetail));