import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type QuizQuestion } from "@shared/schema";
import GameSetupScreen, { type GameSettings } from "@/components/quiz/game-setup-screen";
import QuizScreen from "@/components/quiz/quiz-screen";
import ResultsScreen from "@/components/quiz/results-screen";

type GameState = "setup" | "quiz" | "results";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  const { data: questions = [], isLoading } = useQuery<QuizQuestion[]>({
    queryKey: ["/api/quiz/questions", gameSettings?.difficulty, gameSettings?.category, gameSettings?.gameMode],
    enabled: gameState !== "setup" && gameSettings !== null,
    queryFn: async () => {
      if (!gameSettings) return [];
      const params = new URLSearchParams();
      if (gameSettings.difficulty) params.set('difficulty', gameSettings.difficulty);
      if (gameSettings.category) params.set('category', gameSettings.category);
      if (gameSettings.gameMode) params.set('mode', gameSettings.gameMode);
      const response = await fetch(`/api/quiz/questions?${params}`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const handleStartQuiz = (settings: GameSettings) => {
    setGameSettings(settings);
    setGameState("quiz");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers([]);
  };

  const handleAnswerSelected = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    if (answerIndex === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }

    // Move to next question or show results
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 2500);
    } else {
      setTimeout(() => {
        setGameState("results");
      }, 2500);
    }
  };

  const handleRestartQuiz = () => {
    setGameState("setup");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers([]);
    setGameSettings(null);
  };

  if (isLoading && gameState !== "setup") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🇨🇴</div>
          <div className="text-xl text-muted-foreground">Loading quiz questions...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {gameState === "setup" && (
          <GameSetupScreen onStartQuiz={handleStartQuiz} />
        )}
        
        {gameState === "quiz" && questions.length > 0 && (
          <QuizScreen
            question={questions[currentQuestion]}
            currentQuestionIndex={currentQuestion}
            totalQuestions={questions.length}
            score={score}
            onAnswerSelected={handleAnswerSelected}
            selectedAnswer={selectedAnswers[currentQuestion]}
          />
        )}
        
        {gameState === "results" && (
          <ResultsScreen
            score={score}
            totalQuestions={questions.length}
            onRestartQuiz={handleRestartQuiz}
          />
        )}
      </div>
    </div>
  );
}
