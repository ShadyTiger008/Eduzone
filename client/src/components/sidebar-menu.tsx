import { TbMessagePlus } from "react-icons/tb"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { IoIosNotificationsOutline } from "react-icons/io"
import { BiLogOutCircle } from "react-icons/bi"
import { useTheme } from "./theme-provider"
import { Link, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setLogout } from '../state';
import { useEffect } from "react";
import { LogIn } from 'lucide-react';


const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("User"));
  console.log("Local", user);

  const firstName = user?.firstName?.split(' ')[ 0 ];
  const lastName = user?.firstName?.split(' ')[ 1 ];
  
  const sidebarData = [
  {
    id: 1,
    icon: (
      <Avatar className="border text-white">
        <AvatarImage src={user?.picturePath} alt="User Profile" className="border" />
        <AvatarFallback>{ firstName?.chatAt(0) }{ lastName?.chatAt(0) }</AvatarFallback>
      </Avatar>
    ),
    label: user?.fullName,
    link: "/profile"
  },
  {
    id: 2,
    icon: (<TbMessagePlus className='w-8 h-8'color='violet'/>),
    label: "Conversation",
    link: "/conversation"
  },
  {
    id: 3,
    icon: (<IoIosNotificationsOutline className='w-8 h-8' color='yellow'/>),
    label: "Notification",
    link: "/notification"
  },
]

  
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logout");
    dispatch(setLogout());
    localStorage.clear();
    window.location.reload();
  }
  
  useEffect(() => {
    console.log("User: ", user);
    
  }, [])
  
  return (
    <>
      { user ? (
        <div className={`grid gap-4 py-4 my-10 ${theme === 'dark' && "text-white"}`}>
          {sidebarData.map((item) => {
            return (
              <Link key={item.id} to={item.link} className={`flex flex-row gap-5 items-center border text-white hover:text-black hover:bg-gray-100 px-5 py-2 rounded-xl ${item.link === pathname && "bg-gray-300 text-slate-800"}`}>
                {item.icon}
                <span className='font-semibold'>{item.label}</span>  
              </Link>
            )
          })}
          <div className='flex flex-row gap-5 items-center border cursor-pointer text-white hover:text-black hover:bg-gray-300 px-5 py-2 rounded-xl' onClick={handleLogout}>
            <BiLogOutCircle className='w-8 h-8' color='red'/>
            <span className='font-semibold'>Logout</span>  
          </div>
        </div>
      ) : (
          <div className="rounded-lg p-6 text-center w-full h-full flex justify-center items-center">
            <div className="w-full h-96 flex flex-col justify-center items-center rounded-lg gap-5">
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome!</h2>
                <p className="text-sm sm:text-lg text-gray-300 mb-4">Login now to access the menu.</p>
              </div>
              <Link to='/login' className='flex flex-row gap-5 items-center border cursor-pointer text-white hover:text-black   hover:bg-gray-300 px-5 py-2 rounded-xl' onClick={handleLogout}>
                <LogIn className='w-8 h-8 text-green-400' />
                <span className='font-semibold'>Login</span>  
              </Link>
            </div>
          </div>
      )}
    </>
  )
}

export default Sidebar