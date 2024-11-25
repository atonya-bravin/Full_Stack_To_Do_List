import editIcon from "../assets/Icons/edit.svg";
import deleteIcon from "../assets/Icons/delete.svg";
import { useTasksContext } from "../Contexts/TasksContext";

const Tasks = () => {
    const {tasks, setTasks} = useTasksContext();


    return(
        <div className="w-[70%] py-[32px] flex flex-col gap-[32px]">
            {tasks.map((task) => (
                <div className="w-full flex flex-col gap-[16px] border-[1px] pb-[16px] rounded-[4px]">
                    <div className="text-[18px] font-medium bg-[#ebe9e5] px-[16px] py-[8px] rounded-[4px]">
                        {task.Title}
                    </div>
                    <div className="px-[16px]">
                        {task.Description}
                    </div>
                    <div className="w-full flex flex-row px-[16px]">
                        <div className="w-full text-[14px] text-[#6B7280] flex items-center">
                            Created On: {task.Date.toLocaleDateString()}
                        </div>
                        <div className="flex flex-row gap-[32px] justify-end px-[16px]">
                            <div className="px-[16px] py-[4px] flex justify-center items-center font-medium bg-[#E53E3E] text-white rounded-[4px]">
                                <div className="flex flex-row gap-[8px]">
                                    <div className="h-full flex justify-center items-center">
                                        <img src={deleteIcon} alt="" />
                                    </div>
                                    <div className="font-medium text-white">DELETE</div>
                                </div>
                            </div>
                            <div className="px-[16px] py-[4px] justify-center items-center bg-[#3182CE] rounded-[4px]">
                                <div className="flex flex-row gap-[8px]">
                                    <div className="h-full flex justify-center items-center">
                                        <img src={editIcon} alt="" />
                                    </div>
                                    <div className="font-medium text-white">EDIT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tasks;