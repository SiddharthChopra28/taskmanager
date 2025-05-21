import React from 'react'
import Box from '@mui/material/Box';

export default function Message({text,sent}) {
  return (
    <div className={`message ${sent ? 'sent' : 'recieved'}`} >
        <div className ='message-bubble'>{text}</div>
    </div>
  )
}
