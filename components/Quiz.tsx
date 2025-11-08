
import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option: string) => {
    if (showFeedback) return;

    setSelectedAnswer(option);
    setShowFeedback(true);
    if (option === currentQuestion.correctAnswer) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setShowFeedback(false);
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        onComplete();
      }
    }, 2000);
  };

  const getButtonClass = (option: string) => {
    if (!showFeedback) {
      return 'bg-slate-700 hover:bg-cyan-700';
    }
    if (option === currentQuestion.correctAnswer) {
      return 'bg-green-600';
    }
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return 'bg-red-600';
    }
    return 'bg-slate-700 opacity-50';
  };

  return (
    <div className="text-white w-full max-w-2xl mx-auto p-4 md:p-6">
      <div className="mb-4">
        <p className="text-lg text-cyan-300 mb-2">
          Pergunta {currentQuestionIndex + 1} de {questions.length}
        </p>
        <h3 className="text-xl md:text-2xl font-bold">{currentQuestion.question}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={showFeedback}
            className={`p-4 rounded-lg text-left transition-all duration-300 ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
       {showFeedback && (
        <div className="mt-6 text-center text-xl font-bold">
          {feedback === 'correct' && <p className="text-green-400">Correto!</p>}
          {feedback === 'incorrect' && <p className="text-red-400">Incorreto!</p>}
        </div>
      )}
    </div>
  );
};

export default Quiz;
