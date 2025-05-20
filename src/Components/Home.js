import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
function Home() {
  return (
    <>
    <div className = "text-center container border border-dark mt-3 mb-3 p-3" >
        <h1>Home</h1>
        <li><Link to ="/login" ><Button variant="contained">Login</Button></Link></li>
        <li><Link to ="/chat" ><Button variant="contained">Chat</Button></Link></li>
    </div>
    </>
  )
}

export default Home