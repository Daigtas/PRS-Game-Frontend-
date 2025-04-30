import React from 'react';

function Results({ result }) {
  let className = 'result-message';
  let message = result || 'VS';
  
  if (result === 'zaidejas') {
    className += ' win';
    message = 'You win!';
  } else if (result === 'pc') {
    className += ' lose';
    message = 'Computer wins!';
  } else if (result === 'tie') {
    className += ' tie';
    message = "It's a tie!";
  }
  
  return (
    <div className={className}>
      {message}
    </div>
  );
}

export default Results;
