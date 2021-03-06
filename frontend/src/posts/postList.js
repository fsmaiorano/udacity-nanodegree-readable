import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as actions from './actions';
import Post from './post';
import { doSort } from '../utils/helpers/helpers';

class PostList extends Component {

    static propTypes = {
        posts: PropTypes.array.isRequired,
        postSort: PropTypes.object
    }

    componentDidMount = () => {
        this.props.orderByMoreVotes()
    }

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
        let postList = [];
        const { posts, postSort } = this.props

        if (posts) {
            postList = doSort(posts, postSort);
        }

        return (
            <div>
                {
                    posts ?
                        <div>
                            sortBy:
                <select id='vote-score-selector' name='voteScore' onChange={this.sortBy} value={postSort.sort}>
                                <option value='ORDERBY_MORE_VOTES' >More Votes</option>
                                <option value='ORDERBY_LESS_VOTES' >Less Votes</option>
                                <option value='ORDERBY_NEWER'>Newer</option>
                                <option value='ORDERBY_OLDER' >Older</option>

                            </select>
                            {
                                posts !== undefined && postList.map((post) => (
                                    <div key={post.title + 1} className='post-list'>
                                        < Post post={post} />
                                    </div>
                                ))
                            }
                        </div>
                        : <div>Ups! No posts here</div>
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
