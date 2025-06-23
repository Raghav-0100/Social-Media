import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import { Container, Tabs, Tab, Box } from '@mui/material';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = React.useState(0);

  if (user) return <Box sx={{ m: 2 }}>Already logged in.</Box>;
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Tabs value={tab} onChange={(e,v)=>setTab(v)} centered>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <Box>
        {tab===0 ? <LoginForm /> : <SignupForm />}
      </Box>
    </Container>
  );
}