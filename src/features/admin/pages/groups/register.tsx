import {useNavigate} from "react-router-dom";
import {GroupRegisterView} from "@/features/admin/pages/groups/view";

export function GroupRegisterPage() {
    const navigate = useNavigate();

    const routeToList = () => {
        navigate('/admin/groups');
    };

    return (
        <GroupRegisterView
            onBack={routeToList}
        />
    );
}
