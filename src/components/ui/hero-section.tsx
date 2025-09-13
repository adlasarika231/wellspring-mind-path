import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroSectionProps {
  onStartJourney: () => void;
}

export const HeroSection = ({ onStartJourney }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: "var(--wellness-gradient)" }}
      />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Wellness Journey
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Track your daily mood, discover patterns, and nurture your mental health with personalized insights and gentle guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 hover:bg-card/90 transition-all duration-300">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="font-semibold mb-2">Daily Check-ins</h3>
            <p className="text-sm text-muted-foreground">Quick, mindful moments to connect with your feelings</p>
          </Card>
          
          <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 hover:bg-card/90 transition-all duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-semibold mb-2">Mood Insights</h3>
            <p className="text-sm text-muted-foreground">Visualize patterns and trends in your emotional well-being</p>
          </Card>
          
          <Card className="p-6 backdrop-blur-sm bg-card/80 border-border/50 hover:bg-card/90 transition-all duration-300">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="font-semibold mb-2">Personal Growth</h3>
            <p className="text-sm text-muted-foreground">Tailored recommendations for your wellness journey</p>
          </Card>
        </div>

        <Button 
          onClick={onStartJourney}
          size="lg"
          className="text-lg px-8 py-6 rounded-full shadow-[var(--wellness-shadow)] hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Begin Your Journey
        </Button>
      </div>
    </section>
  );
};