import {RouteObject} from "react-router-dom";
import ProtectedRoute from "@/components/routes/ProtectedRoute.tsx";
import QuizList from "@/features/student/pages/quiz/view/QuizList.tsx";
import QuizDetail from "@/features/student/pages/quiz/detail/QuizDetail.tsx";

export const route: RouteObject = {
    path: 'quizzes',
    handle: {
        title: 'Quizzes'
    },
    children: [
        {
            path: '',
            element: <ProtectedRoute>
                <QuizList />
            </ProtectedRoute>
        },
        {
            path: 'quiz',
            element: <ProtectedRoute>
                <QuizDetail />
            </ProtectedRoute>
        }
    ],
}