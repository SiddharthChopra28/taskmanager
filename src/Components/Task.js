import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const BASE_URL = "http://127.0.0.1:8000";

const Task = ({ isOwner = false, roomid }) => {
  const [assignmentText, setAssignmentText] = useState('');
  const [assignmentName, setAssignmentName] = useState('');
  const [response, setResponse] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleCreateAssignment = async () => {
    try {
      const res = await fetch(`${BASE_URL}/rooms/createAss/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomid: roomid,
          assignment_name: assignmentName,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setAssignmentText(assignmentName);
        setSuccess('Assignment created successfully!');
        setError('');
        setAssignmentName('');
      } else {
        setError(data.error || 'Error creating assignment.');
        setSuccess('');
      }
    } catch (err) {
      setError('Network error');
      setSuccess('');
    }
  };

  const handleSubmitResponse = async () => {
    try {
      const res = await fetch(`${BASE_URL}/rooms/submit/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: response,
          roomid: roomid,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccess('Response submitted!');
        setError('');
        setResponse('');
      } else {
        setError(data.error || 'Error submitting response.');
        setSuccess('');
      }
    } catch (err) {
      setError('Network error');
      setSuccess('');
    }
  };

  return (
    <div className='chat-area'>
      <div className='chat-header text-center'>
        <h3>Task Room</h3>
      </div>

      <div className='messages p-3'>
        {assignmentText ? (
          <div className="assignment-box">
            <h4>Assignment:</h4>
            <p>{assignmentText}</p>
          </div>
        ) : (
          <p>No assignment has been posted yet.</p>
        )}

        {isOwner && (
          <div className="assignment-form mt-3">
            <TextField
              label="Assignment Name"
              fullWidth
              variant="outlined"
              value={assignmentName}
              onChange={(e) => setAssignmentName(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className='mt-2'
              onClick={handleCreateAssignment}
            >
              Make Assignment
            </Button>
          </div>
        )}
      </div>

      {!isOwner && (
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
            onClick={handleSubmitResponse}
          >
            Submit Response
          </Button>
        </div>
      )}

      {(error || success) && (
        <div className='text-center mt-2'>
          <p style={{ color: error ? 'red' : 'green' }}>{error || success}</p>
        </div>
      )}
    </div>
  );
};

export default Task;
