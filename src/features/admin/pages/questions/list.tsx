import {useLocation, useNavigate} from "react-router-dom";
import QuestionListView from "@/features/admin/pages/questions/view/QuestionListView.tsx";

export const QuestionListPage = () => {
    //
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToRegister = () => {
        navigate('/admin/categories/questions/register');
    };

    const routeToModify = (questionId: string) => {
        navigate(`/admin/categories/questions/modify`, {state: {...state, questionId}});
    };

    return <QuestionListView
        categoryId={state?.categoryId}
        onRegister={routeToRegister}
        onModify={routeToModify}/>
}
