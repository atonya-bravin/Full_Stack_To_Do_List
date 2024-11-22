import { useState } from "react";

// Importation of the Icons to be used within the task screen buttons
import Check from "../assets/Icons/check.svg";
import Cancel from "../assets/Icons/Cancel.svg";
import Edit from "../assets/Icons/edit.svg";
import Delete from "../assets/Icons/delete.svg";


const TaskPage = () => {
    // a string array that holds all of the tasks yet to be completed
    const [tasks, setTasks] = useState<string[]>([]);

    // a string array that holds all of the tasks that have been completed
    const [completedTasks, setCompleted] = useState<string[]>([]);

    /* 
        this is a string variable that is used to hold the string that the user types
        as their task before it is posted to the list of incomplete tasks.
    */
    const [myTask, setMyTask] = useState<string>("");

    /* 
        This is a boolean variable that is used to make the editing of tasks possible
        It is used in the following instances:
            1. Changing the "Add Item" Button text to "Edit Button"
            2. Filtering out the item being edited from the incomplete tasks list.
            3. Populating the text of the task being edited in the edit text box.
    */
    const [editMode, setEditMode] = useState<boolean>(false);


    // This is the function that handles the completion of tasks
    const handleCompletion = (index: number) => {
        // Inclustion of the task in the completed tasks list
        setCompleted([...completedTasks, tasks[index]]);

        // filetering out the task from the incomplete tasks list
        setTasks(tasks.filter((_, i) => i !== index));
    }

    // This is the function that handles the deletion of tasks
    const handleDeletion = (index: number, status: string) => {
        /* 
            checks the status of the task the performs one of the following
                1. if status is complete: filters it out from the completed tasks list
                2. if status is incomplete: filters it out from the incomplete tasks list
        */
        if(status == "incomplete")
            setTasks(tasks.filter((_, i) => i !== index));
        else
            setCompleted(completedTasks.filter((_, i) => i !== index));
    }

    /*
        This is the function that handles cancelations
        one instance where this function is useful is the case where the user clicks
        the completed button on a task opposed to their instension. They can use the cancel button
        that when clicked reacts with a call to this function.
    */
    const handleCancel = (index: number) => {
        // filter the task from the completed tasks list
        setCompleted(completedTasks.filter((_, i) => i !== index));

        // Inclusion of the task to the incomplete tasks list
        setTasks([...tasks, completedTasks[index]]);
    }

    // This function is handles task editing
    const handleEdit = (index: number) => {
        if(!editMode){
            setTasks(tasks.filter((_, i) => i !== index));
            setEditMode(true);
            setMyTask(tasks[index]);
        }
    }

    /* 
        This function handles key pressing in that, it checks on any keypress whether the key is the
        enter key and if so, includes the task to the list of incomplete tasks
    */
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(event.key == "Enter"){
            setTasks([myTask, ...tasks]);
            setMyTask("");

            // change of the edit mode value back to false to ensure the text is back to "Add Item"
            if(editMode)
                setEditMode(false);
        }
    }

    return(
        <div className="relative w-full h-full flex flex-col items-center pt-[32px]">
            <div className="w-[50%] py-[16px] flex flex-col gap-[24px]">
                {tasks.map((task, index) => (
                    <div className="w-full py-[16px] px-[16px] rounded-[4px] bg-[#ebe9e5] bg-opacity-40 flex flex-row">
                        <div className="w-full h-full">
                            {task}
                        </div>
                        <div className="h-full flex flex-row gap-[32px] items-center">
                            {/* Completed Button */}
                            <div
                                onClick={()=>{
                                    handleCompletion(index);
                                }}  
                            >
                                <img alt="" src={Check} />
                            </div>

                            {/* Edit Button */}
                            <div
                                onClick={() => {
                                    handleEdit(index);
                                }}
                            >
                                <img alt="" src={Edit} />
                            </div>

                            {/* Delete Button */}
                            <div
                                onClick={() => {
                                    handleDeletion(index, "incomplete");
                                }}
                            >
                                <img alt="" src={Delete} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {completedTasks.length >= 1 && (
                <div className="w-[50%] py-[16px] flex flex-col gap-[24px] mt-[32px]">
                    <div className="w-full py-[16px] px-[16px] bg-[#2E4DE6] bg-opacity-80 text-white font-medium text-center rounded-[4px]">
                        Completed
                    </div>
                    {completedTasks.map((task, index) => (
                        <div className="w-full py-[16px] px-[16px] rounded-[4px] bg-[#ebe9e5] bg-opacity-40 flex flex-row">
                        <div className="w-full h-full">
                            {task}
                        </div>
                        <div className="h-full flex flex-row gap-[32px]">
                            {/* Completed Button */}
                            <div
                                onClick={() => {
                                    handleCancel(index);
                                }}
                            >
                                <img alt="" src={Cancel} />
                            </div>
                            
                            {/* Delete Button */}
                            <div
                                onClick={() => {
                                    handleDeletion(index, "complete");
                                }}
                            >
                                <img alt="" src={Delete} />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
            <div className="absolute bottom-[32px] w-full flex flex-row items-center justify-center gap-[32px]">
                <input 
                    className="w-[40%] border-[2px] py-[8px] px-[16px] rounded-[4px]"
                    placeholder="Try Typing your Item"
                    value={myTask}
                    onChange={(e)=>{
                        setMyTask(e.target.value);
                    }}
                    // Set up for the key press listener that checks for the Enter key
                    onKeyDown={handleEnter}
                />
                <div 
                    className="px-[16px] py-[8px] rounded-[4px] font-medium bg-[#2E4DE6] bg-opacity-80 text-white"
                    onClick={() => {
                        setTasks([myTask, ...tasks]);
                        setMyTask("");
                        // change of the edit mode value back to false to ensure the text is back to "Add Item"
                        if(editMode)
                            setEditMode(false);
                    }}
                >
                    {/* 
                        use to interchange between the "Add Item" and "Edit Item" texts depending on
                        the value of edit mode
                    */}
                    {editMode ? "Edit Item" : "Add Item"}
                </div>
            </div>
        </div>
    );
};

export default TaskPage;