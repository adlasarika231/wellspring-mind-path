import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Mood {
  emoji: string;
  label: string;
  value: number;
  color: string;
}

const moods: Mood[] = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "hsl(var(--mood-sad))" },
  { emoji: "😞", label: "Sad", value: 2, color: "hsl(var(--mood-sad))" },
  { emoji: "😐", label: "Neutral", value: 3, color: "hsl(var(--mood-neutral))" },
  { emoji: "🙂", label: "Good", value: 4, color: "hsl(var(--mood-happy))" },
  { emoji: "😊", label: "Very Happy", value: 5, color: "hsl(var(--mood-happy))" },
];

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

interface MoodTrackerProps {
  onMoodSubmit: (entry: MoodEntry) => void;
}

export const MoodTracker = ({ onMoodSubmit }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    const entry: MoodEntry = {
      date: new Date().toISOString(),
      mood: selectedMood,
      note,
    };

    onMoodSubmit(entry);
    setSelectedMood(null);
    setNote("");
    
    toast({
      title: "Mood recorded! 🌟",
      description: "Thank you for checking in with yourself today",
    });
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          How are you feeling today?
        </h2>
        <p className="text-muted-foreground">
          Take a moment to check in with yourself
        </p>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`
              p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-110
              ${selectedMood === mood.value 
                ? 'border-primary shadow-[var(--wellness-shadow)] scale-110' 
                : 'border-border hover:border-primary/50'
              }
            `}
            style={{ 
              backgroundColor: selectedMood === mood.value ? `${mood.color}15` : 'transparent' 
            }}
          >
            <div className="text-4xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium">{mood.label}</div>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          How was your day? (Optional)
        </label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Share what's on your mind..."
          className="min-h-[100px] resize-none"
        />
      </div>

      <Button 
        onClick={handleSubmit}
        className="w-full py-6 text-lg rounded-full"
        disabled={selectedMood === null}
      >
        Record Today's Mood
      </Button>
    </Card>
  );
};