import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Register() {
    const BASE_URL = "http://127.0.0.1:8000";
    const [formData,setFormData] = useState({
        "email":"",
        "name":"",
        "password": "",
        "re_password": ""
    })

    const [msgShow, setMsgShow] = useState(false);


    const handleFormSubmit = () =>{
        fetch(`${BASE_URL}/auth/users/`,{
            method: 'POST',
            headers:{
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
                Register
            </h3>
        </div>
        <div className ='mt-3'>
            <TextField id="email" type ='email' label="Email" variant="outlined" onChange={e => setFormData({...formData, email: e.target.value})}/>
        </div>
         <div className ='mt-3'>
            <TextField id="name" type ='text' label="First Name" variant="outlined" onChange={e => setFormData({...formData, name: e.target.value})}/>
         </div>
        <div className ='mt-3'>
            <TextField id="password" type ='password' label="Password" variant="outlined" onChange={e => setFormData({...formData, password: e.target.value})}/>
        </div>
        <div className ='mt-3 mb-3'>
            <TextField id="re_password" type ='password' label="Repeat Password" variant="outlined" onChange={e => setFormData({...formData, re_password: e.target.value})}/>
        </div>
        {msgShow && (
            <div className='text-success mt-2'>
                Registration successful! An activation code has been sent to your email!
            </div>
        )}

        <div className ='mt-3 mb-3'>
            <Button variant="contained" onClick={handleFormSubmit}>Register</Button>    
        </div> 
        
    </div>
    </>
  )
}
