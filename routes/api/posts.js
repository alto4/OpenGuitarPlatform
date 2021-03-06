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

// @route PUT api/posts/like/:id private - like a post
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ message: 'This post has already been liked.' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/posts/unlike/:id private - unlike a post
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ message: 'This post has not yet been liked.' });
    }

    // Get removal index
    const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/posts/comment/:id private - comment on an existing post
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required to create a new post.').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error.');
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id private - delete a comment
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Grab comment from specified post
    const comment = post.comments.find((comment) => comment.id === req.params.comment_id);

    // Check comment exists
    if (!comment) {
      return res.status(404).json({ message: 'Comment does not exist.' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to remove this comment.' });
    }

    // Get removal index
    const removeIndex = post.comments.map((comments) => comment.user.toString()).indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
