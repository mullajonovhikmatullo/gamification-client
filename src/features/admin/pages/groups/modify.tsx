import {useLocation, useNavigate} from "react-router-dom";
import {GroupModifyView} from "@/features/admin/pages/groups/view";

export function GroupModifyPage() {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToList = () => {
        navigate('/admin/groups');
    };

    return (
        <GroupModifyView
            onList={routeToList}
            groupId={state?.groupId}
        />
    );
}
