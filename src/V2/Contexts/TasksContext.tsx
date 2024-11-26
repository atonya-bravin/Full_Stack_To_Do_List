import { useState, useContext, Dispatch, SetStateAction, createContext } from "react";

type TaksType = {
    Title: string;
    Description: string;
    Date: Date 
};

type TaskContextType = {
    tasks: TaksType[];
    taskIndex?: number;
    setTasks: Dispatch<SetStateAction<TaksType[]>>;
    setTaskIndex: Dispatch<SetStateAction<number | undefined>>;     
};

const TaskContext = createContext<TaskContextType | undefined>(
    {tasks: [],
    taskIndex: 0,
    setTasks: () => {},
    setTaskIndex: () => {}}
);

export default function TaskInfo({children}: {children: React.ReactNode}){
    const [tasks, setTasks] = useState<TaksType[]>([]);
    const [taskIndex, setTaskIndex] = useState<number>();
    return(
        <TaskContext.Provider value={{tasks, setTasks, taskIndex, setTaskIndex}}>
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

