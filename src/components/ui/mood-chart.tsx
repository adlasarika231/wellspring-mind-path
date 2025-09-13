import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

interface MoodChartProps {
  data: MoodEntry[];
}

const moodLabels = {
  1: "Very Sad",
  2: "Sad", 
  3: "Neutral",
  4: "Good",
  5: "Very Happy"
};

export const MoodChart = ({ data }: MoodChartProps) => {
  const chartData = data.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    mood: entry.mood,
    fullDate: entry.date,
  })).slice(-14); // Show last 14 days

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const moodValue = payload[0].value;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Mood: {moodLabels[moodValue as keyof typeof moodLabels]}
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-6xl mb-4">📈</div>
        <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
        <p className="text-muted-foreground">
          Record your first mood to see your wellness trends here
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Your Mood Journey</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              domain={[1, 5]}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => moodLabels[value as keyof typeof moodLabels]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};