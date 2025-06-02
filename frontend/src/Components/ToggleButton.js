import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { Chat, Assignment } from '@mui/icons-material';
import '../styles/ToggleButton.css'; 
export default function ToggleButton() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine target route and button label
  const isChat = currentPath.startsWith('/chat');
  const target = isChat ? '/task/' : '/chat/';
  const label = isChat ? 'Go to Tasks' : 'Go to Chat';
  const icon = isChat ? <Assignment /> : <Chat />;

  return (
    <div className="toggle-button-container">
      <Link to={target} className="toggle-button-link">
        <Button 
          variant="contained"
          startIcon={icon}
        >
          {label}
        </Button>
      </Link>
    </div>
  );
}

