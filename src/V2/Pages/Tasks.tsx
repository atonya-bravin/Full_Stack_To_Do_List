import editIcon from "../assets/Icons/edit.svg";
import deleteIcon from "../assets/Icons/delete.svg";
import { useTasksContext } from "../Contexts/TasksContext";
import EmptyDashboard from "./EmptyDashboard";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import zod from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//creation of a zod object to be used in data validation
const taskInfor = zod.object({
    title: zod
    .string()
    .refine(
        /* 
        Treating this field as required field by checking its length an raising an
        error on any thing with a length equal to or less than 0 
        */
        (value) => value.length > 0,
        { message: "Title is required" }
    )
    .refine(
        /*
        Checking to invalidate anything with a length more than 64 characters.
        */
        (value) => value.length <= 64,
        { message: "First name too long" }
    ),
    description: zod
    .string()
    .refine(
        (value) => value.length > 0,
        { message: "Description is required" }
    )
    .refine(
        (value) => value.length <= 255,
        { message: "Description is more than 255 characters" }
    )
});


const Tasks = () => {
    //linking of zod to the zod object type
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<taskInforType>({resolver: zodResolver(taskInfor)});

    //implementation of a type that reflects the zod object for proper data validation
    type taskInforType = zod.infer<typeof taskInfor>;

    //implementation of a navigator to ensure no re-fresh on navigation
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<taskInforType> = (data) => {

        // Edit the task on a particular index
        setTasks(tasks.map((task, i) => 
            i === taskIndex 
                ? { ...task, Title: data.title, Description: data.description, Date: new Date() }
                : task
        ));

        //Navigation to the /Dashboard page when the data is successfuly validated
        navigate('/Dashboard');


        // set the edit value to false so as the edit container can be hidden
        setEdit(false);
    };

    //use of the useTasksContext to access the tasks
    const {tasks, setTasks, taskIndex, setTaskIndex} = useTasksContext();

    const handleTaskDeletion = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // state that will manage the visibility of the edit task container
    const [edit, setEdit] = useState(false);
    return(
        <>
            <div className="h-full w-[70%] py-[32px] flex flex-col gap-[32px] relative">
                {tasks.length === 0 ? <EmptyDashboard /> : 
                tasks.map((task, index) => (
                    <div key={index} className="w-full flex flex-col gap-[16px] border-[1px] pb-[16px] rounded-[4px]">
                        <div className="text-[18px] font-medium bg-[#ebe9e5] px-[16px] py-[8px] rounded-[4px]">
                            {task.Title}
                        </div>
                        <div className="px-[16px]">
                            {task.Description}
                        </div>
                        <div className="w-full flex flex-row px-[16px]">
                            <div className="w-full text-[14px] text-[#6B7280] flex items-center">
                                Created On: {(new Date(task.Date)).toLocaleDateString()}
                            </div>
                            <div className="flex flex-row gap-[32px] justify-end px-[16px]">
                                <div className="px-[16px] py-[4px] flex justify-center items-center font-medium bg-[#E53E3E] text-white rounded-[4px]">
                                    <div className="flex flex-row gap-[8px]">
                                        <div className="h-full flex justify-center items-center">
                                            <img src={deleteIcon} alt="" />
                                        </div>
                                        <div className="font-medium text-white"
                                            onClick={() => {
                                                handleTaskDeletion(index);
                                            }}
                                        >DELETE</div>
                                    </div>
                                </div>
                                <div className="px-[16px] py-[4px] justify-center items-center bg-[#3182CE] rounded-[4px]">
                                    <div className="flex flex-row gap-[8px]">
                                        <div className="h-full flex justify-center items-center">
                                            <img src={editIcon} alt="" />
                                        </div>
                                        <div className="font-medium text-white"
                                            onClick={() => {
                                                setEdit(true);
                                                setTaskIndex(index);
                                            }}
                                        >EDIT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={
                    "absolute w-full h-full flex items-center justify-center bg-black bg-opacity-10 " +
                    (!edit ? "hidden" : "block")
                }
            >
                <div className="w-[40%] flex flex-col items-center align-center bg-white rounded-[4px]">
                        <form className="w-full px-[16px] py-[32px] flex items-center flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="font-medium text-[20px]">Edit Task</div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-full">
                                    <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
                                        <label className="font-normal text-[16px]">Title</label>
                                        <input className="py-[8px] px-[8px] border-[1px] rounded-[4px]" {...register("title", {required: true})} />
                                        {errors.title && <div className="text-[14px] text-[#DB6353]">{errors.title.message}</div>}
                                    </div>
                                    <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
                                        <label className="font-normal text-[16px]">Description</label>
                                        <textarea 
                                            className="py-[8px] px-[8px] border-[1px] rounded-[4px] resize-none overflow-hidden" 
                                            rows={3} 
                                            {...register("description", { required: true })}
                                        />
                                        {errors.description && <div className="text-[14px] text-[#DB6353]">{errors.description.message}</div>}
                                    </div>
                                    <SubmitBtn />
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        </>
    );
};

export default Tasks;