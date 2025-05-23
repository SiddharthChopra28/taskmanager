import React from 'react' 
import Message from './Message'
import MessageInput from './MessageInput'
import withAuthentication from '../utils/withAuthentication'

function ChatArea() { 
    return (
        <div className='chat-area'> 
        <div className= 'chat-header text-center'>
             <h3>Chat Room</h3>
        </div>
            <div className ='messages'>
                <Message text="Hey, how's it going"sent/>
                <Message text="I am good" recieved/>
            </div>
            <MessageInput />
        </div> 
    )
} 

export default ChatArea
//export default withAuthentication(ChatArea)