import React, { useEffect, useState } from 'react';
import { useTheme } from './theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { UserPlus2 } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import Friend from './friend';
import axios from 'axios';

const FriendList = () => {
  const [friendList, setFriendList] = useState(null);
  const { theme } = useTheme();
  const user = JSON.parse(localStorage.getItem('User')!);
  // console.log("Friend list: ",user);

  useEffect(() => {
    const getUserFriends = async () => {
      const response = await axios.get(`http://localhost:3001/user/${user._id}/frineds`);
      // console.log("User friendlist reponse: ",response.data);
      setFriendList(response.data);
    }
    getUserFriends();
  }, []);
  

  return (
    <main className={`bg-gray-200 rounded-xl p-5 shadow-md ${theme === 'dark' && 'bg-slate-700 text-white'}`}>
      <Button variant='link' className='text-2xl font-semibold mb-5'>FriendList</Button>
      <ScrollArea className='h-[500px] overflow-y-auto'>
        {friendList?.map((friend) => (
          <div
            key={friend._id}
            className='flex items-center justify-between py-3 border-t border-r border-l border-b-4 border-gray-300 hover:text-black hover:bg-gray-300 p-2 transition-all rounded-xl mb-3'>
            <Friend friend={ friend } />
          </div>
        ))}
      </ScrollArea>
    </main>
  );
};

export default FriendList;
