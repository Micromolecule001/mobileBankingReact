import React from 'react';
import './index.css';

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | 'submit';
}

const Button: React.FC<ButtonProps> = ({ primary, children, onClick, type }) => {
  const buttonStyle = primary
    ? { backgroundColor: '#775CE5', color: '#ffffff'}
    : { backgroundColor: '#fefffe', color: '#775CE5', border: '1px solid #775CE5' };

  return (
    <button style={buttonStyle} className='button' onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
