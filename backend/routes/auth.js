// backend/routes/auth.js

const express  = require('express');
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const User     = require('../models/User');
const auth     = require('../middleware/authMiddleware');
const router   = express.Router();

// @route   POST /api/auth/signup
// @desc    Register user
router.post('/signup', async (req, res) => {
  const { name, email, password, bio, avatarUrl } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hash, bio, avatarUrl });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// ----------------------------------------------------------------
// New endpoints for “get me” and “update me”:
// ----------------------------------------------------------------

// @route   GET /api/auth/me
// @desc    Return current user's profile (no password)
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/auth/me
// @desc    Update current user's profile
router.put('/me', auth, async (req, res) => {
  const { name, bio, avatarUrl } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.user,
      { name, bio, avatarUrl },
      { new: true, runValidators: true, context: 'query' }
    ).select('-password');
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
