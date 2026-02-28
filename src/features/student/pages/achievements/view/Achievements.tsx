import { StudentLayout } from "@/features/student/components/layout/StudentLayout.tsx";
import { Card, CardContent } from "@/features/student/components/ui/card.tsx";
import { 
  Award, 
  Zap, 
  Trophy, 
  Star, 
  Target, 
  Flame, 
  BookOpen, 
  Clock,
  Crown,
  Rocket,
  Heart,
  Sparkles,
  Lock
} from "lucide-react";
import { cn } from "@/features/student/lib/utils.ts";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Complete 5 quizzes in one day",
      icon: Zap,
      color: "from-warning to-warning/70",
      textColor: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      earned: true,
      earnedDate: "Dec 5, 2024",
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      icon: Target,
      color: "from-success to-success/70",
      textColor: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      earned: true,
      earnedDate: "Dec 8, 2024",
    },
    {
      id: 3,
      title: "Weekly Champion",
      description: "Top the leaderboard for a week",
      icon: Crown,
      color: "from-gold to-gold/70",
      textColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
      earned: true,
      earnedDate: "Dec 10, 2024",
    },
    {
      id: 4,
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: Flame,
      color: "from-destructive to-destructive/70",
      textColor: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      earned: true,
      earnedDate: "Today",
    },
    {
      id: 5,
      title: "Quiz Enthusiast",
      description: "Complete 20 quizzes total",
      icon: BookOpen,
      color: "from-primary to-primary/70",
      textColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      earned: true,
      earnedDate: "Dec 9, 2024",
    },
    {
      id: 6,
      title: "Rising Star",
      description: "Reach Level 5",
      icon: Star,
      color: "from-gold to-warning",
      textColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
      earned: true,
      earnedDate: "Dec 11, 2024",
    },
    {
      id: 7,
      title: "Speed Demon",
      description: "Complete a quiz in under 2 minutes",
      icon: Clock,
      color: "from-info to-info/70",
      textColor: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/30",
      earned: false,
      progress: 0,
    },
    {
      id: 8,
      title: "Knowledge King",
      description: "Earn 5,000 total points",
      icon: Trophy,
      color: "from-gold to-gold/70",
      textColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
      earned: false,
      progress: 25,
    },
    {
      id: 9,
      title: "Early Bird",
      description: "Complete a quiz before 8 AM",
      icon: Rocket,
      color: "from-success to-info",
      textColor: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      earned: false,
      progress: 0,
    },
    {
      id: 10,
      title: "Devoted Learner",
      description: "30-day learning streak",
      icon: Heart,
      color: "from-destructive to-pink-500",
      textColor: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      earned: false,
      progress: 23,
    },
    {
      id: 11,
      title: "Master Scholar",
      description: "Complete all quizzes with 90%+",
      icon: Award,
      color: "from-primary to-purple-500",
      textColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      earned: false,
      progress: 60,
    },
    {
      id: 12,
      title: "Legend",
      description: "Reach Level 10",
      icon: Sparkles,
      color: "from-gold via-warning to-gold",
      textColor: "text-gold",
      bgColor: "bg-gold/10",
      borderColor: "border-gold/30",
      earned: false,
      progress: 50,
    },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const lockedAchievements = achievements.filter(a => !a.earned);

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              Achievements
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Your collection of badges and milestones
            </p>
          </div>
          <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-xl shadow-md">
            <Trophy className="h-5 w-5 text-gold" />
            <span className="text-sm">
              <span className="font-bold">{earnedAchievements.length}</span> of {achievements.length} earned
            </span>
          </div>
        </div>

        {/* Earned Achievements */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Star className="h-5 w-5 text-gold fill-gold" />
            Earned Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={cn(
                  "card-hover overflow-hidden border-2",
                  achievement.borderColor
                )}
              >
                <CardContent className="p-6 text-center">
                  <div className={cn(
                    "w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br",
                    achievement.color
                  )}>
                    <achievement.icon className="h-8 w-8 text-card" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {achievement.description}
                  </p>
                  <span className={cn("text-xs font-medium", achievement.textColor)}>
                    Earned {achievement.earnedDate}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Achievements */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Locked Badges
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lockedAchievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className="overflow-hidden border-2 border-dashed border-border/50 opacity-70 hover:opacity-100 transition-opacity"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-muted relative">
                    <achievement.icon className="h-8 w-8 text-muted-foreground" />
                    <div className="absolute -top-1 -right-1 bg-card rounded-full p-1">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                  {achievement.progress !== undefined && achievement.progress > 0 && (
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {achievement.progress}% complete
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Achievements;
