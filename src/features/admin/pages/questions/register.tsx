import {useNavigate} from "react-router-dom";
import {QuestionRegisterView} from "@/features/admin/pages/questions/view";

export function QuestionRegisterPage() {
    const navigate = useNavigate();

    const routeToList = () => {
        navigate(-1);
    };

    return (
        <QuestionRegisterView
            onBack={routeToList}
        />
    );
}
