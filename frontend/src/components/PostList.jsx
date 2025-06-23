import React, { useEffect, useState } from 'react';
import { fetchPosts, likePost } from '../api/posts';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => { load() }, []);
  const load = async () => { const res = await fetchPosts(); setPosts(res.data); };

  const handleLike = async id => {
    const res = await likePost(id);
    setPosts(posts.map(p => p._id === id ? { ...p, likes: res.data.likes } : p));
  };

  return posts.map(post => (
    <Card key={post._id} sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle2">{post.author.name}</Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>{post.text}</Typography>
        <IconButton onClick={() => handleLike(post._id)}>
          <FavoriteIcon /> {post.likes}
        </IconButton>
      </CardContent>
    </Card>
  ));
}