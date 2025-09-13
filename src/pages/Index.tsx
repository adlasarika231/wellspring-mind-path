import { useState, useEffect } from "react";
import { HeroSection } from "@/components/ui/hero-section";
import { MoodTracker } from "@/components/ui/mood-tracker";
import { MoodChart } from "@/components/ui/mood-chart";
import { WellnessRecommendations } from "@/components/ui/wellness-recommendations";
import { Button } from "@/components/ui/button";

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'hero' | 'dashboard'>('hero');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Load mood entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setMoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const handleMoodSubmit = (entry: MoodEntry) => {
    setMoodEntries(prev => [...prev, entry]);
  };

  const handleStartJourney = () => {
    setCurrentView('dashboard');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  if (currentView === 'hero') {
    return <HeroSection onStartJourney={handleStartJourney} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={handleBackToHero}
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            🧠 Wellness Monitor
          </button>
          <div className="text-sm text-muted-foreground">
            {moodEntries.length} mood{moodEntries.length !== 1 ? 's' : ''} tracked
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Daily Check-in Section */}
        <section>
          <MoodTracker onMoodSubmit={handleMoodSubmit} />
        </section>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <section>
            <MoodChart data={moodEntries} />
          </section>
          
          <section>
            <WellnessRecommendations recentMoods={moodEntries.slice(-7)} />
          </section>
        </div>

        {/* Quick Stats */}
        {moodEntries.length > 0 && (
          <section className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {moodEntries.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Check-ins</div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                {Math.round((moodEntries.reduce((sum, entry) => sum + entry.mood, 0) / moodEntries.length) * 10) / 10}
              </div>
              <div className="text-sm text-muted-foreground">Average Mood</div>
            </div>
            
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {Math.ceil((Date.now() - new Date(moodEntries[0]?.date || Date.now()).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-muted-foreground">Days Tracking</div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;