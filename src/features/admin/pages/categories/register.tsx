import {useNavigate} from "react-router-dom";
import {CategoryRegisterView} from "@/features/admin/pages/categories/view";

export function CategoryRegisterPage() {
    //
    const navigate = useNavigate();

    const routeToList = () => {
        navigate('/admin/categories');
    };

    return (
        <CategoryRegisterView
            onBack={routeToList}
        />
    );
}