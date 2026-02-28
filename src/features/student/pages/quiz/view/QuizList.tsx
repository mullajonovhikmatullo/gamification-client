import {StudentLayout} from "@/features/student/components/layout/StudentLayout.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/features/student/components/ui/card.tsx";
import {Button} from "@/features/student/components/ui/button.tsx";
import {Badge} from "@/features/student/components/ui/badge.tsx";
import {Link} from "react-router-dom";
import {BookOpen, Clock, HelpCircle, Zap, Star, CheckCircle} from "lucide-react";

const QuizList = () => {
    const quizzes = [
        {
            id: 1,
            title: "JavaScript Basics",
            description: "Learn the fundamentals of JavaScript including variables, functions, and loops.",
            questions: 10,
            difficulty: "Beginner",
            estimatedTime: "15 min",
            points: 100,
            completed: false,
        },
        {
            id: 2,
            title: "React Fundamentals",
            description: "Master React concepts like components, props, state, and hooks.",
            questions: 15,
            difficulty: "Intermediate",
            estimatedTime: "25 min",
            points: 150,
            completed: true,
        },
        {
            id: 3,
            title: "HTML & CSS Challenge",
            description: "Test your knowledge of HTML elements and CSS styling techniques.",
            questions: 8,
            difficulty: "Beginner",
            estimatedTime: "12 min",
            points: 80,
            completed: false,
        },
        {
            id: 4,
            title: "TypeScript Essentials",
            description: "Explore TypeScript types, interfaces, and advanced features.",
            questions: 12,
            difficulty: "Advanced",
            estimatedTime: "20 min",
            points: 200,
            completed: false,
        },
        {
            id: 5,
            title: "Node.js Backend",
            description: "Build server-side applications with Node.js and Express.",
            questions: 14,
            difficulty: "Intermediate",
            estimatedTime: "22 min",
            points: 175,
            completed: true,
        },
        {
            id: 6,
            title: "CSS Grid & Flexbox",
            description: "Master modern CSS layout techniques for responsive design.",
            questions: 10,
            difficulty: "Intermediate",
            estimatedTime: "18 min",
            points: 120,
            completed: false,
        },
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Beginner":
                return "bg-success/10 text-success border-success/20";
            case "Intermediate":
                return "bg-warning/10 text-warning border-warning/20";
            case "Advanced":
                return "bg-destructive/10 text-destructive border-destructive/20";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-primary"/>
                        Quizzes
                    </h1>
                    <p className="text-muted-foreground mt-1 text-lg">
                        Choose a quiz and test your knowledge
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-xl shadow-md">
                    <Zap className="h-5 w-5 text-gold"/>
                    <span className="text-sm">
              <span className="font-bold">4</span> quizzes remaining today
            </span>
                </div>
            </div>

            {/* Quiz Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <Card
                        key={quiz.id}
                        className={`card-hover relative overflow-hidden ${quiz.completed ? 'border-success/30' : ''}`}
                    >
                        {quiz.completed && (
                            <div className="absolute top-4 right-4">
                                <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-success-foreground"/>
                                </div>
                            </div>
                        )}
                        <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                                <div
                                    className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                                    <BookOpen className="h-6 w-6 text-primary-foreground"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-lg leading-tight">{quiz.title}</CardTitle>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge
                                            variant="outline"
                                            className={`${getDifficultyColor(quiz.difficulty)} font-medium`}
                                        >
                                            {quiz.difficulty}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <CardDescription className="text-sm line-clamp-2">
                                {quiz.description}
                            </CardDescription>

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="h-4 w-4"/>
                        {quiz.questions} Questions
                    </span>
                                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4"/>
                                        {quiz.estimatedTime}
                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-gold fill-gold"/>
                                    <span className="font-bold text-gold">{quiz.points} pts</span>
                                </div>
                                <Link to={`/quiz/${quiz.id}`}>
                                    <Button
                                        variant={quiz.completed ? "secondary" : "game"}
                                        size="sm"
                                    >
                                        {quiz.completed ? "Retry Quiz" : "Start Quiz"}
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default QuizList;
