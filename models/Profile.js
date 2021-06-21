const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  instrument: {
    type: String,
  },
  level: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  genres: {
    type: [String],
  },
  years: {
    type: Number,
  },
  experience: [
    {
      position: {
        type: String,
      },
      organization: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
      },
      credential: {
        type: String,
      },
      field: {
        type: String,
      },
      from: {
        type: Date,
      },
      to: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
