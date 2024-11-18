import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitBtn from "./Buttons/SubmitBtn";
import zod from "zod";

//creation of a zod object to be used in data validation
const userInfor = zod.object({
  userName: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8).max(64),
});

type userInforType = zod.infer<typeof userInfor>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<userInforType>({resolver: zodResolver(userInfor)});

  const onSubmit: SubmitHandler<userInforType> = (data) => console.log(data);

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>User Name</label>
      <input defaultValue="Enter User Name" {...register("userName", {required: true})}/>
      {errors.email && <span>The user name is required</span>}
      <label>Email</label>
      <input defaultValue="example@gmail.com" {...register("email", {required: true})}/>
      {errors.email && <span>The email is required</span>}
      <label>Password</label>
      <input type="password" {...register("password",  {required: true})}/>
      {errors.password && <span>The password is required</span>}
      <SubmitBtn />
    </form>
  );
};

export default SignUpForm;