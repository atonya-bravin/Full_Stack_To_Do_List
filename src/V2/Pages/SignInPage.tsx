// This is the sign_in_page that is seen by the user whenever they want to log into the page

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "../Components/Buttons/SubmitBtn";
import zod from "zod";
import Logo from "../assets/Logo.png"

//creation of a zod object to be used in data validation
const  userInfor = zod.object({
  email: zod
    .string()
    .refine(
      (value) => value.length > 0, 
      { message: "Email is required" }
    )
    .refine(
      /*
        use of regex to check and invalidate anything that;
          - contains more than one @ symbol
          - does not contain any characters after the @ symbol
          - does not contain a dot characters after the characters preceding @symbol
      */
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      { message: "Invalid email format" }
  ),
  password: zod
    .string()
    .refine(
      (value) => value.length > 0,
      { message: "Password is required" }
    )
    .refine(
      /*
        Check to invalidate anything with a length less than 8 or greater than 64
      */
      (value) => value.length >= 8 && value.length <= 64,
      { message: "Password must be between 8 and 64 characters" }
    )
    .refine(
      /*
        Check to invalidate anything without atleast one uppercase
      */
      (value) => /[A-Z]/.test(value),
      { message: "Password must contain at least one uppercase letter" }
    )
    /*
        Check to invalidate anything without atleast one lowercase
    */
    .refine(
      (value) => /[a-z]/.test(value),
      { message: "Password must contain at least one lowercase letter" }
    )
    .refine(
      /*
        Check to invalidate anything without atleast one digit [0-9]
      */
      (value) => /\d/.test(value),
      { message: "Password must contain at least one digit" }
    )
    .refine(
      /*
        Check to invalidate anything without atleast one special character
      */
      (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
      { message: "Password must contain at least one special character" }
  ),
});

//implementation of a type that reflects the zod object for proper data validation
type userInforType = zod.infer<typeof userInfor>;

const SignInPage = () => {
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
  const formClass = "w-[80%] md:w-[70%] lg:w-[40%] py-[32px] border-[1px] flex items-center justify-center px-[32px] rounded-[8px]";

  return(
    <form className={formClass} onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex flex-col items-center">
        {/* The application logo that is implemented with w-120 and h-120 */}
        <img alt="App Logo" src={Logo} width="120px" height="120px"/>

        <div className="w-full">
          <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
            <label className="font-normal text-[16px]">Email</label>
            <input className="py-[8px] px-[8px] border-[1px] rounded-[4px]"
              placeholder="example@gmail.com" {...register("email", {required: true})}
            />
            {errors.email && <div className="text-[14px] text-[#DB6353]">{errors.email.message}</div>}
          </div>
          <div className="flex flex-col gap-[8px] pt-[16px] pb-[8px]">
            <label className="font-normal text-[16px]">Password</label>
            <input className="py-[8px] px-[8px] border-[1px] rounded-[4px]" type="password" {...register("password",  {required: true})}/>
            {errors.password && <div className="text-[14px] text-[#DB6353]">{errors.password.message}</div>}
          </div>

          <div
            className="text-[#0000FF] cursor-pointer"
            onClick={() => {
              window.location.href="/signUp";
            }}
          >
            Don't have an account?
          </div>

          <SubmitBtn />
        </div>
      </div>
    </form>
  );
};

export default SignInPage;