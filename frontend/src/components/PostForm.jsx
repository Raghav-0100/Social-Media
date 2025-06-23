import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createPost } from '../api/posts';

export default function PostForm({ onPost }) {
  const [text, setText] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await createPost({ text });
    onPost(res.data);
    setText('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="What's on your mind?"
        fullWidth
        multiline
        rows={3}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <Button type="submit" variant="contained" sx={{ mt: 1 }}>Post</Button>
    </Box>
  );
}