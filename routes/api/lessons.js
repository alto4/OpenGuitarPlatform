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

// @route GET api/lessons public - get all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ date: -1 });
    res.json(lessons);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// @route GET api/lessons/:id public - get single lesson
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    res.json(lesson);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    res.status(500).send('Server error.');
  }
});

// @route DELETE api/lessons/:id private - delete single lesson
router.delete('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    // Verify that logged in user is the creator of the lesson
    if (lesson.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this lesson.' });
    }

    await lesson.remove();

    res.json({ message: 'Lesson successfully removed.' });
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Lesson not found.' });
    }

    res.status(500).json('Server Error');
  }
});

// @route PUT api/lessons/enrol/:id private - enroll in a lesson
router.put('/enroll/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (lesson.enrolled.filter((enrolled) => enrolled.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ message: 'You have already enrolled in this course.' });
    }

    lesson.enrolled.unshift({ user: req.user.id });

    await lesson.save();

    res.json(lesson.enrolled);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/lessons/unenroll/:id private - unenroll from a course
router.put('/unenroll/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (lesson.enrolled.filter((enrollment) => enrollment.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ message: 'You are not yet registered for this lesson.' });
    }

    // Get removal index
    const removeIndex = lesson.enrolled.map((enrollment) => enrollment.user.toString()).indexOf(req.user.id);

    lesson.enrolled.splice(removeIndex, 1);

    await lesson.save();

    res.json(lesson.enrolled);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/lessons/comment/:id private - comment on an existing lesson
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required to create a new comment.').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const lesson = await Lesson.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      console.log(lesson);
      lesson.comments.unshift(newComment);

      await lesson.save();

      res.json(lesson.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route DELETE api/lessons/comment/:id/:comment_id private - delete a comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    // Grab comment from specified lesson
    const comment = lesson.comments.find((comment) => comment.id === req.params.comment_id);

    // Check comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment does not exist.' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to remove this comment.' });
    }

    // Get removal index
    const removeIndex = lesson.comments.map((comments) => comment.user.toString()).indexOf(req.user.id);

    lesson.comments.splice(removeIndex, 1);

    await lesson.save();

    res.json(lesson.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
