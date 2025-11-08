
import React, { useState, useEffect } from 'react';
import { getRewardMessage } from '../services/geminiService';
import MedalIcon from './icons/MedalIcon';

interface RewardScreenProps {
    onRestart: () => void;
}

const RewardScreen: React.FC<RewardScreenProps> = ({ onRestart }) => {
    const [rewardMessage, setRewardMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMessage = async () => {
            setIsLoading(true);
            const message = await getRewardMessage();
            setRewardMessage(message);
            setIsLoading(false);
        };
        fetchMessage();
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center z-50 p-4 text-center text-white animate-fade-in">
            <MedalIcon className="w-48 h-48 mb-8 drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]" />
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
                Parabéns!
            </h1>
            <div className="max-w-2xl">
                {isLoading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto"></div>
                ) : (
                    <p className="text-lg md:text-xl text-slate-200 mb-8">
                        {rewardMessage}
                    </p>
                )}
            </div>
            <button 
                onClick={onRestart}
                className="font-orbitron bg-cyan-600 text-white px-8 py-3 rounded-lg hover:bg-cyan-500 transition-all duration-300 transform hover:scale-105"
            >
                Jogar Novamente
            </button>
        </div>
    );
};

export default RewardScreen;
