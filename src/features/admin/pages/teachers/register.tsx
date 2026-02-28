import {useNavigate} from "react-router-dom";
import {TeacherRegisterView} from "@/features/admin/pages/teachers/view";

export function TeacherRegisterPage() {
    const navigate = useNavigate();

    const routeToList = () => {
        navigate('/admin/teachers');
    };

    return (
        <TeacherRegisterView
            onBack={routeToList}
        />
    );
}
