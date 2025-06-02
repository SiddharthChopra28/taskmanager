import React, { useEffect, useState, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import withAuthentication from '../utils/withAuthentication';
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
                timestamp: data.timestamp || new Date().toISOString(),
                sent: false
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
        const timestamp = new Date().toISOString();

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ message: text, timestamp }));
            setMessages(prev => [...prev, {
                text,
                sent: true,
                sender: "You",
                timestamp
            }]);
        }
    };

    return (
        <div className='chat-area'>
            <div className='chat-header text-center'>
                <h3>Chat Room</h3>
            </div>
            <Message
                text="Welcome to the chat! Type your message below."
                sent={false}
                sender="System"
                timestamp={new Date().toISOString()}
            />
            <Message
                text="Welcome to the chat! Type your message below."
                sent={true}
                sender="System"
                timestamp={new Date().toISOString()}
            />
            <div className='messages'>
                {messages.map((msg, idx) => (
                    <Message
                        key={idx}
                        text={msg.text}
                        sent={msg.sent}
                        sender={msg.sender}
                        timestamp={msg.timestamp}
                    />
                ))}
            </div>
            <MessageInput onSend={handleSendMessage} />
        </div>
    );
}

export default withAuthentication(ChatArea);
