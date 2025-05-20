import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = ({ isOpen, onClose, onCreateRoom, onJoinRoom }) => {
  const [roomName, setRoomName] = useState('');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (roomName.trim()) {
      onCreateRoom(roomName.trim());
    }
  };

  const handleJoin = () => {
    if (roomName.trim()) {
      onJoinRoom(roomName.trim());
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <input
          type="text"
          className="modal-input"
          placeholder="Enter room name or ID"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <div className="modal-buttons">
          <button onClick={handleCreate}>Create Room</button>
          <button onClick={handleJoin}>Join Room</button>
        </div>

        <button className="modal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Modal;
