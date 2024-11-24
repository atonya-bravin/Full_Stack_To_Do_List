import { useState } from "react";
import logOutIcon from "../../assets/Icons/Logout.svg";

const LargeScreenMenu = () => {
    // This is the method that takes effect on any active menu link
    const activeMenuItemClass = "font-bold border-b-[3px] border-b-black px-[8px]";

    // This is the class that takes effect on any inactive menu links
    const inactiveMenuItemClass = "font-regular border-b-[0px] px-[8px] hover:cursor-pointer";

    // This is a list of the menu Items
    const [menuItems, setMenuItems] = useState([
        { Title: "Dashboard", active: true },
        { Title: "New Task", active: false },
    ]);

    // This is the function that handles the activation and deactivation of links
    const handleLinkActivation = (index: number) => {
        const updatedMenuItems = menuItems.map((menuItem, i) => ({
            ...menuItem,
            active: i === index,
        }));
        setMenuItems(updatedMenuItems);
    };

    return(
        <div className="w-[90%] lg:w-[80%] h-[54px] flex flex-row justify-center items-center border-b-[1px] px-[24px]">
            <div className="text-[24px] font-bold w-full h-full flex items-end">
                Taskly
            </div>
            <div className="flex flex-row items-end w-full h-full">
                <div className="w-full flex flex-row gap-[48px]">
                    {/*  */}
                    {menuItems.map((menuItem, index) => (
                        <div 
                            className={menuItem.active ? activeMenuItemClass : inactiveMenuItemClass}
                            onClick= {() => handleLinkActivation(index) }
                        >
                            {menuItem.Title}
                        </div>
                    ))}
                </div>
                <div
                    className="cursor-pointer flex items-center gap-[8px] justify-center mb-[4px] px-[16px] h-[36px] text-nowrap bg-[#2E4DE6] text-white font-medium rounded-[4px]"
                    onClick={() => {
                        window.location.href="/signIn";
                    }}
                >
                    <div>
                        <img src={logOutIcon} alt="logout"/>
                    </div>
                    <div>Log Out</div>
                </div>
            </div>
        </div>
    );
};

export default LargeScreenMenu;