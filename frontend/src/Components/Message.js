import React from 'react'
import { Avatar } from '@mui/material';
import "../styles/Message.css";

function Message({ text, sent, sender, timestamp }) {
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={`message-container ${sent ? 'sent' : 'received'}`}>
            {!sent && (
                <div className="message-avatar">
                    <Avatar className="sender-avatar">
                        {getInitials(sender)}
                    </Avatar>
                </div>
            )}
            
            <div className="message-content">
                {!sent && <div className="sender-name">{sender || 'Unknown'}</div>}
                
                <div className="message-bubble">
                    <div className="message-text">{text}</div>
                    {timestamp && (
                        <div className="message-timestamp">
                            {formatTime(timestamp)}
                        </div>
                    )}
                </div>
            </div>
            
            {sent && (
                <div className="message-avatar">
                    <Avatar className="sender-avatar sent-avatar">
                        You
                    </Avatar>
                </div>
            )}
        </div>
    );
}

export default Message;
