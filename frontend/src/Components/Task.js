import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import withAuthentication from '../utils/withAuthentication';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/";
var isOwner = 0
var responses_for_owner = "";
var myresponse = "";

var email;

// const Task = ({ isOwner = false, roomid }) => {
const Task = () => {
    const [assignmentText, setAssignmentText] = useState('');
    const [assignmentName, setAssignmentName] = useState('');
    const [response, setResponse] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Determine target route and button label

    var { roomid, owner } = useParams();
    console.log('hello')

    isOwner = Boolean(Number(owner));
    console.log(isOwner)


    //   useEffect(() => {


    //     }, [roomid, ownerbool]); 

    axios.get(`${BASE_URL}rooms/byUser/`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access')}`
        }
    })
        .then(response => {
            const rooms = response.data;
            localStorage.setItem('rooms', JSON.stringify(rooms));
            for (const room of rooms) {
                if (room.roomid == roomid) {
                    setAssignmentText(room.assignment_name)
                    if (isOwner) {
                        console.log(room.submissions)
                        let json = room.submissions

                        for (let i = 0; i < Object.keys(json).length; i++) {
                            responses_for_owner += `${Object.keys(json)[i]}: ${json[Object.keys(json)[i]]} `
                        }
                    }
                    else {
                        console.log(room.submissions)
                        email = localStorage.getItem('email')
                        console.log(room.submissions[email])
                        if (room.submissions[email]) {
                            myresponse = room.submissions[email]
                        }
                        console.log(myresponse)


                    }
                }
            }
        })
        .catch(error => {
            console.error("Error fetching rooms:", error);
        });


    const handleCreateAssignment = async () => {
        try {
            const res = await fetch(`${BASE_URL}rooms/createAss/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                body: JSON.stringify({
                    'roomid': roomid,
                    'assignment_name': assignmentName,
                }),
            });

            const data = await res.json();

            if (res.status === 201) {
                setAssignmentText(assignmentName);
                setSuccess('Assignment created successfully!');
                setError('');
                // setAssignmentName('');
            } else {
                setError(data.error || 'Error creating assignment.');
                setSuccess('');
            }
        } catch (err) {
            console.log(err)
            setError('Network error');
            setSuccess('');
        }
    };

    const handleSubmitResponse = async () => {
        try {


            const formData = new FormData();

            const fileInput = document.getElementById('fileInput');
            formData.append('file', fileInput.files[0]);  
            formData.append('text', response);        
            formData.append('roomid', roomid);   

            axios.post(`${BASE_URL}rooms/submit/`, formData);

            const data = await res.json();

            if (res.status === 201) {
                setSuccess('Response submitted!');
                setError('');
                myresponse = response;
                // setResponse('');
            } else {
                setError(data.error || 'Error submitting response.');
                setSuccess('');
            }
        } catch (err) {
            console.log(err)
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

                {(isOwner && assignmentText === "") && (
                    <div className="assignment-form mt-3">
                        <TextField
                            label="Assignment Name"
                            fullWidth
                            variant="outlined"
                            value={assignmentName}
                            onChange={(e) => setAssignmentName(e.target.value)}
                        // pehle db se get karna padega
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


            {(isOwner && assignmentText != "") && (
                <div className="assignment-box">
                    <h4>Submissions:</h4>
                    <p>{responses_for_owner}</p>
                </div>
            )}


            {(!isOwner && myresponse != "") && (
                <div className='p-3'>
                    <div className="assignment-box">
                        <h4>My Submission:</h4>
                        <p>{myresponse}</p>
                    </div>

                </div>
            )}

            {(!isOwner && myresponse == "") && (
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

export default withAuthentication(Task);
// export default Task;