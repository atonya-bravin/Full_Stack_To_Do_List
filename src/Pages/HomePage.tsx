import Logo from "../assets/Logo.png"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    //assignment of the useNavigate() hook to an easy to use name ease for navigation implementation
    const navigate = useNavigate();

    return(
        //The home_page Container 90% of vw in small screens, 70% in medium screens and 60% in large screens
        <div className="w-[90%] md:w-[70%] lg:w-[60%] h-full">
            <div className="w-full h-full flex flex-col gap-[16px] items-center justify-center text-center">
                {/* Application logo, imported as Logo used with w-180 and h-180 */}
                <img alt="logo" src={Logo} width="180px" height="180px" />
                <div>
                    Taskly is your all-in-one to-do list app designed to help you stay organized and boost your 
                    productivity. Whether you're managing daily tasks, planning projects, or keeping track of 
                    personal goals, Taskly makes it easy to prioritize and stay on top of everything. 
                    Let's get things done, one task at a time!
                </div>
                <div className="w-full flex flex-col md:flex-row  gap-[24px] md:gap-[40px] md:px-[64px] mt-[24px] md:mt-[32px]">
                    {/* signUp Button */}
                    <div 
                        className="py-[16px] w-full rounded-[4px] border-[2px] bg-[#ebe9e5] hover:bg-white font-medium"
                        onClick={() => {
                            //Navigation to the sign_up_page using the ref to useNavigate hook formulated earlier
                            navigate('/signUp')
                        }}
                    >
                        Sign Up
                    </div>

                    {/* signIn Button */}
                    <div 
                        className="py-[16px] w-full rounded-[4px] border-[2px] font-medium bg-black hover:bg-white text-white hover:text-black"
                        onClick={() => {
                            //Navigation to the sign_in_page using the ref to useNavigate hook formulated earlier
                            navigate('/signIn')
                        }}
                    >
                        Sign In
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;