import React from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { Container } from '@mui/material';

export default function Feed() {
  const [refresh, setRefresh] = React.useState(0);

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <PostForm onPost={() => setRefresh(r=>r+1)} />
      <PostList key={refresh} />
    </Container>
  );
}