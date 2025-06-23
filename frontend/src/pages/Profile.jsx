// src/pages/Profile.jsx

import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import { getProfile, updateProfile } from '../api/auth';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', bio: '', avatarUrl: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile().then(res => {
      setForm({
        name: res.data.name,
        bio: res.data.bio || '',
        avatarUrl: res.data.avatarUrl || '',
      });
      setLoading(false);
    });
  }, []);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await updateProfile(form);
    setForm({
      name: res.data.name,
      bio: res.data.bio,
      avatarUrl: res.data.avatarUrl,
    });
    alert('Profile updated!');
  };

  if (loading) return <Container>Loading…</Container>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar src={form.avatarUrl} sx={{ width: 64, height: 64, mr: 2 }} />
        <Typography variant="h5">{form.name}</Typography>
        <Button
          color="secondary"
          onClick={() => {
            logout();
          }}
          sx={{ ml: 'auto' }}
        >
        
        </Button>
      </Box>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Bio"
          name="bio"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={form.bio}
          onChange={handleChange}
        />
        <TextField
          label="Avatar URL"
          name="avatarUrl"
          fullWidth
          margin="normal"
          helperText="Paste a link to your profile image"
          value={form.avatarUrl}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Save Profile
        </Button>
      </form>
    </Container>
  );
}
