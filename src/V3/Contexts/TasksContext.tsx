import { useState, useContext, Dispatch, SetStateAction, createContext } from "react";

type TaksType = {
    Title: string;
    Description: string;
    Date: Date 
};

type TaskContextType = {
    tasks: TaksType[];
    taskIndex?: number;
    editTask?: TaksType;
    setTasks: Dispatch<SetStateAction<TaksType[]>>;
    setTaskIndex: Dispatch<SetStateAction<number | undefined>>; 
    setEditTask: Dispatch<SetStateAction<TaksType | undefined>>; 
};

const TaskContext = createContext<TaskContextType | undefined>(
    {
        tasks: [],
        taskIndex: 0,
        editTask: {Title: "", Description: "", Date: new Date},
        setTasks: () => {},
        setTaskIndex: () => {},
        setEditTask: () => {}
    }
);

export default function TaskInfo({children}: {children: React.ReactNode}){
    //Retrival of the saved data and installation into the context
    const storedTasks = localStorage.getItem("myTasks");
    const [tasks, setTasks] = useState<TaksType[]>(storedTasks ? JSON.parse(storedTasks) : []);
    const [taskIndex, setTaskIndex] = useState<number>();
    const [editTask, setEditTask] = useState<TaksType>();
    return(
        <TaskContext.Provider value={{tasks, setTasks, taskIndex, setTaskIndex, editTask, setEditTask}}>
            {children}
        </TaskContext.Provider>
    );
};

export function useTasksContext() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTasksContext must be used within a TaskInfo provider.");
    }

    return context;
}

