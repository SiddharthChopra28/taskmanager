import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Register() {
    const BASE_URL = "http://127.0.0.1:8000/";
    const [formData,setFormData] = useState({
        "email":"",
        "first_name":"",
        "last_name": "",
        "password": ""
    })
    const handleFormSubmit = () =>{
        fetch(`${BASE_URL}login/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data =>{
            console.log(data);
        })
        .catch(error =>{
            console.log(error);
        })
    }
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
         <div className ='mt-3'>
            <TextField id="first_name" type ='text' label="First Name" variant="outlined" onChange={e => setFormData({...formData, first_name: e.target.value})}/>
         </div>
        <div className ='mt-3'>
            <TextField id="last_name" type ='text' label="Last Name" variant="outlined" onChange={e => setFormData({...formData, last_name: e.target.value})}/>
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
