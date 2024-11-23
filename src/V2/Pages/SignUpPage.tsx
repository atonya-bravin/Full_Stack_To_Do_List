// This is the sign_up_page that is seen by the user whenever they want to log into the page

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import zod from "zod";
import Logo from "../assets/Logo.png"

//creation of a zod object to be used in data validation
const userInfor = zod.object({
  firstName: zod.string().min(6).max(64),
  lastName: zod.string().min(6).max(64),
  phoneNumber: zod.string().min(10).max(10),
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

  const onSubmit: SubmitHandler<userInforType> = (/*data*/) => {
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
          {/* user's names */}
          <div className="flex flex-col md:flex-row gap-[8px] md:gap-[16px] w-full">
            <div className="w-full flex flex-col gap-[8px] pt-[16px] pb-[8px]">
              <label>First Name</label>
              <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]" {...register("firstName", {required: true})}/>
              {errors.firstName && <div className="text-[14px] text-[#DB6353]">First name is required</div>}
            </div>
            <div className="w-full flex flex-col gap-[8px] pt-[16px] pb-[8px]">
              <label>Last Name</label>
              <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]" {...register("lastName", {required: true})}/>
              {errors.lastName && <div className="text-[14px] text-[#DB6353]">Last name is required</div>}
            </div>
          </div>

          {/* User's contact details */}
          <div className="flex flex-col md:flex-row gap-[8px] md:gap-[16px] w-full">
            <div className="w-full flex flex-col gap-[8px] pt-[16px] pb-[8px]">
              <label>Email</label>
              <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]"
                placeholder="example@gmail.com" {...register("email", {required: true})}
              />
              {errors.email && <div className="text-[14px] text-[#DB6353]">The email is required</div>}
            </div>

            <div className="w-full flex flex-col gap-[8px] pt-[16px] pb-[8px]">
              <label>Phone Number</label>
              <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]" {...register("phoneNumber", {required: true})}
              />
              {errors.phoneNumber && <div className="text-[14px] text-[#DB6353]">The email is required</div>}
            </div>
          </div>
          <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
            <label>Password</label>
            <input className="py-[8px] px-[8px] border-[2px] rounded-[4px]" type="password" {...register("password",  {required: true})}/>
            {errors.password && <div className="text-[14px] text-[#DB6353]">The password is required</div>}
          </div>
          
          <div
            className="text-[#0000FF] cursor-pointer"
            onClick={() => {
              window.location.href="/signIn";
            }}
          >
            Already have an account?
          </div>
          <SubmitBtn />
        </div>
      </div>      
    </form>
  );
};

export default SignUpPage;