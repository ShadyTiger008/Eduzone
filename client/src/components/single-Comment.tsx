// SingleComment.js
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';

type SingleCommentProps = {
  comment: {
    userId: string;
    comment: string;
    userPicturePath?: string;
  };
};

const SingleComment = ({ comment }: SingleCommentProps) => {
  const [postUser, setPostUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${comment?.userId}`);
        setPostUser(response?.data?.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, [comment?.userId]);

  const firstName = postUser?.fullName?.split(" ")[0];
  const lastName = postUser?.fullName?.split(" ")[1];

  return (
    <div className="flex items-start gap-3 p-3 bg-gray-100 text-black rounded-xl shadow-lg">
      <Avatar className='cursor-pointer border'>
        <AvatarImage src={postUser?.picturePath} alt={`@${comment?.userId}`} />
        <AvatarFallback>{firstName?.charAt(0)}{lastName?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-gray-800 font-semibold mb-1 cursor-pointer hover:underline underline-offset-2">
          {postUser?.fullName}
        </p>
        <p className="text-gray-700">{comment?.comment}</p>
      </div>
    </div>
  );
};

export default SingleComment;
