import { useNavigate } from "react-router-dom";
import EmptyDashboardIcon from "../../V2/assets/Icons/add_icon.svg";

const EmptyDashboard = () => {
    const navigate = useNavigate();

    return(
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="px-[32px] py-[32px] bg-blue-500 hover:bg-blue-600 rounded-full"
                onClick={() => {
                    navigate('/Dashboard/newTask')
                }}
            >
                <img src={EmptyDashboardIcon} alt="" />
            </div>
            <div className="font-medium text-[18px] text-gray-500 mt-[16px]">Click To Add New</div>
        </div>
    );
};

export default EmptyDashboard;