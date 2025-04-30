import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
