// src/components/SignupForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { signup as signupApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signupApi(form);
      alert('Signup successful! Please log in.');
      // Redirect to login page/tab
      navigate('/');    // assuming your login is at "/"
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        fullWidth
        margin="normal"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}
