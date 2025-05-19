import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
function Home() {
  return (
    <>
    <div className = "text-center container border border-dark mt-3 mb-3 p-3" >
        <h1>Home</h1>
        <Link to ="/login" ><Button variant="contained">Login</Button></Link>
    </div>
    </>
  )
}

export default Home