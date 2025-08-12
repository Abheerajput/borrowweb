// src/components/PasswordInput.tsx

import React, { useState } from 'react';
import {
  LockClosedIcon,
  LockOpenIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/solid';

interface PasswordInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  id,
  value,
  onChange,
  placeholder,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const hasContent = value.length > 0;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <span>
      <label htmlFor={id} className="text-[#111827] font-medium">
        {label}
      </label>
      <div className="relative mt-2">
        {/* --- Lock Icon (Left) --- */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <LockOpenIcon
            className={`h-5 w-5 text-gray-400 transition-opacity duration-300 ${
              hasContent ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden="true"
          />
          <LockClosedIcon
            className={`absolute h-5 w-5 text-gray-500 transition-opacity duration-300 ${
              hasContent ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />
        </div>

        <input
          type={isPasswordVisible ? 'text' : 'password'}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="block w-full rounded-full border border-[#D9D9D9] h-[40px] pl-11 pr-12"
        />

        {/* --- Eye Icon (Right) --- */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="text-gray-500 hover:text-gray-700"
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? (
              <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </span>
  );
};

export default PasswordInput;
