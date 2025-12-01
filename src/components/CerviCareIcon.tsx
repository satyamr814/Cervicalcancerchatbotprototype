import React from 'react';

interface CerviCareIconProps {
  size?: number;
  className?: string;
}

export const CerviCareIcon: React.FC<CerviCareIconProps> = ({ 
  size = 32, 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="iconBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        <linearGradient id="iconShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F0FDFA" stopOpacity="0.85" />
        </linearGradient>
        
        <linearGradient id="iconRibbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        
        <linearGradient id="iconChatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
      </defs>

      {/* Background Circle */}
      <circle 
        cx="16" 
        cy="16" 
        r="15" 
        fill="url(#iconBgGradient)" 
      />
      
      {/* Shield Shape */}
      <path 
        d="M16 4 L12 6.5 L12 13 C12 17.5 14 19.5 16 22 C18 19.5 20 17.5 20 13 L20 6.5 Z" 
        fill="url(#iconShieldGradient)" 
        stroke="#14B8A6" 
        strokeWidth="0.5"
        opacity="0.9"
      />
      
      {/* Simplified Ribbon */}
      <path 
        d="M13 8 Q10 11 13 14 Q16 17 13 20 Q10 17 13 14 Q16 11 13 8 Z" 
        fill="url(#iconRibbonGradient)" 
      />
      
      {/* Chat Bubble */}
      <ellipse 
        cx="20" 
        cy="20" 
        rx="5" 
        ry="3.5" 
        fill="url(#iconChatGradient)" 
      />
      <path 
        d="M17 22 L19 24 L21 22 Z" 
        fill="url(#iconChatGradient)"
      />
      
      {/* Chat dots */}
      <circle cx="18.5" cy="20" r="0.7" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="20" cy="20" r="0.7" fill="#FFFFFF" opacity="0.9"/>
      <circle cx="21.5" cy="20" r="0.7" fill="#FFFFFF" opacity="0.9"/>
      
      {/* Medical Plus */}
      <path d="M7 8 L7 10 M6 9 L8 9" stroke="#FFFFFF" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
      <path d="M24 10 L24 12 M23 11 L25 11" stroke="#FFFFFF" strokeWidth="0.7" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
};

export default CerviCareIcon;