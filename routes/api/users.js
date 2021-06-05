const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route POST api/users public
router.post(
  '/',
  [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Please include a valid email address.').isEmail(),
    check('password', 'Please enter a password that is at least 8 characters in length.').isLength({ min: 8 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
  }
);

module.exports = router;
