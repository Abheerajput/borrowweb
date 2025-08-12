// src/components/Container.tsx
import React from 'react';
import { ContainerProps } from '../types/container';

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'default',
  ...props
}) => {
  const sizeClasses = {
   default: 'px-8 xs:px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16',
narrow: 'px-4 xs:px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 ',
wide: 'px-2 xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12',

    full: 'px-0',
  } as const;
  
  return (
    <div
      className={`mx-auto w-full ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;