// src/components/Modal.js
import React from 'react';
import '../styles/Modal.css'; // You can style this however you like

const Modal = ({ isOpen, onClose, onCreateRoom, onJoinRoom }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Select an Option</h2>
        <div className="modal-buttons">
          <button onClick={onCreateRoom}>Create Room</button>
          <button onClick={onJoinRoom}>Join Room</button>
        </div>
        <button className="modal-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Modal;
