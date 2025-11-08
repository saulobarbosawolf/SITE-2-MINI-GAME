
import React from 'react';

interface MedalIconProps {
  className?: string;
}

const MedalIcon: React.FC<MedalIconProps> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <defs>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#FFD700', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#FFA500', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="ribbon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" fill="url(#gold-gradient)" />
        <path d="M12 11l-2 3h4l-2 3v-6" stroke="white" strokeWidth="1.5"/>
        <path d="M6 22l6-10 6 10" fill="url(#ribbon-gradient)" stroke="url(#ribbon-gradient)" />
        <path d="M6 22l-4-4" stroke="url(#ribbon-gradient)" />
        <path d="M18 22l4-4" stroke="url(#ribbon-gradient)" />
    </svg>
);

export default MedalIcon;
