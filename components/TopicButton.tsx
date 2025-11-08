
import React from 'react';
import CheckIcon from './icons/CheckIcon';

interface TopicButtonProps {
  topic: string;
  onClick: () => void;
  isCompleted: boolean;
  isLocked: boolean;
}

const TopicButton: React.FC<TopicButtonProps> = ({ topic, onClick, isCompleted, isLocked }) => {
  const baseStyle = "font-orbitron relative w-64 h-20 p-4 rounded-lg shadow-lg flex items-center justify-center text-center text-white font-bold transition-all duration-300 ease-in-out transform";
  const activeStyle = "bg-cyan-600 hover:bg-cyan-500 hover:scale-110 hover:shadow-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 cursor-pointer";
  const lockedStyle = "bg-gray-700 opacity-50 cursor-not-allowed";
  const completedStyle = "bg-green-600 cursor-not-allowed";

  let currentStyle = isLocked ? lockedStyle : activeStyle;
  if (isCompleted) {
    currentStyle = completedStyle;
  }
  
  return (
    <button
      onClick={onClick}
      disabled={isLocked || isCompleted}
      className={`${baseStyle} ${currentStyle}`}
    >
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
            <CheckIcon className="w-4 h-4 text-green-600" />
        </div>
      )}
      <span>{topic}</span>
    </button>
  );
};

export default TopicButton;
