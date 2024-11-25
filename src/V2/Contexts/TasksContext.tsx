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
    const [tasks, setTasks] = useState<TaksType[]>([
        {
            Title: "Washing The Bathroom",
            Description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat deleniti dolorum, illo voluptatibus error, soluta tempore impedit asperiores repudiandae voluptatem dolorem est magnam ex ab assumenda. Officia provident quis consequatur.",
            Date: new Date(2024,11,1)
        },
        {
            Title: "Reading The Bible",
            Description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. ",
            Date: new Date(2024,4,23)
        }]);
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

