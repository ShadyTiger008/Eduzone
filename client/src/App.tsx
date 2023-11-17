import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header"
import Homepage from "./components/home-page";
import { useTheme } from "./components/theme-provider"
import Loginpage from "./components/login-page";
import Registerpage from "./components/register-page";
import Profile from "./components/profile";
import Conversation from "./components/conversation";
import Notification from "./components/notification";
import { useState } from "react";
import { Toaster } from 'react-hot-toast';

function App() {
  const getUserFromLocalStorage = () => {
    const initialUser = localStorage.getItem('User');
    if (initialUser) {
      return JSON.parse(initialUser)
    }
  }
  const [user, setUser] = useState(getUserFromLocalStorage());
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const pathName = pathname.split('/')[1]; 
  // console.log(pathName);

  const inLoginPage = pathName.includes('login');
  const inSigninPage = pathName.includes('register');
  
  return (
    <main className={`${theme === 'dark' && "bg-zinc-950 text-white"} min-h-screen`}>
      <Toaster/>
      {!inLoginPage && !inSigninPage && (
        <Header  user={ user} />
      ) }
      <Routes>
        <Route path='/' element={<Homepage user={ user } setUser={setUser} />} />
        <Route path='/login' element={<Loginpage/>} />
        <Route path='/register' element={<Registerpage/>} />
        <Route path='/profile' element={<Profile user={ user } />} />
        <Route path='/conversation' element={<Conversation/>} />
        <Route path='/notification' element={<Notification/>} />
      </Routes>
    </main>
  )
}

export default App
