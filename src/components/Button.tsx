import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  className = '', 
  icon, 
  children 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center px-4 py-2 rounded-md
        font-medium transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${disabled 
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg focus:ring-purple-500'
        } 
        ${className}
      `}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;