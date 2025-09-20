import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStartQuiz: () => void;
}

export default function WelcomeScreen({ onStartQuiz }: WelcomeScreenProps) {
  return (
    <div className="fade-in">
      {/* Colombian Flag Decorative Header */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-12 rounded-lg overflow-hidden shadow-lg border-2 border-white">
          <div className="w-full h-6 bg-primary"></div>
          <div className="w-full h-3 bg-secondary"></div>
          <div className="w-full h-3 bg-accent"></div>
        </div>
      </div>
      
      <Card className="shadow-2xl border border-border">
        <CardContent className="p-8 text-center">
          <h1 className="heading-font text-4xl md:text-5xl font-bold text-foreground mb-4">
            <i className="fas fa-map-marked-alt text-primary mr-3"></i>
            Discover Colombia
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Test your knowledge about the beautiful country of Colombia! 
            Explore its geography, culture, history, and amazing landmarks.
          </p>
          
          {/* Quiz Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-muted rounded-lg p-4" data-testid="stat-questions">
              <div className="text-2xl font-bold text-primary heading-font">18</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="bg-muted rounded-lg p-4" data-testid="stat-time">
              <div className="text-2xl font-bold text-secondary heading-font">5</div>
              <div className="text-sm text-muted-foreground">Minutes</div>
            </div>
          </div>
          
          <Button 
            onClick={onStartQuiz}
            className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg heading-font"
            size="lg"
            data-testid="button-start-quiz"
          >
            <i className="fas fa-play mr-2"></i>
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
