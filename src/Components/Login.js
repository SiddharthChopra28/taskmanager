import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Login(){
    const BASE_URL = "http://127.0.0.1:8000";
    const [formData,setFormData] = useState({
        "email":"",
        "password": ""
    })

   const handleFormSubmit = () => {
    fetch(`${BASE_URL}/auth/jwt/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(async response => {
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('email', formData.email);

            // to get userID and store for future use
            fetch(`${BASE_URL}/auth/getID`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email }),
            })
            .then(res => res.json())
            .then(userData => {
                if (userData.id) {
                    localStorage.setItem('userID', userData.id); 
                }
            })
            .catch(err => {
                console.error("Error fetching user ID:", err);
            });
        } else {
            console.error("Login failed:", data);
        }
    })
    .catch(error => {
        console.error("Login error:", error);
    });
};

  return (
    <>
    <div className = "text-center container border border-dark mt-3 mb-3" >
        <div className ='mt-3'>
            <h3>
                Login
            </h3>
        </div>
        <div className ='mt-3'>
            <TextField id="email" type ='email' label="Email" variant="outlined" onChange={e => setFormData({...formData, email: e.target.value})}/>
        </div>
        <div className ='mt-3 mb-3'>
            <TextField id="password" type ='password' label="Password" variant="outlined" onChange={e => setFormData({...formData, password: e.target.value})}/>
        </div>     
        <div className ='mt-3 mb-3'>
            <Button variant="contained" onClick={handleFormSubmit}>Login</Button>    
        </div> 
        <p>
            New Here? <Link to="/Register">Register</Link>
        </p>
    </div>
    </>
  )
}
