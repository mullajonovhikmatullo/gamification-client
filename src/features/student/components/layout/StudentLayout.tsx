import {Navigation} from "./Navigation.tsx";
import {Outlet} from "react-router-dom";

export const StudentLayout = () => {
    return (
        <div>
            <Navigation/>
            <main style={{padding: 24}}>
                <Outlet/>
            </main>
        </div>
    );
};
