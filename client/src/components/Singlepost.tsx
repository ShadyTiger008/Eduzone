import { useEffect, useState } from 'react';
import { HeartIcon, Loader2Icon, MessageCircleIcon, Share2Icon, Trash2Icon, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useTheme } from './theme-provider';
import axios from 'axios';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import SingleComment from './single-Comment';
import toast from 'react-hot-toast';
import PostSkeleton from './post-skeleton';

const SinglePost = () => {
  const [posts, setPosts] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    setPageLoading(true);
    const getAllPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
        // console.log("Post response is: ", response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Error getting posts!")
      } finally {
          setPageLoading(false);
      }
    };
    getAllPosts();
  }, []);
  const user = JSON.parse(localStorage.getItem('User')!);

  const handleAddFriend = async (postUserId: string) => {
    try {
      console.log(user._id, postUserId);
      
      const response = await axios.patch(`http://localhost:3001/user/${user._id}/${postUserId}`);
      // console.log("Friend Added: ", response.data);
      toast.success("Friend Added Successfully!");
    } catch (error) {
      console.error("Error adding friend:", error);
      toast.error("Friend Added Error!");
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const response = await axios.patch(`http://localhost:3001/posts/${postId}/like`, {
        userId: user._id
      });
      // console.log("Liked data: ",response.data);
      toast.success("Like added successfully!")
    } catch (error) {
      console.log(error);
      toast.error("Error adding like");
    }
  }

  const addComment = async (postId: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`http://localhost:3001/posts/addComment/${postId}`, {
        userId: user._id,
        comment: comment
      });
      console.log("Added data: ",response.data);
      setComment(" ");
      toast.success("Comment added successfully!")
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error adding comment!")
    }
  }

   const handleShare = (postId) => {
    if (navigator.share) {
      navigator.share({
        title: 'Share Post',
        text: 'Check out this post!',
        url: `${window.location.href}`,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Sharing is not supported in your browser.');
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3001/posts/deletePost/${postId}`);
      console.log(response);
      window.location.reload();
      toast.success("Post deleted successfully!")
    } catch (error) {
        console.log(error);
        toast.error("Error deleting post!")
    }
  }

  return (
    <>
      {pageLoading ? (
        <PostSkeleton/>
      ) : (
        posts?.map((post: any) => (
        <main key={post?._id} className={`flex flex-col gap-4 bg-gray-200 p-5 rounded-xl ${theme === 'dark' && 'bg-slate-700'}`}>
          <div className='flex flex-row justify-between items-center'>
            <div className='flex gap-3 items-center'>
              <Avatar>
                <AvatarImage src={post?.userPicturePath} alt="@shadcn" />
                <AvatarFallback className='border'>{ post?.firstName?.charAt(0) }{ post?.lastName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <h3 className='text-xl font-semibold'>
                  {post?.fullName || `${post?.firstName} ${post?.lastName}`}
                </h3>
                <span className='text-xs'>{post.location}</span>
              </div>
            </div>
            {user?._id === post?.userId ? (
              <Trash2Icon className='text-red-500 hover:text-red-700 cursor-pointer'
                onClick={() => deletePost(post?._id)} />
              ) : (
                <UserPlus className='text-blue-500 hover:text-blue-700 cursor-pointer'
                  onClick={() => handleAddFriend(post.userId)} />
            )}
          </div>
          <span>{post?.description}</span>
          <div>
            <img src={`${post?.picturePath}`} alt="" className='w-full rounded-lg object-cover' />
          </div>
          <div className='flex flex-row justify-between px-2'>
            <div className='flex gap-4'>
              <div className='flex items-center gap-2' onClick={() => handleLike(post._id)}>
                <HeartIcon size={20} className='cursor-pointer'/>
                <span>{Object.keys(post?.likes).length}</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost">
                    <div className='flex items-center gap-2'>
                      <MessageCircleIcon size={20} className='cursor-pointer'/>
                      <span>{post?.comments.length}</span>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Comment</DialogTitle>
                    <DialogDescription>
                      Add your comment now. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap- py-4">
                    <div className="grid items-center gap-4">
                      <Input
                        id="name"
                        placeholder="What's in your mind?"
                        // defaultValue="What's in your mind?"
                        className="col-span-3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit"
                      disabled={loading}
                      className='border rounded-xl bg-white hover:bg-slate-300 text-black'
                      onClick={() => addComment(post?._id)}
                      >
                      {loading ? (
                        <div className='flex flex-row gap-3 justify-center items-center'>
                          <Loader2Icon />
                          <span>Adding Comment...</span>
                        </div>
                      ) : "Comment Now"}
                    </Button>
                  </DialogFooter>
                  <ScrollArea className="h-80 w-full rounded-md border">
                    <div className="p-4">
                      <h4 className="mb-4 text-sm font-medium leading-none">All Comments</h4>
                      <div className='flex flex-col gap-2'>
                        {post?.comments.map((comment, index) => (
                          <div key={index} className="text-sm">
                            <SingleComment comment={comment} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
            <Share2Icon size={24} className='cursor-pointer'
              onClick={() => handleShare(post?._id)} />
          </div>
        </main>
      ))
      )}
      
    </>
  );
};

export default SinglePost;
