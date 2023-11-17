import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Edit3, LoaderIcon } from "lucide-react";
import axios from "axios";
import Dropzone from 'react-dropzone';
// import { setLogin } from 'state';
import { useState } from "react";

const Registerpage = () => {
  const [values, setValues] = useState({ picture: null });
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { theme } = useTheme();

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
    }).then((response) => response.json()).then((data) => setImageUrl(data?.url));
    console.log(imageUrl);
    setUploading(false);
    
  };
  
  const signupSchema = z.object({
    fullname: z.string().min(3, {
      message: "Please enter your name!"
    }),
    username: z.string().min(3, {
      message: "Please enter your username!"
    }),
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    cpassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    profession: z.string().min(2, {
      message: "Profession must be at least 2 characters.",
    }),
    location: z.string().min(2, {
      message: "Location must be at least 2 characters.",
    }),
  }).refine(data => data.password === data.cpassword, {
    message: "Confirm Password and Password must be the same",
    path: ["cpassword", "password"],
  })

  type SignupSchema = z.infer<typeof signupSchema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema)
  });

const onSubmit = async (data: SignupSchema) => {
  try {
    console.log("Form data: ", data);
    const response = await axios.post('http://localhost:3001/auth/register', {
      fullName: data.fullname,
      userName: data.username,
      email: data.email,
      password: data.password,
      location: data.location,
      occupation: data.profession,
      picturePath: imageUrl,
    });

    console.log("Response:", response);

    if (response.status === 201) {
      console.log("User registered: ", response);
      window.location.assign('/login');
      reset();
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <main className={`flex flex-col sm:flex-row min-h-screen  ${theme === 'dark' && 'bg-zinc-950'}`}>
      <div className={`w-full sm:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-10 gap-2 ${theme === 'dark' && 'bg-gray-900'}`}>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 w-10 h-10 flex items-center justify-center text-white text-2xl font-bold rounded-full">e!</span>
              <span className="text-3xl font-bold text-gray-300">Eduzone</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Explore, Share, Learn: Welcome to Eduzone!</p>
          </div>
        </div>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md">
          <Input
            type="text"
            placeholder="Your Full Name"
            {...register('fullname')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.fullname && (
            <p>{`${errors.fullname.message}`}</p>
          )}
          <Input
            type="text"
            placeholder="Your username"
            {...register('username')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.username && (
            <p>{`${errors.username.message}`}</p>
          )}
          <Input
            type="email"
            placeholder="Your email address"
            {...register('email')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.email && (
            <p>{`${errors.email.message}`}</p>
          )}
          <Input
            type="password"
            placeholder="Your password"
            {...register('password')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.password && (
            <p>{`${errors.password.message}`}</p>
          )}
          <Input
            type="password"
            placeholder="Your Confirm password"
            {...register('cpassword')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.cpassword && (
            <p>{`${errors.cpassword.message}`}</p>
          )}
          <Input
            type="text"
            placeholder="Your profession name"
            {...register('profession')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.profession && (
            <p>{`${errors.profession.message}`}</p>
          )}
          <Input
            type="text"
            placeholder="Your location"
            {...register('location')}
            className="p-2 border border-gray-300 focus:outline-none w-full rounded-md"
          />
          {errors.location && (
            <p>{`${errors.location.message}`}</p>
          )}
          <Dropzone onDrop={onDrop} disabled={uploading}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="border-2 border-dashed p-5 text-white">
                {uploading ? (
                  <div className="flex flex-row gap-2 justify-center items-center">
                    <LoaderIcon className="animate-spin" />
                    <span>Uploading....</span>
                  </div>
                  ) : !values.picture ? (
                      <>
                        <Input {...getInputProps()} />
                        <p>Add picture here</p>
                      </>
                  ) : (
                    <div className="flex flex-row justify-between px-5 items-center">
                      <h1>{values.picture.name}</h1>
                      <Edit3 />
                    </div>
                  )
                }
              </div>
            )}
          </Dropzone>
          <Button
            disabled={isSubmitting}
            variant='secondary'
            type="submit"
            className="py-2 rounded-md bg-blue-500 text-white w-full hover:text-white hover:rounded-xl transition-all"
          >
            {isSubmitting ? (
              <div className="flex flex-row gap-2 justify-center items-center">
                <LoaderIcon className="animate-spin"/>
                Signing in.....
              </div>
            ) : (
              <div className="text-white">Signup Now</div>)}
          </Button>
        </form>
        <hr />
        <div className="flex flex-row items-center">
            <span>Already have an account?</span>        
            <Link to='/login'>
                <Button variant='link'>Signin</Button>           
            </Link>        
        </div>  
      </div>
      <img src="/login.jpg" alt="" className="w-full sm:w-1/2 object-cover" />
    </main>
  );
};

export default Registerpage;
