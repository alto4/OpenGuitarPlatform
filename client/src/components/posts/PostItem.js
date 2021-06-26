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
}) => {
  return (
    <div className='post'>
      <div>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt={name} className='round' />
        </Link>
        <h4>{name}</h4>
      </div>
      <div>
        <p>{text}</p>
        <p>
          Posted on <Moment format='YYYY/MM/DD' />
        </p>
        <button onClick={(e) => addLike(_id)} className='btn'>
          <i className='fa fa-thumbs-up'></i>
        </button>
        {likes > 0 && <span>{likes.length}</span>}
        <span>{likes.length}</span>
        <button onClick={(e) => removeLike(_id)} className='btn'>
          <i className='fa fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`}>
          Discussion {comments.length > 0 && <span className='comment-count'>{comments.length}</span>}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button onClick={(e) => deletePost(_id)} className='btn'>
            <i className='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
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
