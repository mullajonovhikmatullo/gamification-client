import {useNavigate} from "react-router-dom";
import {UserRegisterView} from "@/features/admin/pages/students/view";

export function UserRegisterPage() {
    const navigate = useNavigate();

    const routeToList = () => {
        navigate('/admin/users');
    };

    return (
        <UserRegisterView
            onBack={routeToList}
        />
    );
}
