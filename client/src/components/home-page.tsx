import UserProfile from './user-profile'
import WeatherBox from './weather-box'
import CreatePost from './create-post'
import PostWall from './post-wall'
import Featured from './featured'
import FriendList from './friend-list'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '../../Context';
import { useSelector } from 'react-redux';


const Homepage = ({user, setUser}: any) => {
  const getUserFromLocalStorage = () => {
    const initialUser = localStorage.getItem('User');
    if (initialUser) {
      return JSON.parse(initialUser)
    }
  }
  // const [user, setUser] = useState(getUserFromLocalStorage());
  // useEffect(() => {
  // const fetchAllPosts = async () => {
  //   const response = await axios.get('http://localhost:3001/posts');
  //   console.log("All Posts: ",response);
    
  // }
  // console.log("User: ",user);
  // }, []);

  

  return (
    <div className="flex flex-col sm:flex-row justify-between px-3 py-5 space-y-10 sm:space-y-0">
        <section className="flex flex-col gap-5 w-full sm:w-1/4">
        <UserProfile user={user} setUser={setUser} />
          <WeatherBox user={user} />
        </section>
        <section className="flex flex-col gap-5 w-full sm:w-[48%]">
          <CreatePost user={user} />
          <PostWall />
        </section>
        <section className="flex flex-col gap-5 w-full sm:w-1/4">
          <Featured />
          <FriendList />
        </section>
      </div>
  )
}

export default Homepage