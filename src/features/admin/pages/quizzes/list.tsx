import {useLocation, useNavigate} from "react-router-dom";
import QuizListView from "@/features/admin/pages/quizzes/view/QuizListView.tsx";

export const QuizListPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToRegister = () => {
        navigate('/admin/quizzes/register');
    };

    const routeToModify = (quizId: string) => {
        navigate(`/admin/quizzes/modify`, {state: {...state, quizId}});
    };

    return <QuizListView onRegister={routeToRegister}
                         onModify={routeToModify}/>
}
