import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserMinus2, UserPlus2 } from 'lucide-react'
import axios from 'axios'


const Friend = ({ friend }) => {
  const [singleFriend, setSingleFriend] = useState(null);

  const firstName = singleFriend?.fullName?.split(' ')[0];
  const lasttName = singleFriend?.fullName?.split(' ')[1];

  useEffect(() => {
    // console.log("Friends id:", friend._id);
    
    // console.log("single friend: ", friend);
    const getFriendData = async () => {
      const response = await axios.get(`http://localhost:3001/user/${friend?._id}`);
      // console.log("Single freidn", response.data.user);
      setSingleFriend(response.data.user);
    }
    getFriendData();
  }, []);

 const handleAddFriend = async (postUserId) => {
    try {
      const user = JSON.parse(localStorage.getItem('User')!);
      // console.log(user._id, postUserId);
      
      const response = await axios.patch(`http://localhost:3001/user/${user._id}/${postUserId}`);
      console.log("Friend Added: ", response.data);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  return (
    <>
      <div className='flex items-center gap-4'>
        <Avatar className='cursor-pointer border'>
          <AvatarImage src={singleFriend?.picturePath} alt='@shadcn' />
          <AvatarFallback>{firstName?.charAt(0)}{ lasttName?.charAt(0) }</AvatarFallback>
        </Avatar>
        <div className='flex flex-col cursor-pointer'>
          <h3 className='text-lg font-semibold'>
            {singleFriend?.fullName || `${singleFriend?.firstName} ${singleFriend?.lastName}`}
          </h3>
          <span className='text-sm'>{singleFriend?.location}</span>
        </div>
      </div>
      <UserMinus2 className='w-6 h-6 text-red-500 cursor-pointer hover:text-red-700'
        onClick={() => handleAddFriend(singleFriend?._id)} />
    </>
  )
}

export default Friend