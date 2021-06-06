const mongoose = require('mongoose');
const { rawListeners } = require('./Post');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  videoURL: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  enrolled: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: string,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Lesson = mongoose.model('lesson', LessonSchema);
