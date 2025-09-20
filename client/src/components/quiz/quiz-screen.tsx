import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { type QuizQuestion } from "@shared/schema";

interface QuizScreenProps {
  question: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  onAnswerSelected: (answerIndex: number) => void;
  selectedAnswer?: number;
}

export default function QuizScreen({
  question,
  currentQuestionIndex,
  totalQuestions,
  score,
  onAnswerSelected,
  selectedAnswer
}: QuizScreenProps) {
  const [showFeedback, setShowFeedback] = useState(false);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);

  useEffect(() => {
    setShowFeedback(false);
    setUserAnswer(null);
  }, [currentQuestionIndex]);

  const handleAnswerClick = (answerIndex: number) => {
    if (userAnswer !== null) return; // Prevent multiple selections
    
    setUserAnswer(answerIndex);
    setShowFeedback(true);
    onAnswerSelected(answerIndex);
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="fade-in">
      {/* Progress Header */}
      <Card className="shadow-lg p-6 mb-6 border border-border">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground heading-font" data-testid="text-question-counter">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </div>
          <div className="text-sm text-muted-foreground heading-font" data-testid="text-score">
            Score: <span className="text-primary font-bold">{score}</span>
          </div>
        </div>
        <Progress value={progress} className="progress-bar" data-testid="progress-quiz" />
      </Card>
      
      {/* Question Card */}
      <Card className="shadow-2xl mb-6 border border-border">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            {/* Colombian Cultural Icon */}
            <div className="text-6xl mb-4" data-testid="icon-question">{question.icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground heading-font leading-relaxed" data-testid="text-question">
              {question.question}
            </h2>
          </div>
          
          {/* Answer Options */}
          <div className="space-y-4" data-testid="container-answers">
            {(question.answers as string[]).map((answer, index) => {
              const isSelected = userAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              
              let buttonClasses = "answer-button w-full p-6 text-left rounded-xl border-2 transition-all duration-300 text-lg font-medium ";
              
              if (userAnswer === null) {
                buttonClasses += "border-border hover:border-primary bg-card hover:bg-muted ";
              } else if (isCorrectAnswer) {
                buttonClasses += "border-green-500 bg-green-50 correct ";
              } else if (isSelected && !isCorrectAnswer) {
                buttonClasses += "border-red-500 bg-red-50 incorrect ";
              } else {
                buttonClasses += "border-border bg-card ";
              }

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={buttonClasses}
                  variant="ghost"
                  size="lg"
                  disabled={userAnswer !== null}
                  data-testid={`button-answer-${index}`}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-muted-foreground mr-4 flex items-center justify-center text-sm font-bold heading-font">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{answer}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback Section */}
      {showFeedback && (
        <Card className="shadow-lg border border-border text-center" data-testid="card-feedback">
          <CardContent className="p-6">
            <div className="text-5xl mb-4" data-testid="icon-feedback">
              {isCorrect ? "✅" : "❌"}
            </div>
            <div className={`text-xl font-bold heading-font mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`} data-testid="text-feedback-result">
              {isCorrect ? "¡Correcto!" : "Incorrect"}
            </div>
            <div className="text-muted-foreground" data-testid="text-feedback-explanation">
              {question.explanation}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
