import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Link to="/login/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Link>
          <Link to="/chat/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth>
              Chat
            </Button>
          </Link>
          <Link to="/task/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" fullWidth>
              Task
            </Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;
