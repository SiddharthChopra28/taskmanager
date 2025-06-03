import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material'
import withAuthentication from '../utils/withAuthentication';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Task.css'; // Assuming you have a CSS file for styling
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


        const formData = new FormData();

        const fileInput = document.getElementById('fileInput');
        formData.append('file', fileInput.files[0]);
        formData.append('text', response);
        formData.append('roomid', roomid);

        axios.post(`${BASE_URL}rooms/submit/`, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('access')}`
            }
        }).then(res => {
            if (res.status === 201) {
                setSuccess('Response submitted!');
                setError('');
                myresponse = response;
                // setResponse('');
            } else {
                setError(res.error || 'Error submitting response.');
                setSuccess('');
            }

        }).catch(err => {
            console.log(err)
            setError('Network error');
            setSuccess('');
        })


    }

    const [file, setFile] = useState(null);

    let handleUpload = (e) => {
        setFile(e.target.files[0])
    }

    return (
        <div className='chat-area'>
            <div className='chat-header justify-content-center text-center'>
                <h3>Task Room</h3>
            </div>

            <div className='messages'>
                {/* Assignment Section */}
                <div className="assignment-section">
                    {assignmentText ? (
                        <div className="assignment-box">
                            <h4>Assignment</h4>
                            <p>{assignmentText}</p>
                        </div>
                    ) : (
                        <div className="no-assignment-box">
                            <p>No assignment has been posted yet.</p>
                        </div>
                    )}

                    {/* Owner: Create Assignment Form */}
                    {(isOwner && assignmentText === "") && (
                        <div className="assignment-form">
                            <h4>Create Assignment</h4>
                            <TextField
                                label="Assignment Description"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={assignmentName}
                                onChange={(e) => setAssignmentName(e.target.value)}
                                className="assignment-input"
                            />
                            <Button
                                variant="contained"
                                color="black"
                                className="create-assignment-btn"
                                onClick={handleCreateAssignment}
                                disabled={!assignmentName.trim()}
                            >
                                Create Assignment
                            </Button>
                        </div>
                    )}
                </div>

                {/* Submissions Section - Owner View */}
                {(isOwner && assignmentText !== "") && (
                    <div className="submissions-section">
                        <div className="submissions-box">
                            <h4>Student Submissions</h4>
                            {responses_for_owner ? (
                                <div className="submissions-content">
                                    <p>{responses_for_owner}</p>
                                </div>
                            ) : (
                                <div className="no-submissions">
                                    <p>No submissions yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Student View - My Submission */}
                {(!isOwner && myresponse !== "") && (
                    <div className="my-submission-section">
                        <div className="submission-box">
                            <h4>My Submission</h4>
                            <div className="submission-content">
                                <p>{myresponse}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Student View - Submit Response Form */}
                {(!isOwner && myresponse === "" && assignmentText !== "") && (
                    <div className="response-section">
                        <div className="response-form">
                            <h4>Submit Your Response</h4>
                            <TextField
                                label="Your Response"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                className="response-input"
                                placeholder="Enter your assignment response here..."
                            />
                            <div>
                                <input type="file" onChange={handleUpload} id="fileInput" accept=".pdf"/>
                            </div>

                            <Button
                                variant="contained"
                                color="success"
                                className="submit-response-btn"
                                onClick={handleSubmitResponse}
                                disabled={!response.trim()}
                            >
                                Submit Response
                            </Button>
                        </div>
                    </div>
                )}

                {/* Error/Success Messages */}
                {(error || success) && (
                    <div className="message-alert">
                        <div className={`alert ${error ? 'error' : 'success'}`}>
                            {error || success}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default withAuthentication(Task);
// export default Task;