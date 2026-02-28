import { StudentLayout } from "@/features/student/components/layout/StudentLayout.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/student/components/ui/card.tsx";
import { Trophy, Medal, Crown, Star, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/features/student/lib/utils.ts";

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: "Alex", points: 1240, avatar: "A", trend: "up", change: 2 },
    { rank: 2, name: "Sara", points: 1130, avatar: "S", trend: "same", change: 0 },
    { rank: 3, name: "John", points: 980, avatar: "J", trend: "up", change: 1 },
    { rank: 4, name: "Emily", points: 920, avatar: "E", trend: "down", change: 2 },
    { rank: 5, name: "Michael", points: 875, avatar: "M", trend: "up", change: 3 },
    { rank: 6, name: "Jessica", points: 810, avatar: "J", trend: "same", change: 0 },
    { rank: 7, name: "David", points: 765, avatar: "D", trend: "down", change: 1 },
    { rank: 8, name: "Ashley", points: 720, avatar: "A", trend: "up", change: 4 },
    { rank: 9, name: "Chris", points: 685, avatar: "C", trend: "same", change: 0 },
    { rank: 10, name: "Taylor", points: 650, avatar: "T", trend: "down", change: 2 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-gold fill-gold" />;
      case 2:
        return <Medal className="h-6 w-6 text-silver" />;
      case 3:
        return <Medal className="h-6 w-6 text-bronze" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-gold/20 to-gold/5 border-gold/30";
      case 2:
        return "bg-gradient-to-r from-silver/20 to-silver/5 border-silver/30";
      case 3:
        return "bg-gradient-to-r from-bronze/20 to-bronze/5 border-bronze/30";
      default:
        return "bg-card hover:bg-accent/30";
    }
  };

  const getAvatarStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-gold shadow-gold";
      case 2:
        return "bg-silver";
      case 3:
        return "bg-bronze";
      default:
        return "bg-gradient-primary";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  // Current user's stats
  const currentUser = leaderboardData[0];

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Trophy className="h-8 w-8 text-gold" />
              Leaderboard
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Top performers this week
            </p>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          {/* Second Place */}
          <Card className="order-1 md:order-1 mt-6 bg-gradient-to-b from-silver/10 to-card border-silver/30">
            <CardContent className="pt-6 text-center">
              <div className="relative inline-block mb-3">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-silver flex items-center justify-center mx-auto">
                  <span className="text-2xl md:text-3xl font-bold text-card">S</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-silver text-card text-xs font-bold px-2 py-0.5 rounded-full">
                  2nd
                </div>
              </div>
              <h3 className="font-bold text-lg mt-4">Sara</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <span className="font-bold">1,130 pts</span>
              </div>
            </CardContent>
          </Card>

          {/* First Place */}
          <Card className="order-2 md:order-2 shadow-gold bg-gradient-to-b from-gold/20 to-card border-gold/30">
            <CardContent className="pt-6 text-center">
              <Crown className="h-8 w-8 text-gold mx-auto mb-2 animate-bounce-soft" />
              <div className="relative inline-block mb-3">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-gold flex items-center justify-center mx-auto shadow-gold">
                  <span className="text-3xl md:text-4xl font-bold text-gold-foreground">A</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full">
                  1st
                </div>
              </div>
              <h3 className="font-bold text-xl mt-4">Alex</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="h-5 w-5 text-gold fill-gold" />
                <span className="font-bold text-lg text-gradient">1,240 pts</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">That's you!</p>
            </CardContent>
          </Card>

          {/* Third Place */}
          <Card className="order-3 md:order-3 mt-8 bg-gradient-to-b from-bronze/10 to-card border-bronze/30">
            <CardContent className="pt-6 text-center">
              <div className="relative inline-block mb-3">
                <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-bronze flex items-center justify-center mx-auto">
                  <span className="text-xl md:text-2xl font-bold text-card">J</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-bronze text-card text-xs font-bold px-2 py-0.5 rounded-full">
                  3rd
                </div>
              </div>
              <h3 className="font-bold text-lg mt-4">John</h3>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="h-4 w-4 text-gold fill-gold" />
                <span className="font-bold">980 pts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Full Leaderboard */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>All Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {leaderboardData.map((player) => (
                <div
                  key={player.rank}
                  className={cn(
                    "flex items-center gap-4 p-4 transition-colors",
                    getRankStyle(player.rank),
                    player.name === "Alex" && "bg-primary/5"
                  )}
                >
                  {/* Rank */}
                  <div className="w-10 flex justify-center">
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Avatar */}
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                    getAvatarStyle(player.rank)
                  )}>
                    <span className="text-lg font-bold text-primary-foreground">
                      {player.avatar}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">
                      {player.name}
                      {player.name === "Alex" && (
                        <span className="ml-2 text-xs text-primary">(You)</span>
                      )}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      {getTrendIcon(player.trend)}
                      <span>
                        {player.change > 0 
                          ? `${player.trend === "up" ? "↑" : "↓"} ${player.change} places`
                          : "No change"
                        }
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-gold fill-gold" />
                      <span className="font-bold">{player.points.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">points</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default Leaderboard;
