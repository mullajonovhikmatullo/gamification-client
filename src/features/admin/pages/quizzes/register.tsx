import {useNavigate} from "react-router-dom";
import {QuizRegisterView} from "@/features/admin/pages/quizzes/view";

export function QuizRegisterPage() {
    const navigate = useNavigate();

    const routeToList = () => {
        navigate('/admin/quizzes');
    };

    return (
        <QuizRegisterView
            onBack={routeToList}
        />
    );
}
