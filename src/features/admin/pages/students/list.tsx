import {useLocation, useNavigate} from "react-router-dom";
import UserListView from "@/features/admin/pages/students/view/UserListView.tsx";

export const UserListPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToRegister = () => {
        navigate('/admin/users/register');
    };

    const routeToModify = (userId: string) => {
        navigate(`/admin/users/modify`, {state: {...state, userId}});
    };

    return <UserListView onRegister={routeToRegister}
                         onModify={routeToModify}/>
}
