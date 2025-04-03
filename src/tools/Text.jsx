import React from 'react';

function Text({ tag = 'p', children, className = '', ...props }) {
  const Tag = tag;
  
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}

export default Text;