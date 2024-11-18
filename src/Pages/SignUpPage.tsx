// This is the sign_up_page that is seen by the user whenever they want to log into the page

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import zod from "zod";
import Logo from "../assets/Logo.png"

//creation of a zod object to be used in data validation
const userInfor = zod.object({
  userName: zod.string().min(6).max(64),
  email: zod.string().email(),
  password: zod.string().min(8).max(64),
});

//implementation of a type that reflects the zod object for proper data validation
type userInforType = zod.infer<typeof userInfor>;

const SignUpPage = () => {
  //linking of zod to the zod object type
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<userInforType>({resolver: zodResolver(userInfor)});

  const onSubmit: SubmitHandler<userInforType> = (data) => {
    //Navigation to the /tasks page when the data is successfuly validated
    window.location.href='/tasks';
  };
  
  //the class that is used to style the form in small screens the vw is 80%, medium is 70% and in large we have 40%
  const formClass = "w-[80%] md:w-[70%] lg:w-[40%] py-[32px] border-[2px] flex items-center justify-center px-[32px] rounded-[8px]";

  return(
    <form className = {formClass} onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col items-center">
        {/* The application logo that is implemented with w-120 and h-120 */}
        <img alt="App Logo" src={Logo} width="120px" height="120px"/>
        <div className="w-full">
          <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
            <label>User Name</label>
            <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]" {...register("userName", {required: true})}/>
            {errors.userName && <div className="text-[14px] text-[#DB6353]">The user name is required</div>}
          </div>
          <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
            <label>Email</label>
            <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]"
              placeholder="example@gmail.com" {...register("email", {required: true})}
            />
            {errors.email && <div className="text-[14px] text-[#DB6353]">The email is required</div>}
          </div>
          <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
            <label>Password</label>
            <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]" type="password" {...register("password",  {required: true})}/>
            {errors.password && <div className="text-[14px] text-[#DB6353]">The password is required</div>}
          </div>
          
          <SubmitBtn />
        </div>
      </div>      
    </form>
  );
};

export default SignUpPage;