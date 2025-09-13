import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

interface WellnessRecommendationsProps {
  recentMoods: MoodEntry[];
}

interface Recommendation {
  title: string;
  description: string;
  icon: string;
  action: string;
  color: string;
}

const getRecommendations = (averageMood: number): Recommendation[] => {
  if (averageMood <= 2) {
    return [
      {
        title: "Take a Gentle Walk",
        description: "Fresh air and light movement can help lift your spirits",
        icon: "🚶‍♀️",
        action: "Start a 10-minute walk",
        color: "hsl(var(--mood-sad))"
      },
      {
        title: "Connect with Someone",
        description: "Reach out to a friend, family member, or counselor",
        icon: "💬",
        action: "Send a message",
        color: "hsl(var(--primary))"
      },
      {
        title: "Practice Self-Compassion",
        description: "Be kind to yourself during difficult times",
        icon: "💝",
        action: "Try a meditation",
        color: "hsl(var(--accent))"
      }
    ];
  } else if (averageMood <= 3.5) {
    return [
      {
        title: "Gratitude Practice",
        description: "Write down 3 things you're grateful for today",
        icon: "📝",
        action: "Start journaling",
        color: "hsl(var(--mood-neutral))"
      },
      {
        title: "Listen to Music",
        description: "Put on your favorite songs to boost your mood",
        icon: "🎵",
        action: "Play music",
        color: "hsl(var(--secondary))"
      },
      {
        title: "Breathing Exercise",
        description: "Try the 4-7-8 breathing technique for relaxation",
        icon: "🫁",
        action: "Start breathing",
        color: "hsl(var(--primary))"
      }
    ];
  } else {
    return [
      {
        title: "Share Your Joy",
        description: "Your positive energy can brighten someone else's day",
        icon: "✨",
        action: "Spread positivity",
        color: "hsl(var(--mood-happy))"
      },
      {
        title: "Try Something New",
        description: "Channel your good mood into a creative activity",
        icon: "🎨",
        action: "Get creative",
        color: "hsl(var(--accent))"
      },
      {
        title: "Help Others",
        description: "Consider volunteering or helping a friend",
        icon: "🤝",
        action: "Find ways to help",
        color: "hsl(var(--secondary))"
      }
    ];
  }
};

export const WellnessRecommendations = ({ recentMoods }: WellnessRecommendationsProps) => {
  if (recentMoods.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">🌟</div>
        <h3 className="text-xl font-semibold mb-2">Personalized Recommendations</h3>
        <p className="text-muted-foreground">
          Start tracking your mood to receive tailored wellness suggestions
        </p>
      </Card>
    );
  }

  const averageMood = recentMoods.reduce((sum, entry) => sum + entry.mood, 0) / recentMoods.length;
  const recommendations = getRecommendations(averageMood);

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-2 text-center">Wellness Recommendations</h3>
      <p className="text-muted-foreground text-center mb-6">
        Based on your recent mood patterns
      </p>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl border border-border hover:bg-muted/50 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                style={{ backgroundColor: `${rec.color}15` }}
              >
                {rec.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full hover:scale-105 transition-transform"
                >
                  {rec.action}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};