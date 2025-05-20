import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

export default function ToggleButton() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine target route and button label
  const isChat = currentPath.startsWith('/chat');
  const target = isChat ? '/task/' : '/chat/';
  const label = isChat ? 'Go to Tasks' : 'Go to Chat';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.3rem', marginBottom: '1rem' }}>
  <Link to={target} style={{ textDecoration: 'none' }}>
    <Button variant="contained">{label}</Button>
  </Link>
</div>

  );
}
