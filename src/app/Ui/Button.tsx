// src/components/Button.tsx
import React from 'react';
import { ButtonProps } from '../types/button';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses = 'font-inter rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#FF5F00] text-white hover:bg-[#e05500] focus:ring-[#FF5F00]',
    secondary: 'bg-white text-[#FF5F00] border border-[#FF5F00] hover:bg-gray-50 focus:ring-[#FF5F00]',
    ghost: 'text-[#FF5F00] hover:bg-orange-50 focus:ring-[#FF5F00]',
    transparent: 'bg-transparent px-6 text-white border border-white hover:bg-white hover:text-[#FF5F00] transition-colors duration-200'
  } as const;
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  } as const;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;