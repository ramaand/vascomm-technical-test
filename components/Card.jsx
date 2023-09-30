import React from 'react'

import { cn } from '@/lib/utils'

const Card = ({ children, className }) => {
  return (
    <div className={cn('rounded-lg p-6 bg-white', className)}>
      {children}
    </div>
  );
};

export default Card;
