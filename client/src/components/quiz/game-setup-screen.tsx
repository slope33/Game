import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameSetupScreenProps {
  onStartQuiz: (settings: GameSettings) => void;
}

export interface GameSettings {
  difficulty: string;
  gameMode: string;
  category?: string;
}

const difficultyOptions = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Basic facts about Colombia",
    icon: "🌱",
    color: "bg-green-100 border-green-300 text-green-800"
  },
  {
    id: "intermediate", 
    name: "Intermediate",
    description: "More detailed knowledge required",
    icon: "🎯",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800"
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Challenging questions for experts",
    icon: "🏆",
    color: "bg-red-100 border-red-300 text-red-800"
  }
];

const gameModeOptions = [
  {
    id: "quick",
    name: "Quick Quiz",
    description: "5 questions - Perfect for a quick challenge",
    icon: "⚡",
    time: "2 mins"
  },
  {
    id: "comprehensive",
    name: "Full Quiz",
    description: "All questions - Complete knowledge test",
    icon: "📚",
    time: "8-10 mins"
  }
];

const categoryOptions = [
  { id: "all", name: "All Topics", icon: "🌟" },
  { id: "Geography", name: "Geography", icon: "🗺️" },
  { id: "Culture", name: "Culture", icon: "🎭" },
  { id: "Economy", name: "Economy", icon: "💰" },
  { id: "Sports", name: "Sports", icon: "⚽" }
];

export default function GameSetupScreen({ onStartQuiz }: GameSetupScreenProps) {
  const [difficulty, setDifficulty] = useState("beginner");
  const [gameMode, setGameMode] = useState("quick");
  const [category, setCategory] = useState("all");

  const handleStartQuiz = () => {
    onStartQuiz({
      difficulty,
      gameMode,
      category: category === "all" ? undefined : category
    });
  };

  return (
    <div className="fade-in space-y-6">
      {/* Colombian Flag Header */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-12 rounded-lg overflow-hidden shadow-lg border-2 border-white">
          <div className="w-full h-6 bg-primary"></div>
          <div className="w-full h-3 bg-secondary"></div>
          <div className="w-full h-3 bg-accent"></div>
        </div>
      </div>

      {/* Header */}
      <Card className="shadow-lg border border-border">
        <CardContent className="p-6 text-center">
          <h1 className="heading-font text-3xl font-bold text-foreground mb-2">
            🇨🇴 Discover Colombia
          </h1>
          <p className="text-muted-foreground">Customize your learning experience</p>
        </CardContent>
      </Card>

      {/* Difficulty Selection */}
      <Card className="shadow-lg border border-border">
        <CardContent className="p-6">
          <h2 className="heading-font text-xl font-bold mb-4 text-foreground">
            Choose Difficulty Level
          </h2>
          <div className="grid gap-3">
            {difficultyOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setDifficulty(option.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                  difficulty === option.id
                    ? option.color + " border-opacity-100"
                    : "bg-muted border-border hover:border-primary"
                }`}
                data-testid={`button-difficulty-${option.id}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <div className="font-bold heading-font">{option.name}</div>
                    <div className="text-sm opacity-80">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Mode Selection */}
      <Card className="shadow-lg border border-border">
        <CardContent className="p-6">
          <h2 className="heading-font text-xl font-bold mb-4 text-foreground">
            Select Game Mode
          </h2>
          <div className="grid gap-3">
            {gameModeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setGameMode(option.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-105 ${
                  gameMode === option.id
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-muted border-border hover:border-primary"
                }`}
                data-testid={`button-mode-${option.id}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <div className="font-bold heading-font">{option.name}</div>
                      <div className="text-sm opacity-80">{option.description}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium opacity-60">
                    {option.time}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <Card className="shadow-lg border border-border">
        <CardContent className="p-6">
          <h2 className="heading-font text-xl font-bold mb-4 text-foreground">
            Choose Topic
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categoryOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setCategory(option.id)}
                className={`p-3 rounded-lg border-2 text-center transition-all hover:scale-105 ${
                  category === option.id
                    ? "bg-secondary/10 border-secondary text-secondary"
                    : "bg-muted border-border hover:border-secondary"
                }`}
                data-testid={`button-category-${option.id}`}
              >
                <div className="text-2xl mb-1">{option.icon}</div>
                <div className="text-sm font-medium">{option.name}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Card className="shadow-lg border border-border">
        <CardContent className="p-6 text-center">
          <Button
            onClick={handleStartQuiz}
            className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg heading-font"
            size="lg"
            data-testid="button-start-quiz"
          >
            Start Quiz 🚀
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} • {gameMode === "quick" ? "5 questions" : "Full quiz"} • {category === "all" ? "All topics" : category}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}