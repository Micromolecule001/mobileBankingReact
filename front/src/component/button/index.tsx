import React from 'react';
import './index.css';

interface ButtonProps {
  primary?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  type: "button" | 'submit';
  id: string;
}

const Button: React.FC<ButtonProps> = ({ primary, children, onClick, type, id }) => {
  const buttonStyle = primary
    ? { backgroundColor: '#775CE5', color: '#ffffff'}
    : { backgroundColor: '#fefffe', color: '#775CE5', border: '1px solid #775CE5' };

  return (
    <button id={id} style={buttonStyle} className='button' onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
