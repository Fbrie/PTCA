import React from 'react';
import './Button.css'; // Optional CSS for styling

const Button = ({ label, onClick, type = "button" }) => (
  <button type={type} onClick={onClick} className="custom-button">
    {label}
  </button>
);

export default Button;