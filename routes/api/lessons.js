const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Lesson = require('../../models/Lesson');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/lessons private - create new lesson
router.post(
  '/',
  [
    auth,
    [
      check('title', 'A title is required to create a new lesson.').not().isEmpty(),
      check('description', 'A brief description is required to create a new lesson.').not().isEmpty(),
      check('videoURL', 'A video link is required to create a new lesson.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newLesson = new Lesson({
        title: req.body.title,
        description: req.body.description,
        videoURL: req.body.videoURL,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const lesson = await newLesson.save();
      res.json(lesson);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }
  }
);

module.exports = router;
