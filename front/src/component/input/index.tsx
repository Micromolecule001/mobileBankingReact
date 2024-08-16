import React from 'react';
import './index.css';

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, name, id, type, value, onChange, error }) => {
  return (
    <div className={`input-wrapper ${error ? 'input-error' : ''}`}>
      <label className={`inputLabel ${error ? 'label-error' : ''}`} htmlFor={id}> {label} </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'input-border-error' : ''}
      />
    </div>
  );
};

export default Input;
