import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/login.css';
import { useNavigate } from "react-router-dom"
import withoutAuthentication from '../utils/withoutAuthentication';

 function Register() {
    const navigate = useNavigate();

    const BASE_URL = "http://127.0.0.1:8000";
    const [formData, setFormData] = useState({
        "email": "",
        "name": "",
        "password": "",
        "re_password": ""
    })

    const [msgShow, setMsgShow] = useState(false);


    const handleFormSubmit = () => {
        fetch(`${BASE_URL}/auth/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    setMsgShow(true);
                }
                return response.json()
            })
            .then(data => {

                console.log(data);
            })
            .then(() => {
                setTimeout(navigate, 3000, '/login/');
                // navigate('/login/');
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="login-container">
            <div className="login-header">
                <h3>Register</h3>
            </div>
            <div className="login-field">
                <TextField
                    id="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
            </div>
            <div className="login-field">
                <TextField
                    id="name"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
            </div>
            <div className="login-field">
                <TextField
                    id="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
            </div>
            <div className="login-field">
                <TextField
                    id="re_password"
                    type="password"
                    label="Repeat Password"
                    variant="outlined"
                    fullWidth
                    onChange={e => setFormData({ ...formData, re_password: e.target.value })}
                />
            </div>
            {msgShow && (
                <div className="register-success">
                    Registration successful!
                </div>
            )}
            <div className="login-action">
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleFormSubmit}
                    style={{ fontWeight: 600, fontSize: '1.1rem', padding: '12px 0' }}
                >
                    Register
                </Button>
            </div>
        </div>

    )
}

export default withoutAuthentication(Register);