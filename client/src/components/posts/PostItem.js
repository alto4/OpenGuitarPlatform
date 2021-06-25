import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItem = ({ auth, post: { _id, text, name, avatar, user, likes, comments, date } }) => {
  return (
    <div className='post'>
      <div>
        <a href=''>
          <img src={avatar} alt={name} className='round' />
        </a>
        <h4>{name}</h4>
      </div>
      <div>
        <p>{text}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD' />
        </p>
        <button className='btn'>
          <i className='fa fa-thumbs-up'></i>
        </button>
        {likes.length > 0 && <span>{likes.length}</span>}
        <button className='btn'>
          <i className='fa fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`}>
          Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button className='btn'>
            <i className='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(PostItem);
