import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { login as loginApi } from '../api/auth';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await loginApi(form);
    login(res.data.token);
    nav('/feed');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
      <TextField label="Email" fullWidth margin="normal" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <TextField type="password" label="Password" fullWidth margin="normal" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
    </Box>
  );
}