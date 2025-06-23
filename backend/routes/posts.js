const express = require('express');
const Post    = require('../models/Post');
const auth    = require('../middleware/authMiddleware');
const router  = express.Router();

// @route   POST /api/posts
// @desc    Create a post
router.post('/', auth, async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    const post = new Post({ author: req.user, text, imageUrl });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.messae);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/posts
// @desc    Get all posts (feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name avatarUrl')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/posts/:id/like
// @desc    Add a like (clap)
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    post.likes++;
    await post.save();
    res.json({ likes: post.likes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

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
    res.status(500).send('Server error');
  }
});



module.exports = router;
