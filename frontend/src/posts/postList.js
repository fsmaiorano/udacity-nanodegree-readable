import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './actions';

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
                sortBy:<select id='vote-score-selector' name='voteScore' onChange={this.sortBy} value={postSort}>
                    <option value='ORDERBY_MORE_VOTES' >More Votes</option>
                    <option value='ORDERBY_LESS_VOTES' >Less Votes</option>
                    <option value='ORDERBY_NEWER'>Newer</option>
                    <option value='ORDERBY_OLDER' >Older</option>

                </select>
                {
                    posts !== undefined && posts.map((post) => (
                        <div key={post.title} className='post-list'>
                            <Link to={`/${post.category}/${post.id}`}>Details</Link>
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                        </div>
                    ))
                }
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
