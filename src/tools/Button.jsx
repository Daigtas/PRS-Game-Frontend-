import React from 'react';


function Button({ type = 'secondary', onClick, children, className = '', ...props }) {
  return (
    <button 
      className={`btn ${type === 'primary' ? 'primary-btn' : 'secondary-btn'} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
