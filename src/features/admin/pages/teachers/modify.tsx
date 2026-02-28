import {useLocation, useNavigate} from "react-router-dom";
import {TeacherModifyView} from "@/features/admin/pages/teachers/view";

export function TeacherModifyPage() {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToList = () => {
        navigate('/admin/teachers');
    };

    return (
        <TeacherModifyView
            onList={routeToList}
            teacherId={state?.teacherId}
        />
    );
}
