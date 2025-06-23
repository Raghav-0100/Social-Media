// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

function decodeJwt(token) {
  try {
    // Split the token into header.payload.signature
    const payload = token.split('.')[1];
    // Convert from base64url to base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // Decode and parse JSON
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch (e) {
    console.error('Failed to decode JWT', e);
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // On mount, load user from stored token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = decodeJwt(token);
      setUser(decoded);
    }
  }, []);

  const login = token => {
    localStorage.setItem('token', token);
    const decoded = decodeJwt(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
