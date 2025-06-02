import React from 'react'
import Box from '@mui/material/Box';
import "../styles/Message.css";
function Message({ text, sent, sender }) {
    return (
        <div className={`message ${sent ? 'sent' : 'received'}`}>
            {!sent && <div className="sender">{sender}</div>}
            <div className="message-text">{text}</div>
        </div>
    );
}


export default Message;   