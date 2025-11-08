
import React, { useState, useEffect } from 'react';
import { getTopicContent } from '../services/geminiService';
import { TopicContent } from '../types';
import Quiz from './Quiz';

interface InfoModalProps {
  topicTitle: string;
  onClose: () => void;
  onQuizComplete: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ topicTitle, onClose, onQuizComplete }) => {
  const [content, setContent] = useState<TopicContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'info' | 'quiz'>('info');

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      const fetchedContent = await getTopicContent(topicTitle);
      setContent(fetchedContent);
      setIsLoading(false);
    };
    fetchContent();
  }, [topicTitle]);

  const handleStartQuiz = () => {
    if (content && content.quizQuestions.length > 0) {
      setView('quiz');
    } else {
        // If there are no questions (e.g. conclusion topic or API error), just complete it
        onQuizComplete();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border-2 border-cyan-500 rounded-2xl shadow-2xl shadow-cyan-500/30 w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="font-orbitron text-xl md:text-2xl text-cyan-300">{topicTitle}</h2>
          <button onClick={onClose} className="text-white text-2xl hover:text-cyan-300">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-white">
                 <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mb-4"></div>
                 <p>Gerando conteúdo com IA...</p>
            </div>
          ) : content && (
            <>
              {view === 'info' && (
                <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap">
                  <p>{content.educationalText}</p>
                </div>
              )}
              {view === 'quiz' && (
                <Quiz questions={content.quizQuestions} onComplete={onQuizComplete} />
              )}
            </>
          )}
        </div>

        {!isLoading && view === 'info' && (
          <div className="p-4 border-t border-slate-700 text-right">
            <button
              onClick={handleStartQuiz}
              className="font-orbitron bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300"
            >
              {content?.quizQuestions.length ?? 0 > 0 ? "Iniciar Quiz" : "Concluir"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoModal;
