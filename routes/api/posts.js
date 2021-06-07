const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/posts private - create new post
router.post(
  '/',
  [auth, [check('text', 'Text is required to create a new post.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route GET api/posts private - get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

// @route GET api/posts/:id private - get single post
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(500).send('Server error.');
  }
});

// @route DELETE api/posts/:id private - delete single post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Verify that logged in user is the creator of the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this post.' });
    }

    await post.remove();

    res.json({ message: 'Post successfully removed.' });
  } catch (error) {
    console.error(error.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(500).json('Server Error');
  }
});

module.exports = router;
