import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type InsertQuizAttempt } from "@shared/schema";
import { useEffect } from "react";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  onRestartQuiz: () => void;
}

export default function ResultsScreen({
  score,
  totalQuestions,
  onRestartQuiz
}: ResultsScreenProps) {
  const { toast } = useToast();
  
  const saveAttemptMutation = useMutation({
    mutationFn: async (attemptData: InsertQuizAttempt) => {
      const response = await apiRequest("POST", "/api/quiz/attempt", attemptData);
      return response.json();
    },
  });

  useEffect(() => {
    // Save quiz attempt when results screen loads
    const attemptData: InsertQuizAttempt = {
      score,
      totalQuestions,
      completedAt: new Date().toISOString(),
    };
    
    saveAttemptMutation.mutate(attemptData);
  }, [score, totalQuestions]);

  const percentage = Math.round((score / totalQuestions) * 100);

  const getPerformanceFeedback = () => {
    if (percentage >= 90) {
      return "¡Excelente! You are a true Colombia expert! Your knowledge is impressive.";
    } else if (percentage >= 75) {
      return "Great job! You have solid knowledge about Colombia's culture and geography.";
    } else if (percentage >= 60) {
      return "Good work! You know quite a bit about Colombia. Keep learning!";
    } else {
      return "Nice try! Colombia is fascinating - there's always more to discover!";
    }
  };

  const handleShareResults = async () => {
    const text = `I just scored ${score}/${totalQuestions} (${percentage}%) on the Discover Colombia Quiz! 🇨🇴 Test your knowledge too!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Discover Colombia Quiz Results',
          text: text,
          url: window.location.href
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Results copied!",
          description: "Results copied to clipboard - share with your friends!",
        });
      } catch (error) {
        toast({
          title: "Share failed",
          description: "Could not copy results to clipboard",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="fade-in">
      <Card className="shadow-2xl border border-border">
        <CardContent className="p-8 text-center">
          {/* Celebration Header */}
          <div className="mb-8">
            <div className="text-8xl mb-4" data-testid="icon-celebration">🎉</div>
            <h1 className="heading-font text-4xl font-bold text-foreground mb-4" data-testid="text-congratulations">
              ¡Felicitaciones!
            </h1>
            <p className="text-xl text-muted-foreground" data-testid="text-completion-message">
              You've completed the Colombia Discovery Quiz!
            </p>
          </div>
          
          {/* Score Display */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-8 mb-8 text-white">
            <div className="text-6xl font-bold heading-font mb-2" data-testid="text-final-score">
              {score}
            </div>
            <div className="text-xl" data-testid="text-total-questions">out of {totalQuestions} questions</div>
            <div className="text-lg opacity-90 mt-2" data-testid="text-percentage">
              {percentage}% Correct
            </div>
          </div>
          
          {/* Performance Feedback */}
          <div className="mb-8">
            <h3 className="heading-font text-2xl font-bold text-foreground mb-4">Your Performance</h3>
            <div className="text-lg text-muted-foreground p-4 bg-muted rounded-lg" data-testid="text-performance-feedback">
              {getPerformanceFeedback()}
            </div>
          </div>
          
          {/* Educational Facts */}
          <div className="mb-8">
            <h3 className="heading-font text-2xl font-bold text-foreground mb-4">
              <i className="fas fa-lightbulb text-primary mr-2"></i>
              Did You Know?
            </h3>
            <div className="grid gap-4 text-left" data-testid="container-facts">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">🦋</strong> Colombia is the world's leading source of emeralds and has more bird species than any other country.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">☕</strong> Colombia is the world's third-largest coffee producer, famous for its high-quality Arabica beans.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">🎨</strong> Cartagena's historic center is a UNESCO World Heritage Site with beautiful colonial architecture.
                </p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              onClick={onRestartQuiz}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-xl transition-all duration-300 heading-font"
              data-testid="button-play-again"
            >
              <i className="fas fa-redo mr-2"></i>
              Play Again
            </Button>
            <Button 
              onClick={handleShareResults}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 px-6 rounded-xl transition-all duration-300 heading-font"
              variant="secondary"
              data-testid="button-share-results"
            >
              <i className="fas fa-share mr-2"></i>
              Share Results
            </Button>
          </div>
          
          {/* Credits */}
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground" data-testid="text-credits">
              Created By Israel Congrace for beating my game
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
