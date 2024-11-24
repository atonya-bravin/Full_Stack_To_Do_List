import editIcon from "../assets/Icons/edit.svg";
import deleteIcon from "../assets/Icons/delete.svg";

const tasks: {Title: string, Description: string }[] = [
    {
        Title: "Washing The Bathroom",
        Description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat deleniti dolorum, illo voluptatibus error, soluta tempore impedit asperiores repudiandae voluptatem dolorem est magnam ex ab assumenda. Officia provident quis consequatur."
    },
    {
        Title: "Reading The Bible",
        Description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. "
    }
]

const Tasks = () => {
    return(
        <div className="w-[70%] py-[32px] flex flex-col gap-[32px]">
            {tasks.map((task) => (
                <div className="w-full flex flex-col gap-[16px] border-[1px] pb-[16px] rounded-[4px]">
                    <div className="text-[20px] font-medium bg-[#ebe9e5] px-[16px] py-[8px] rounded-[4px]">
                        {task.Title}
                    </div>
                    <div className="px-[16px]">
                        {task.Description}
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
            ))}
        </div>
    );
};

export default Tasks;