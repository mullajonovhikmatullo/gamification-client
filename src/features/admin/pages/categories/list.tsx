import {useLocation, useNavigate} from "react-router-dom";
import CategoryListView from "@/features/admin/pages/categories/view/CategoryListView.tsx";

export const CategoryListPage = () => {
    //
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToRegister = () => {
        navigate('/admin/categories/register');
    };

    const routeToModify = (categoryId: string) => {
        navigate(`/admin/categories/modify`, {state: {...state, categoryId}});
    };

    const routeToQuestions = (categoryId: string) => {
        navigate(`/admin/categories/questions`, {state: {...state, categoryId}});
    };

    return <CategoryListView onRegister={routeToRegister}
                             onModify={routeToModify}
                             onQuestions={routeToQuestions}/>
}