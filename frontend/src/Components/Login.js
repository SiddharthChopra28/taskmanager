import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
export default function Register() {
    const navigate = useNavigate();


    const BASE_URL = "http://127.0.0.1:8000";
    const [formData,setFormData] = useState({
        "email":"",
        "password": ""
    })
    const [msgShow, setMsgShow] = useState(false);
    const handleFormSubmit = () =>{
        fetch(`${BASE_URL}/auth/jwt/create`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            console.log(response)
            if (response.ok){
                var data =  response.json()
            }
            else{
                setMsgShow(true)
            }
            return data
        })
        .then(data =>{
            console.log(data);
            localStorage.setItem('access', data['access'])
            localStorage.setItem('refresh', data['refresh'])
            localStorage.setItem('refresh', formData['email'])

            console.log('login success')
            navigate('/chat/');
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
        <div className ='mt-3 mb-3'>
            <TextField id="password" type ='password' label="Password" variant="outlined" onChange={e => setFormData({...formData, password: e.target.value})}/>
        </div>     
        <div className ='mt-3 mb-3'>
            <Button variant="contained" onClick={handleFormSubmit}>Login</Button>    
        </div> 
        {msgShow && (
            <div className='text-failure mt-2'>
                Login Failed! Check your credentials and try again
            </div>
        )}
        
        <p>
            New Here? <Link to="/Register">Register</Link>
        </p>
    </div>
    </>
  )
}