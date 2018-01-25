import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';
import Post from './post';

//Material
import Paper from 'material-ui/Paper';

const sortBy = {
    margin: '5%'
}

const post = {
    margin: 'auto 5% auto;'
}

const singlePost = {
    maxWidth: '700px',
    left: '50%',
    position: 'relative',
    transform: 'translate(-50%)',
    paddingBottom: '3%'
}

const card = {
    padding: '4%'
}

class PostList extends Component {
    sortBy = (event) => {
        const value = event.target.value
        switch (value) {
            case 'ORDERBY_MORE_VOTES':
                return this.props.orderByMoreVotes()
            case 'ORDERBY_LESS_VOTES':
                return this.props.orderByLessVotes()
            case 'ORDERBY_NEWER':
                return this.props.orderByNewer()
            case 'ORDERBY_OLDER':
                return this.props.orderByOlder()
            default: return ''
        }
    }
    render() {
        const { posts, postSort } = this.props
        return (
            <div>

                <div style={sortBy}>
                    sortBy:
                <select id='vote-score-selector' name='voteScore' onChange={this.sortBy} value={postSort}>
                        <option value='ORDERBY_MORE_VOTES' >More Votes</option>
                        <option value='ORDERBY_LESS_VOTES' >Less Votes</option>
                        <option value='ORDERBY_NEWER'>Newer</option>
                        <option value='ORDERBY_OLDER' >Older</option>
                    </select>
                </div>
                <div style={post}>
                    {
                        posts !== undefined && posts.map((post) => (
                            <div key={post.title} style={singlePost}>
                                <Paper elevation={4} style={card}>
                                    <Post post={post} />
                                </Paper>

                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { postSort } = state;
    return {
        postSort
    }
}

export default withRouter(connect(mapStateToProps, actions)(PostList));
