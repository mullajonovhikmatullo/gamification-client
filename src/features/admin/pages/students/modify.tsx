import {useLocation, useNavigate} from "react-router-dom";
import {UserModifyView} from "@/features/admin/pages/students/view";

export function UserModifyPage() {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToList = () => {
        navigate('/admin/users');
    };

    return (
        <UserModifyView
            onList={routeToList}
            userId={state?.userId}
        />
    );
}
