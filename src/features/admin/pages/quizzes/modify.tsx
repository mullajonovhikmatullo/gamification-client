import {useLocation, useNavigate} from "react-router-dom";
import {QuizModifyView} from "@/features/admin/pages/quizzes/view";

export function QuizModifyPage() {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToList = () => {
        navigate('/admin/quizzes');
    };

    return (
        <QuizModifyView
            onList={routeToList}
            quizId={state?.quizId}
        />
    );
}
