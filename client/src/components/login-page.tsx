import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTheme } from "./theme-provider";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from '../state';
import { useEffect, useState } from "react";

const LoginPage = () => {
  const getUserFromLocalStorage = () => {
    const initialUser = localStorage.getItem('User');
    if (initialUser) {
      return JSON.parse(initialUser);
    }
  }
  const [user, setUser] = useState(getUserFromLocalStorage());
  const { theme } = useTheme();
  const dispatch = useDispatch();
  // const { user, setUser } = useUser();
  // const user = useSelector((state) => state.auth.user);
  
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  });

  type loginSchema = z.infer<typeof loginSchema>;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema)
  });
  const token = useSelector((state) => state.token);

  const onSubmit = async (data: loginSchema) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email: data.email,
        password: data.password
      });

      dispatch(setLogin({ user: response.data.user, token: response.data.token }));
      localStorage.setItem('User', JSON.stringify(response.data.user));

      window.location.assign('/');
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("User is: ", user);
    
  }, []);

  return (
    <main className={`flex flex-col sm:flex-row h-screen ${theme === 'dark' && 'bg-slate-800'}`}>
      <div className={`w-full sm:w-1/2 flex flex-col gap-5 justify-center items-center bg-gray-100 p-6 ${theme === 'dark' && 'bg-slate-900'}`}>
        <div className="flex flex-col items-center mt-10">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500 w-10 h-10 flex items-center justify-center text-white text-2xl font-bold rounded-full">e!</span>
              <span className="text-3xl font-bold text-gray-300">Eduzone</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Explore, Share, Learn: Welcome to Eduzone!</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md mt-5 sm:mt-0">
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
          <Button
            disabled={isSubmitting}
            variant='secondary'
            type="submit"
            className="py-2 rounded-md bg-blue-500 text-white w-full hover:text-black hover:rounded-xl transition-all"
          >
            {isSubmitting ? (
              <div className="flex flex-row justify-center items-center gap-2">
                <Loader className="animate-spin"/>
                Logging in.....
              </div>
            ) : (
              <div>Login Now</div>)}
          </Button>
        </form>
        <hr />
        <div className="flex flex-col sm:flex-row items-center">
          <span className="">Don't have an account?</span>        
          <Link to='/register'>
            <Button variant='link'>Sign Up</Button>
          </Link>        
        </div>  
      </div>
      <img src="/login.jpg" alt="" className="w-full sm:w-1/2 object-cover h-full" />
    </main>
  );
};

export default LoginPage;
