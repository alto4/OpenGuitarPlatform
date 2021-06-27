import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/lesson';

const CommentItem = ({ lessonId, comment: { _id, text, name, avatar, user, date }, auth, deleteComment }) => {
  return (
    <div className='comment'>
      <div>
        <Link to={`/profile/${user}`}></Link>
        <img src={avatar} alt={name} className='round' />
        <h4>{name}</h4>
      </div>
      <div>
        <p>{text}</p>
        <p className='comment-date'>
          Posted on <Moment from='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button onClick={(e) => deleteComment(lessonId, _id)} type='button' className='btn'>
            <i className='fa fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  lessonId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
