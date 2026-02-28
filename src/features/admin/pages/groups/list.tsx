import {useLocation, useNavigate} from "react-router-dom";
import GroupListView from "@/features/admin/pages/groups/view/GroupListView.tsx";

export const GroupListPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToRegister = () => {
        navigate('/admin/groups/register');
    };

    const routeToModify = (groupId: string) => {
        navigate(`/admin/groups/modify`, {state: {...state, groupId}});
    };

    return <GroupListView onRegister={routeToRegister}
                          onModify={routeToModify}/>
}
