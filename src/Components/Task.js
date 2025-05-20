import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
//import '../styles/Task.css';

const Task = ({ isOwner = false, assignment, onSubmitAssignment, onSubmitResponse }) => {
  const [newAssignment, setNewAssignment] = useState('');
  const [response, setResponse] = useState('');

  const handleAssignmentSubmit = () => {
    if (newAssignment.trim()) {
      onSubmitAssignment(newAssignment);
      setNewAssignment('');
    }
  };

  const handleResponseSubmit = () => {
    if (response.trim()) {
      onSubmitResponse(response);
      setResponse('');
    }
  };

  return (
    <div className='chat-area'>
      <div className='chat-header text-center'>
        <h3>Task Room</h3>
      </div>

      <div className='messages p-3'>
        {assignment ? (
          <div className="assignment-box">
            <h4>Assignment:</h4>
            <p>{assignment}</p>
          </div>
        ) : (
          <p>No assignment has been posted yet.</p>
        )}
        {isOwner && (
          <div className="assignment-form mt-3">
            <TextField
              label="New Assignment"
              fullWidth
              variant="outlined"
              value={newAssignment}
              onChange={(e) => setNewAssignment(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className='mt-2'
              onClick={handleAssignmentSubmit}
            >
              Send Assignment
            </Button>
          </div>
        )}
      </div>

      <div className='p-3'>
        <TextField
          label="Your Response"
          fullWidth
          variant="outlined"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          className='mt-2'
          onClick={handleResponseSubmit}
        >
          Submit Response
        </Button>
      </div>
    </div>
  );
};

export default Task;
