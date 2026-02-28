import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {StudentLayout} from "@/features/student/components/layout/StudentLayout.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/features/student/components/ui/card.tsx";
import {Button} from "@/features/student/components/ui/button.tsx";
import {Progress} from "@/features/student/components/ui/progress.tsx";
import {ArrowRight, CheckCircle, XCircle, Trophy, Home} from "lucide-react";
import {cn} from "@/features/student/lib/utils.ts";

export const QuizDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);

    const mockQuestions = [
        {
            id: 1,
            question: "What does map() do in JavaScript?",
            options: [
                "Loops through an array and modifies each element",
                "Creates a new array with the results of calling a function on every element",
                "Filters elements based on a condition",
                "Sorts the array in ascending order"
            ],
            correctAnswer: 1,
        },
        {
            id: 2,
            question: "Which hook is used for side effects in React?",
            options: [
                "useState",
                "useContext",
                "useEffect",
                "useReducer"
            ],
            correctAnswer: 2,
        },
        {
            id: 3,
            question: "What is the purpose of 'key' prop in React lists?",
            options: [
                "It adds styling to list items",
                "It helps React identify which items have changed",
                "It sorts the list automatically",
                "It adds event listeners to items"
            ],
            correctAnswer: 1,
        },
        {
            id: 4,
            question: "What does CSS 'flexbox' help with?",
            options: [
                "Adding animations to elements",
                "Creating responsive images",
                "Laying out elements in one dimension",
                "Adding shadows to elements"
            ],
            correctAnswer: 2,
        },
        {
            id: 5,
            question: "Which method is used to add an element to the end of an array?",
            options: [
                "unshift()",
                "push()",
                "pop()",
                "shift()"
            ],
            correctAnswer: 1,
        },
        {
            id: 6,
            question: "What is the difference between 'let' and 'const'?",
            options: [
                "There is no difference",
                "'let' is for functions, 'const' is for variables",
                "'const' cannot be reassigned, 'let' can be",
                "'let' is older than 'const'"
            ],
            correctAnswer: 2,
        },
        {
            id: 7,
            question: "What does JSX stand for?",
            options: [
                "JavaScript XML",
                "Java Syntax Extension",
                "JSON XML Syntax",
                "JavaScript Extension"
            ],
            correctAnswer: 0,
        },
        {
            id: 8,
            question: "Which HTML tag is used for the largest heading?",
            options: [
                "<heading>",
                "<h6>",
                "<h1>",
                "<head>"
            ],
            correctAnswer: 2,
        },
        {
            id: 9,
            question: "What is the virtual DOM in React?",
            options: [
                "A copy of the real DOM that React uses for diffing",
                "A database for storing components",
                "A CSS framework",
                "A testing library"
            ],
            correctAnswer: 0,
        },
        {
            id: 10,
            question: "Which CSS property is used to change text color?",
            options: [
                "text-color",
                "font-color",
                "color",
                "foreground"
            ],
            correctAnswer: 2,
        },
    ];

    const questions = mockQuestions;
    const totalQuestions = questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const handleAnswerSelect = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const handleNext = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
        }

        setShowResult(true);

        setTimeout(() => {
            if (currentQuestion < totalQuestions - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                setQuizComplete(true);
            }
        }, 1500);
    };

    const getOptionClass = (index: number) => {
        if (!showResult) {
            return selectedAnswer === index
                ? "border-primary bg-primary/10 ring-2 ring-primary"
                : "border-border hover:border-primary/50 hover:bg-accent/50";
        }

        const isCorrect = index === questions[currentQuestion].correctAnswer;
        const isSelected = index === selectedAnswer;

        if (isCorrect) {
            return "border-success bg-success/10 ring-2 ring-success";
        }
        if (isSelected && !isCorrect) {
            return "border-destructive bg-destructive/10 ring-2 ring-destructive";
        }
        return "border-border opacity-50";
    };

    if (quizComplete) {
        const percentage = Math.round((score / totalQuestions) * 100);
        const isPassing = percentage >= 70;

        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="w-full max-w-md text-center shadow-xl">
                    <CardHeader className="pb-4">
                        <div
                            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 ${isPassing ? 'bg-gradient-gold shadow-gold' : 'bg-muted'}`}>
                            <Trophy
                                className={`w-12 h-12 ${isPassing ? 'text-gold-foreground' : 'text-muted-foreground'}`}/>
                        </div>
                        <CardTitle className="text-2xl">
                            {isPassing ? "Congratulations!" : "Keep Practicing!"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <p className="text-5xl font-bold text-gradient mb-2">{percentage}%</p>
                            <p className="text-muted-foreground">
                                You got {score} out of {totalQuestions} questions correct
                            </p>
                        </div>

                        {isPassing && (
                            <div className="flex items-center justify-center gap-2 text-gold">
                                <CheckCircle className="h-5 w-5"/>
                                <span className="font-medium">+100 XP Earned!</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <Button
                                variant="game"
                                size="lg"
                                onClick={() => {
                                    setCurrentQuestion(0);
                                    setSelectedAnswer(null);
                                    setShowResult(false);
                                    setScore(0);
                                    setQuizComplete(false);
                                }}
                            >
                                Try Again
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => navigate("/quizzes")}
                            >
                                <Home className="mr-2 h-4 w-4"/>
                                Back to Quizzes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Progress Header */}
            <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
                    <span className="font-medium text-primary">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </span>
                </div>
                <Progress value={progress} className="h-3"/>
            </div>

            {/* Question Card */}
            <Card className="shadow-lg">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl md:text-2xl leading-relaxed">
                        {questions[currentQuestion].question}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showResult}
                            className={cn(
                                "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3",
                                getOptionClass(index)
                            )}
                        >
                <span className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                    selectedAnswer === index && !showResult
                        ? "bg-primary text-primary-foreground"
                        : showResult && index === questions[currentQuestion].correctAnswer
                            ? "bg-success text-success-foreground"
                            : showResult && index === selectedAnswer
                                ? "bg-destructive text-destructive-foreground"
                                : "bg-secondary text-secondary-foreground"
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                            <span className="flex-1">{option}</span>
                            {showResult && index === questions[currentQuestion].correctAnswer && (
                                <CheckCircle className="h-5 w-5 text-success shrink-0"/>
                            )}
                            {showResult && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                                <XCircle className="h-5 w-5 text-destructive shrink-0"/>
                            )}
                        </button>
                    ))}
                </CardContent>
            </Card>

            {/* Next Button */}
            <div className="flex justify-end">
                <Button
                    variant="game"
                    size="lg"
                    onClick={handleNext}
                    disabled={selectedAnswer === null || showResult}
                >
                    {currentQuestion === totalQuestions - 1 ? "Finish Quiz" : "Next Question"}
                    <ArrowRight className="ml-2 h-5 w-5"/>
                </Button>
            </div>
        </div>
    );
};

