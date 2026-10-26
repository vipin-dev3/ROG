import React from 'react';

export default function RogSlashes({ count = 3, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-[3px] mr-2 select-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-[4px] h-[14px] bg-rog-red transform -skew-x-[24deg] inline-block shadow-[0_0_8px_rgba(255,0,51,0.8)]"
        />
      ))}
    </span>
  );
}

