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
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

// Zod schema for validation
const taskInfor = zod.object({
  title: zod
    .string()
    .refine((value) => value.length > 0, { message: "Title is required" })
    .refine((value) => value.length <= 64, { message: "Title too long" }),
  description: zod
    .string()
    .refine((value) => value.length > 0, { message: "Description is required" })
    .refine((value) => value.length <= 255, { message: "Description too long" }),
});

const Tasks = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<taskInforType>({ resolver: zodResolver(taskInfor) });

  type taskInforType = zod.infer<typeof taskInfor>;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<taskInforType> = (data) => {
    setTasks(
        tasks.map((task, i) =>
            i === taskIndex
            ? { ...task, Title: data.title, Description: data.description, Date: new Date() }
            : task
        )
    );

    // Reset the tasks list to the currently updated one

    const updateTasks = tasks.map((task, i) =>
        i === taskIndex
        ? { ...task, Title: data.title, Description: data.description, Date: new Date() }
        : task
    );
    
    try {
        // Checking whether local storage is present in the device.
        if (typeof localStorage !== 'undefined'){
            localStorage.setItem("myTasks", JSON.stringify(updateTasks));
        }
    } catch (error) {
        console.error("Error Saving data to local storage", error);
    }
    
    navigate("/Dashboard");
    setEdit(false);

    setEditTask(
      {
        Title: "",
        Description: "",
        Date: new Date
      }
    );

    /*
      Resets the form back to default.
      This fixes the issue of the edit form's persistent data.
    */ 
    reset();
  };

  const { tasks, setTasks, taskIndex, setTaskIndex, editTask, setEditTask } = useTasksContext();

  const handleTaskDeletion = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));

    // Reset the tasks list to the currently updated one

     const updateTasks = tasks.filter((_, i) => i !== index);
    try {
        // Checking whether local storage is present in the device.
        if (typeof localStorage !== 'undefined'){
            localStorage.setItem("myTasks", JSON.stringify(updateTasks));
        }
    } catch (error) {
        console.error("Error Saving data to local storage", error);
    }
  };

  const [edit, setEdit] = useState(false);

  // Define columns for the table
  const columns: ColumnDef<typeof tasks[0]>[] = [
    {
      header: "Title",
      accessorKey: "Title",
    },
    {
      header: "Description",
      accessorKey: "Description",
    },
    {
      header: "Created On",
      accessorKey: "Date",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-[8px]">
          <button
            className="bg-[#3182CE] text-white px-[16px] py-[4px] rounded-[4px] flex flex-row gap-[8px] w-full"
            onClick={() => {
              setEdit(true);
              setTaskIndex(row.index);
              setEditTask({
                Title: tasks[row.index].Title,
                Description: tasks[row.index].Description,
                Date: tasks[row.index].Date
              })
            }}
          >
            <div className="h-full flex justify-center items-center">
                <img src={editIcon} alt="" />
            </div>
            <div className="h-full flex justify-center items-center">EDIT</div>
          </button>
          <button
            className="bg-[#E53E3E] text-white px-[16px] py-[4px] rounded-[4px] flex flex-row gap-[8px] w-full"
            onClick={() => handleTaskDeletion(row.index)}
          >
            <div className="h-full flex justify-center items-center">
                <img src={deleteIcon} alt="" />
            </div>
            <div className="h-full flex justify-center items-center">DELETE</div>
          </button>
        </div>
      ),
    },
  ];

  // Table instance
  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const pageSize = 4;
  const totalPages = Math.ceil(tasks.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1);


  return (
    <>
      <div className="h-full w-[70%] py-[32px]">
        {tasks.length === 0 ? (
          <EmptyDashboard />
        ) : (
          <>
            <table className="table-auto w-full border-collapse border-[1px] border-gray-200">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-gray-100">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="p-[8px] border-[1px]">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-[1px]">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-[8px] border-[1px]">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-[16px]">
              <button
                className="px-[16px] py-[4px] bg-gray-300 rounded-[4px]"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <div>
                Page {currentPage} of {totalPages}
              </div>
              <button
                className="px-[16px] py-[4px] bg-gray-300 rounded-[4px]"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      {edit && (
        <div className="absolute w-full h-full flex items-center justify-center bg-black bg-opacity-10">
          <div className="w-[40%] flex flex-col items-center bg-white rounded-[4px]">
            <form className="w-full px-[16px] py-[32px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="font-medium text-[20px] mb-[16px]">Edit Task</div>
              <div className="w-full flex flex-col gap-[16px]">
                <div>
                  <label className="block font-normal text-[16px] mb-[8px]">Title</label>
                  <input
                    className="w-full py-[8px] px-[8px] border-[1px] rounded-[4px]"
                    {...register("title", { required: true })}
                    defaultValue={editTask?.Title}
                  />
                  {errors.title && <div className="text-[14px] text-[#DB6353]">{errors.title.message}</div>}
                </div>
                <div>
                  <label className="block font-normal text-[16px] mb-[8px]">Description</label>
                  <textarea
                    className="w-full py-[8px] px-[8px] border-[1px] rounded-[4px] resize-none"
                    rows={3}
                    {...register("description", { required: true })}
                    defaultValue={editTask?.Description}
                  />
                  {errors.description && (
                    <div className="text-[14px] text-[#DB6353]">{errors.description.message}</div>
                  )}
                </div>
                <SubmitBtn />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
