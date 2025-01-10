
import React from 'react';

const PTCWLogo = ({ size = 200, className = '' }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500"
      width={size}
      height={size}
      className={className}
    >
      {/* Background circle */}
      <circle cx="250" cy="250" r="250" fill="#1a365d"/>
      
      {/* Three white circles */}
      <circle cx="175" cy="175" r="50" fill="white"/>
      <circle cx="325" cy="175" r="50" fill="white"/>
      <circle cx="250" cy="325" r="50" fill="white"/>
      
      {/* Orange connecting lines */}
      <line x1="225" y1="175" x2="275" y2="175" stroke="#ff6b35" strokeWidth="15"/>
      <line x1="200" y1="220" x2="237" y2="282" stroke="#ff6b35" strokeWidth="15"/>
      <line x1="300" y1="220" x2="263" y2="282" stroke="#ff6b35" strokeWidth="15"/>
      
      {/* Icons inside circles */}
      <path d="M175 190 L175 160 L160 175 L175 160 L190 175" stroke="#1a365d" strokeWidth="8" fill="none"/>
      <rect x="320" y="170" width="10" height="10" fill="#1a365d"/>
      <rect x="245" y="320" width="10" height="10" fill="#1a365d"/>
      
      {/* Text */}
      <text x="250" y="425" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="60" fontWeight="bold">
        PTCW
      </text>
    </svg>
  );
};

export default PTCWLogo;


