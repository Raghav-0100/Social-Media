const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:     { type: String, trim: true },
  imageUrl: { type: String, default: '' },
  likes:    { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);