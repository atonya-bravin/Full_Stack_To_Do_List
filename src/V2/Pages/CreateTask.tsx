import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import zod from "zod";

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


//the class that is used to style the form in small screens the vw is 80%, medium is 70% and in large we have 40%
const formClass = "w-[80%] md:w-[70%] lg:w-[40%] py-[32px] border-[1px] flex items-center justify-center px-[32px] rounded-[8px] mt-[16px]";

const CreateTask = () => {
    //linking of zod to the zod object type
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<taskInforType>({resolver: zodResolver(taskInfor)});

    //implementation of a type that reflects the zod object for proper data validation
    type taskInforType = zod.infer<typeof taskInfor>;

  const onSubmit: SubmitHandler<taskInforType> = (/*data*/) => {
    //Navigation to the /Dashboard page when the data is successfuly validated
    window.location.href='/Dashboard';
  };

    return(
        <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="text-[24px] font-medium">Create New Task</div>
            <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
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
        
    );
}

export default CreateTask;