// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          component={Link}
          to="/"
          color="inherit"
        >
          Social Media
        </Typography>

        {user ? (
          <>
            <Button color="inherit" onClick={() => nav('/feed')}>
              Feed
            </Button>
            <Button color="inherit" onClick={() => nav('/profile')}>
              Profile
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                logout();
                nav('/');
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => nav('/')}>
            Login / Signup
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
