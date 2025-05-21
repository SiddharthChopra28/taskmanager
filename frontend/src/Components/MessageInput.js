import React, { useState } from 'react'

export default function MessageInput() {
    const {inputValue,setInputValue}= useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }
    const handleSendMessage = () => {
        console.log("Meaasage Send")
    }
  return (
    <div className='message-input'>
        <textarea 
        placeholder='Type message'
        value={inputValue}
        onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>Send</button>
    </div>

  )
}
