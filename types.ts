
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TopicContent {
  educationalText: string;
  quizQuestions: QuizQuestion[];
}
