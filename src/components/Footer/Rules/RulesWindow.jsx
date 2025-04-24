import React from 'react';
import Modal from '../../../tools/Modal';

function RulesWindow({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Game Rules">
      <ul>
        <li>Scissors beats Paper</li>
        <li>Paper beats Rock</li>
        <li>Rock beats Scissors</li>
        <li>Same choices result in a tie</li>
      </ul>
    </Modal>
  );
}

export default RulesWindow;