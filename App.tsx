
import React, { useState, useEffect } from 'react';
import TopicButton from './components/TopicButton';
import InfoModal from './components/InfoModal';
import RewardScreen from './components/RewardScreen';
import { TOPICS } from './constants';

const App: React.FC = () => {
  const [activeTopicIndex, setActiveTopicIndex] = useState<number | null>(null);
  const [completedTopics, setCompletedTopics] = useState<boolean[]>(Array(TOPICS.length).fill(false));
  const [showRewardScreen, setShowRewardScreen] = useState(false);

  useEffect(() => {
    // Check if all topics are completed
    const allCompleted = completedTopics.every(status => status);
    if (allCompleted) {
        setTimeout(() => setShowRewardScreen(true), 500); // Small delay for effect
    }
  }, [completedTopics]);

  const handleTopicClick = (index: number) => {
    setActiveTopicIndex(index);
  };

  const handleCloseModal = () => {
    setActiveTopicIndex(null);
  };

  const handleQuizComplete = () => {
    if (activeTopicIndex !== null) {
      const newCompletedTopics = [...completedTopics];
      newCompletedTopics[activeTopicIndex] = true;
      setCompletedTopics(newCompletedTopics);
    }
    setActiveTopicIndex(null);
  };

  const handleRestart = () => {
    setCompletedTopics(Array(TOPICS.length).fill(false));
    setShowRewardScreen(false);
    setActiveTopicIndex(null);
  }

  const getIsLocked = (index: number): boolean => {
    if (index === 0) return false;
    return !completedTopics[index - 1];
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.3),rgba(255,255,255,0))]">
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <header className="text-center mb-12">
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
            IoT: Jornada para a Cidade Inteligente
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl">
            Clique nos módulos para aprender e avance em sua jornada para se tornar um mestre em IoT.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOPICS.map((topic, index) => (
            <TopicButton
              key={topic}
              topic={topic}
              onClick={() => handleTopicClick(index)}
              isCompleted={completedTopics[index]}
              isLocked={getIsLocked(index)}
            />
          ))}
        </div>

        {activeTopicIndex !== null && (
          <InfoModal
            topicTitle={TOPICS[activeTopicIndex]}
            onClose={handleCloseModal}
            onQuizComplete={handleQuizComplete}
          />
        )}
        
        {showRewardScreen && <RewardScreen onRestart={handleRestart} />}

      </main>
    </div>
  );
};

export default App;
