import { useState, useContext, Dispatch, SetStateAction, createContext } from "react";

type TaksType = {
    Title: string;
    Description: string;
    Date: Date 
};

type TaskContextType = {
    tasks: TaksType[];
    setTasks: Dispatch<SetStateAction<TaksType[]>>;      
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export default function TaskInfo({children}: {children: React.ReactNode}){
    const [tasks, setTasks] = useState<TaksType[]>([]);
    return(
        <TaskContext.Provider value={{tasks, setTasks}}>
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

