import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import '../styles/login.css';
import withoutAuthentication from '../utils/withoutAuthentication';


function Login() {
    const navigate = useNavigate();


    const BASE_URL = "http://127.0.0.1:8000";
    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    })
    const [msgShow, setMsgShow] = useState(false);
    const handleFormSubmit = () => {
        fetch(`${BASE_URL}/auth/jwt/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                console.log(response)
                if (response.ok) {
                    var data = response.json()
                }
                else {
                    setMsgShow(true)
                }
                return data
            })
            .then(data => {
                console.log(data);
                localStorage.setItem('access', data['access'])
                localStorage.setItem('refresh', data['refresh'])
                localStorage.setItem('email', formData.email);
                console.log('login success')
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <>
            <div className="login-container">
                <div className="login-header">
                    <h3>Login</h3>
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
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div className="login-action">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleFormSubmit}
                        style={{ fontWeight: 600, fontSize: '1.1rem', padding: '12px 0' }}
                    >
                        Login
                    </Button>
                </div>
                {msgShow && (
                    <div className="login-error">
                        Login Failed! Check your credentials and try again
                    </div>
                )}
                <div className="login-footer">
                    <span>New here? </span>
                    <Link to="/Register">Register</Link>
                </div>
            </div>
        </>
    )
}

export default withoutAuthentication(Login)