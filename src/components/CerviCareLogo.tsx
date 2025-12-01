import React from 'react';

interface CerviCareLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  variant?: 'full' | 'icon' | 'horizontal';
}

export const CerviCareLogo: React.FC<CerviCareLogoProps> = ({ 
  size = 120, 
  className = "", 
  showText = true,
  variant = 'full'
}) => {
  const iconSize = variant === 'horizontal' ? size * 0.6 : size;
  const textSize = variant === 'horizontal' ? size * 0.4 : size * 0.25;

  const LogoIcon = () => (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      {/* Background Circle with Gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="50%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F0FDFA" stopOpacity="0.8" />
        </linearGradient>
        
        <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        
        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>

        {/* Drop Shadow Filter */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#00000020"/>
        </filter>
        
        {/* Inner Shadow Filter */}
        <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="2" result="offset-blur"/>
          <feFlood floodColor="#00000015"/>
          <feComposite in2="offset-blur" operator="in"/>
        </filter>
      </defs>

      {/* Main Background Circle */}
      <circle 
        cx="60" 
        cy="60" 
        r="55" 
        fill="url(#bgGradient)" 
        filter="url(#dropShadow)"
        className="animate-pulse-teal"
      />
      
      {/* Shield Shape - Protection Symbol */}
      <path 
        d="M60 15 L45 25 L45 45 C45 65 52.5 75 60 85 C67.5 75 75 65 75 45 L75 25 Z" 
        fill="url(#shieldGradient)" 
        stroke="#14B8A6" 
        strokeWidth="1.5"
        filter="url(#innerShadow)"
        opacity="0.95"
      />
      
      {/* Cervical Cancer Awareness Ribbon */}
      <g transform="translate(35, 30)">
        {/* Ribbon Curves */}
        <path 
          d="M15 5 Q5 15 15 25 Q25 35 15 45 Q5 35 15 25 Q25 15 15 5 Z" 
          fill="url(#ribbonGradient)" 
          filter="url(#dropShadow)"
          className="animate-ribbon-wave"
        />
        
        {/* Ribbon Highlight */}
        <path 
          d="M15 8 Q10 15 15 22 Q20 29 15 36" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          opacity="0.6"
        />
        
        {/* Small decorative dots */}
        <circle cx="15" cy="15" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        <circle cx="15" cy="35" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      </g>
      
      {/* Chat Bubble - Communication Symbol */}
      <g transform="translate(70, 65)">
        <ellipse 
          cx="15" 
          cy="12" 
          rx="18" 
          ry="12" 
          fill="url(#chatGradient)" 
          filter="url(#dropShadow)"
        />
        
        {/* Chat bubble tail */}
        <path 
          d="M8 20 L12 24 L16 20 Z" 
          fill="url(#chatGradient)"
        />
        
        {/* Chat dots */}
        <circle cx="10" cy="12" r="2" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="15" cy="12" r="2" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="20" cy="12" r="2" fill="#FFFFFF" opacity="0.9"/>
      </g>
      
      {/* Decorative Plus Signs - Medical Symbols */}
      <g opacity="0.4">
        <path d="M25 25 L25 35 M20 30 L30 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M90 30 L90 40 M85 35 L95 35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
        <path d="M85 85 L85 95 M80 90 L90 90" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
      </g>
      
      {/* Subtle glow effect */}
      <circle 
        cx="60" 
        cy="60" 
        r="58" 
        fill="none" 
        stroke="url(#bgGradient)" 
        strokeWidth="1" 
        opacity="0.3"
        className="animate-glow-pulse"
      />
    </svg>
  );

  const LogoText = () => (
    <div 
      className="flex flex-col items-center justify-center"
      style={{ fontSize: `${textSize}px` }}
    >
      <div className="font-bold tracking-tight leading-none">
        <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
          Cervi
        </span>
        <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
          Care
        </span>
      </div>
      <div 
        className="text-gray-600 dark:text-gray-400 font-medium mt-1"
        style={{ fontSize: `${textSize * 0.3}px` }}
      >
        Cervical Health Companion
      </div>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <LogoIcon />
        {showText && <LogoText />}
      </div>
    );
  }

  // Full version (default)
  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      <LogoIcon />
      {showText && <LogoText />}
    </div>
  );
};

export default CerviCareLogo;