import { Outlet } from "react-router-dom";
import LargeScreenMenu from "../Components/Menu/LargeScreenMenu";

const Dashboard = () => {
    return(
        // Dashboard Container
        <div className="w-full h-full flex flex-col items-center">
            {/* Menu Bar */}
            <LargeScreenMenu />

            {/* The task area that displays the tasks or displays a new task form */}
            <Outlet />
        </div>
    );
};

export default Dashboard;