import {useLocation, useNavigate} from "react-router-dom";
import TeacherListView from "@/features/admin/pages/teachers/view/TeacherListView.tsx";

export const TeacherListPage = () => {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToRegister = () => {
        navigate('/admin/teachers/register');
    };

    const routeToModify = (teacherId: string) => {
        navigate(`/admin/teachers/modify`, {state: {...state, teacherId}});
    };

    return <TeacherListView onRegister={routeToRegister}
                            onModify={routeToModify}/>
}
