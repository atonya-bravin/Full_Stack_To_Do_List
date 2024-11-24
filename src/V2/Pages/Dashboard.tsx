import LargeScreenMenu from "../Components/Menu/LargeScreenMenu";
import Tasks from "./Tasks";

const Dashboard = () => {
    return(
        // Dashboard Container
        <div className="w-full h-full flex flex-col items-center">
            {/* Menu Bar */}
            <LargeScreenMenu />

            {/* Tasks area -> This is the area that shows all the scheduled tasks */}
            <Tasks />
        </div>
    );
};

export default Dashboard;