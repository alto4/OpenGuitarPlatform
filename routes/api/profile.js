const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profile/me private -> Get logged in user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      res.status(400).json({ message: 'Sorry, no profile exists for this user.' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/profile private -> Create or update user profile
router.post('/', [auth, [check('status', 'Status is required.').not().isEmpty()]], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { instrument, level, location, status, bio, genres, years, youtube, twitter, facebook, linkedin, instagram } =
    req.body;

  // Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;

  if (instrument) {
    profileFields.instrument = instrument;
  }

  if (location) {
    profileFields.location = location;
  }

  if (status) {
    profileFields.status = status;
  }

  if (bio) {
    profileFields.bio = bio;
  }

  if (genres) {
    profileFields.genres = genres;
  }

  if (years) {
    profileFields.years = years;
  }
  // youtube, twitter, facebook, linkedin, instagram

  if (genres) {
    profileFields.genres = genres.split(',').map((genre) => genre.trim());
  }

  // Build social links object
  profileFields.social = {};

  if (youtube) {
    profileFields.social.youtube = youtube;
  }

  if (twitter) {
    profileFields.social.twitter = twitter;
  }

  if (facebook) {
    profileFields.social.facebook = facebook;
  }

  if (linkedin) {
    profileFields.social.linkedin = linkedin;
  }

  if (instagram) {
    profileFields.social.instagram = instagram;
  }

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    // If a profile already exists, update it
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
      return res.json(profile);
    }

    // Create a new profile
    profile = new Profile(profileFields);
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Sever error.');
  }
});

// @route GET api/profile public -> Get all profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route GET api/profile/user/:user_id public -> Get single user profile
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ message: 'No profile exists for this user.' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);

    if (error.kind == 'ObjectId') {
      return res.status(400).json({ message: 'No profile exists for this user.' });
    }

    res.status(500).send('Server error');
  }
});

// @route DELETE api/profile private -> Delete profile, along with user and posts
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile and user records
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ message: 'User and corresponding profile successfully removed.' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Sever error.');
  }
});
module.exports = router;
