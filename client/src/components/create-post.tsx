import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Edit3, Image, LinkIcon, LoaderIcon, MicIcon, VideoIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const postOptions = [
  {
    id: 1,
    icon: (<Image color='violet' size={20} />),
    label: "Image"
  },
  {
    id: 2,
    icon: (<VideoIcon color='red' size={20} />),
    label: "Clip"
  },
  {
    id: 3,
    icon: (<LinkIcon color='orange' size={20} />),
    label: "Attachement"
  },
  {
    id: 4,
    icon: (<MicIcon color='pink' size={20} />),
    label: "Audio"
  },
]

const CreatePost = ({ user }) => {
  const firstName = user?.fullName?.split(' ')[0];
  const lastName = user?.fullName?.split(' ')[1];
  const [values, setValues] = useState({ picture: null });
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toggleInput, setToggleInput] = useState(false); 
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (acceptedFiles: any) => {
    setUploading(true);
    setValues({ picture: acceptedFiles[0] });

    const data = new FormData();
    data.append('file', acceptedFiles[0]); // Ensure you're appending the file, not the entire values object
    data.append("upload_preset", 'eduzone');
    data.append('cloud_name', 'ddcpocb6l');

    fetch('https://api.cloudinary.com/v1_1/ddcpocb6l/image/upload', {
        method: 'POST',
        body: data
    }).then((response) => response.json()).then((data) => {
      setImageUrl(data?.url)
      // console.log(data?.url);
    });
    // console.log(imageUrl);
    setUploading(false);
    
  };

  const handlePost = async () => {
    setIsLoading(true)
    if (user) {
      try {
        const response = await axios.post('http://localhost:3001/posts', {
          userId: user?._id,
          description: description,
          picturePath: imageUrl
        })
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setDescription("");
        setImageUrl(null);
        setIsLoading(false);
      }
      
    } else {
      console.log("Login now to make a post");
    }
  }

  // useEffect(() => {
  //   console.log(user?._id)

  // }, []);
  
  return (
    <main className='bg-gradient-to-b from-slate-500 to-slate-700 p-5 flex flex-col gap-6 rounded-3xl shadow-md'>
      <div className='flex flex-row items-center gap-4'>
        <Link to='/profile'>
          <Avatar className='border text-white'>
            <AvatarImage src={user?.picturePath} alt="@shadcn" />
            <AvatarFallback>{ firstName?.charAt(0) }{ lastName?.charAt(0) }</AvatarFallback>
          </Avatar>
        </Link>
        <Input
          placeholder="What's on your mind?"
          className='w-full h-12 rounded-full text-lg text-slate-200 bg-transparent border-2 border-slate-300 px-4 focus:outline-none focus:border-blue-500'
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
            console.log(e.target.value); // Log the updated value directly from the event
          }}
        />
      </div>
      <hr />
      {toggleInput && (
        <>
          <Dropzone onDrop={onDrop} disabled={uploading}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="border-2 border-dashed p-5 text-white cursor-pointer">
                {uploading ? (
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <LoaderIcon className="animate-spin" />
                    <span>Uploading....</span>
                  </div>
                  ) : !values.picture ? (
                      <>
                        <Input {...getInputProps()} />
                        <p>Add your content here</p>
                      </>
                  ) : (
                    <div className="flex flex-row justify-between px-5 items-center">
                      <h1>{values?.picture?.name}</h1>
                      <Edit3 />
                    </div>
                  )
                }
              </div>
            )}
          </Dropzone>
      <hr />
        </>
      )}
      <div className='flex flex-row justify-between items-center px-2 sm:px-4 -mt-3 w-full'>
        {postOptions.map((option) => (
          <Button onClick={() => setToggleInput(!toggleInput)} key={option.id} variant='link' className='flex items-center gap-2 text-sky-400'>
            {option.icon}
            <span className='hidden sm:block'>{option.label}</span>
          </Button>
        ))}
        <Button variant='secondary'
          disabled={isLoading && uploading}
          className='bg-blue-500 text-white rounded-full px-4 sm:px-8 py-1 sm:py-3 hover:bg-blue-600 transition duration-300 ease-in-out'
          onClick={handlePost}
        >
          {isLoading ? "Posting...." : "Post"}
        </Button>
      </div>
    </main>
  );
};

export default CreatePost;
