import { Card, CardContent, CardHeader, CardTitle } from "@/features/student/components/ui/card.tsx";
import { Progress } from "@/features/student/components/ui/progress.tsx";
import { Button } from "@/features/student/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { 
  Star, 
  Trophy, 
  Target, 
  Flame, 
  BookOpen, 
  ArrowRight,
  Zap,
  Award
} from "lucide-react";

export const Dashboard = () => {
  const mockData = {
    name: "Alex",
    points: 1240,
    level: 5,
    levelName: "Rising Star",
    todayProgress: 60,
    streak: 7,
    quizzesCompleted: 23,
    totalQuizzes: 50,
  };

  const recentQuizzes = [
    { id: 1, title: "JavaScript Basics", score: 8, total: 10, date: "Today" },
    { id: 2, title: "React Hooks", score: 12, total: 15, date: "Yesterday" },
    { id: 3, title: "CSS Flexbox", score: 7, total: 8, date: "2 days ago" },
  ];

  return (
      <div className="space-y-6 md:space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, <span className="text-gradient">{mockData.name}!</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Ready to continue your learning journey?
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-gold px-4 py-2 rounded-full shadow-gold">
            <Flame className="w-5 h-5 text-gold-foreground" />
            <span className="font-bold text-gold-foreground">{mockData.streak} Day Streak!</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Points Card */}
          <Card className="card-hover bg-gradient-to-br from-card to-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Points</p>
                  <p className="text-3xl font-bold text-gradient">{mockData.points.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground mt-1">pts</p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                  <Star className="h-7 w-7 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Card */}
          <Card className="card-hover bg-gradient-to-br from-card to-gold/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Level</p>
                  <p className="text-3xl font-bold">Level {mockData.level}</p>
                  <p className="text-sm text-gold mt-1 font-medium">{mockData.levelName}</p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                  <Trophy className="h-7 w-7 text-gold-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quizzes Card */}
          <Card className="card-hover bg-gradient-to-br from-card to-success/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Quizzes Done</p>
                  <p className="text-3xl font-bold">{mockData.quizzesCompleted}</p>
                  <p className="text-sm text-muted-foreground mt-1">of {mockData.totalQuizzes}</p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-gradient-success flex items-center justify-center">
                  <BookOpen className="h-7 w-7 text-success-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* XP to Next Level */}
          <Card className="card-hover bg-gradient-to-br from-card to-info/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">XP to Level {mockData.level + 1}</p>
                  <p className="text-3xl font-bold">260</p>
                  <p className="text-sm text-muted-foreground mt-1">points needed</p>
                </div>
                <div className="h-14 w-14 rounded-2xl bg-info flex items-center justify-center">
                  <Zap className="h-7 w-7 text-info-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Progress */}
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Today's Progress
              </CardTitle>
              <span className="text-2xl font-bold text-gradient">{mockData.todayProgress}%</span>
            </div>
          </CardHeader>
          <CardContent>
            <Progress 
              value={mockData.todayProgress} 
              className="h-4"
            />
            <p className="text-sm text-muted-foreground mt-3">
              Complete 2 more quizzes to reach your daily goal!
            </p>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Recent Quizzes
                </CardTitle>
                <Link to="/quizzes">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div>
                    <p className="font-medium">{quiz.title}</p>
                    <p className="text-sm text-muted-foreground">{quiz.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">
                      {quiz.score}/{quiz.total}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((quiz.score / quiz.total) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-warning" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/quizzes" className="block">
                <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-shadow">
                      <BookOpen className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Start a Quiz</p>
                      <p className="text-sm text-muted-foreground">
                        Test your knowledge
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>

              <Link to="/leaderboard" className="block">
                <div className="p-4 rounded-xl bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center group-hover:shadow-gold transition-shadow">
                      <Trophy className="h-6 w-6 text-gold-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">View Leaderboard</p>
                      <p className="text-sm text-muted-foreground">
                        See your ranking
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>
                </div>
              </Link>

              <Link to="/achievements" className="block">
                <div className="p-4 rounded-xl bg-gradient-to-r from-success/10 to-success/5 border border-success/20 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-success flex items-center justify-center">
                      <Award className="h-6 w-6 text-success-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Check Achievements</p>
                      <p className="text-sm text-muted-foreground">
                        View your badges
                      </p>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:text-success transition-colors" />
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

