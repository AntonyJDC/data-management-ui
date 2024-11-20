import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Wrapper({ children, style }: Props) {
  return (
    <div style={style} className='animate-in fade-in duration-500 w-full'>
      {children}
    </div>
  );
}
