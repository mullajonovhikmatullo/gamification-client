import {useLocation, useNavigate} from "react-router-dom";
import {QuestionModifyView} from "@/features/admin/pages/questions/view";

export function QuestionModifyPage() {
    const navigate = useNavigate();
    const {state} = useLocation();

    const routeToList = () => {
        navigate(-1);
    };

    return (
        <QuestionModifyView
            onList={routeToList}
            questionId={state?.questionId}
        />
    );
}
