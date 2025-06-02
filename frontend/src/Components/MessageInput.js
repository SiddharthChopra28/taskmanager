import React, { useState } from 'react';
import '../styles/MessageInput.css'; 

function MessageInput({ onSend }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="message-input-container">
            <form onSubmit={handleSubmit} className="message-input">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="message-text-input"
                />
                <button 
                    type="submit" 
                    className="send-button"
                    disabled={!text.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default MessageInput;
