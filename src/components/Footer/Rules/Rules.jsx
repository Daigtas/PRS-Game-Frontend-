import React, { useState } from 'react';
import Button from '../../../tools/Button';
import RulesWindow from './RulesWindow';

function Rules() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Rules</Button>
      <RulesWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default Rules;
