import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      {' '}
      <h1>Posts</h1>
      <p className='lead'>Connect with like-minded guitar connosseurs.</p>
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
