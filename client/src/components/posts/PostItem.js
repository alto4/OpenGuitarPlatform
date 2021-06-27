import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className='post-card'>
      <div className='post-card-header'>
        <h4>{name}</h4>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt={name} className='round avatar-md' />
        </Link>
      </div>
      <div>
        <p>{text}</p>
        <p className='post-date'>
          Posted on <Moment className='post-date' format='YYYY/MM/DD' />
        </p>
      </div>
      {showActions && (
        <div className='post-action-buttons'>
          <button onClick={(e) => addLike(_id)} className='btn btn-like'>
            <i className='fa fa-thumbs-up fa-sm'></i>
          </button>
          {likes > 0 && <span>{likes.length}</span>}
          <p className='like-count'>{likes.length}</p>
          <button onClick={(e) => removeLike(_id)} className='btn btn-like'>
            <i className='fa fa-thumbs-down fa-sm'></i>
          </button>
          {!auth.loading && user === auth.user._id && (
            <button onClick={(e) => deletePost(_id)} className='btn btn-danger'>
              <i className='fa fa-times'></i>
            </button>
          )}
        </div>
      )}
      <Link className='btn btn-discussion' to={`/posts/${_id}`}>
        Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
      </Link>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
