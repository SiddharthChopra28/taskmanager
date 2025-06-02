import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import withAuthentication from '../utils/withAuthentication';
import WebSocket from 'isomorphic-ws'; // Ensure you have a WebSocket polyfill if needed
function ChatArea() {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/ws/chat/');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prev => [...prev, {
                text: data.message,
                sender: data.sender,
                sent: data.sender === currentUser,  // You'll define `currentUser`
            }]);
        };


        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        socketRef.current = ws;

        return () => {
            ws.close();
        };
    }, []);

    const handleSendMessage = (text) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ message: text }));
            setMessages(prev => [...prev, { text, sent: true }]);
        }
    };

    return (
        //needs updateing
        <div className='chat-area'>
            <div className='chat-header text-center'>
                <h3>Chat Room</h3>
            </div>
            <div className='messages'>
                {messages.map((msg, idx) => (
                    <Message key={idx} text={msg.text} sent={msg.sent} sender={msg.sender} />
                ))}
            </div>
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
}

export default withAuthentication(ChatArea);
