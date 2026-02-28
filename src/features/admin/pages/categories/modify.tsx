import {useLocation, useNavigate, useParams} from "react-router-dom";
import {CategoryModifyView} from "@/features/admin/pages/categories/view";

export const CategoryModifyPage = () => {
//
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToList = () => {
        navigate('/admin/categories');
    };

    return <CategoryModifyView onList={routeToList} categoryId={state?.categoryId} />
}