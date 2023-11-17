import {
  Check,
  Edit3,
  LinkedinIcon,
  LucideBriefcase,
  MapPinIcon,
  TwitterIcon,
  UserCogIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTheme } from "./theme-provider";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";

const UserProfile = ({ user, setUser }: any) => {
  // console.log(user);
  
  const [toggleTwitterInput, setToggleTwittterInput] = useState(false);
  const [toggleLinkedinInput, setToggleLinkedinInput] = useState(false);
  const [twitterInput, setTwitterInput] = useState(" ");
  const [linkedinInput, setLinkedinInput] = useState(" ");
  const [updatedUser, setUpdatedUser] = useState(user);
  const { theme } = useTheme();

  const firstName = user?.fullName?.split(' ')[0];
  const lastName = user?.fullName?.split(' ')[1];

  const twitterHandle = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/user/updateTwitterHandle/${user?._id}`, {
        twitterHandle: twitterInput
      });
      // console.log(response.data);
      setUser(response.data);
      // console.log();
      
      setTwitterInput("");
      // console.log(updatedUser.twitterHandle);
      
      setToggleTwittterInput(false);
    } catch (error) {
      console.log(error);
    }
  }

  const linkedinHandle = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/user/updateLinkedinHandle/${user?._id}`, {
        linkedinHandle: linkedinInput
      });
      // console.log("Response ",response.data);
      setUser(response.data);
      // console.log("Update User: ",updatedUser);
      
      setLinkedinInput("");
      setToggleLinkedinInput(false);
      // console.log(response.data?.linkedinHandle);
      
    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    // console.log(updatedUser?.email);
    const getNewUser = async () => {
      const newUser = await axios.get(`http://localhost:3001/user/${user._id}`);
      // console.log("New User: ",newUser.data.user);
      setUpdatedUser(newUser?.data?.user)
    }
    getNewUser();
  }, []);

  const slicedWord = (word: string) => {
    return word.slice(0, 25);
  }

  return (
    <>
      {user ? (
        <main className={`flex flex-col gap-2 p-5 shadow-lg rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
          <section className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-3">
              <Link to='/profile'>
                <Avatar className="border">
                  <AvatarImage src={user?.picturePath} alt="User Image" />
                  <AvatarFallback>{firstName?.charAt(0) }{ lastName?.charAt(0) } </AvatarFallback>
                </Avatar>
              </Link>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{user?.fullName}</h1>
                <span className="text-sm text-gray-400">{user?.friends?.length} friends</span>
              </div>
            </div>
            <Link to='/profile'>
              <UserCogIcon className="text-blue-500 cursor-pointer" />
            </Link>
          </section>
          <hr className="my-4 border-t border-gray-300" />
          <section className="flex flex-col gap-3">
            <div className="flex flex-row gap-3 items-center">
              <MapPinIcon className="text-slate-500" />
              <span>{user?.location}</span>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <LucideBriefcase className="text-slate-500" />
              <span>{user?.occupation}</span>
            </div>
          </section>
          <hr className="my-4 border-t border-gray-300" />
          <section className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span>Who's viewed your profile</span>
              <span className="text-blue-500">{user?.viewedProfile}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Impressions of your post</span>
              <span className="text-blue-500">{user?.impressions}</span>
            </div>
          </section>
          <hr className="my-4 border-t border-gray-300" />
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Social Profiles</h2>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 h-12">
                <TwitterIcon className="text-blue-400 fill-blue-400" />
                <div>
                  <h4 className="text-lg font-semibold">Twitter</h4>
                  {toggleTwitterInput ? (
                    <div className="flex flex-row gap-3">
                      <Input type="text"
                        placeholder="Enter your twitter handle"
                        className="w-full h-5 rounded-xl"
                        value={twitterInput}
                        onChange={(e) => setTwitterInput(e.target.value)}
                      />
                      <Check className="text-green-500 cursor-pointer" onClick={twitterHandle}/>
                    </div> 
                  ) : (
                    <>
                      {updatedUser?.twitterHandle === null ? (
                        <h4 className="text-sm">Social Network</h4>
                        ) : (
                            <span>{slicedWord(updatedUser?.twitterHandle)}.....</span>
                        )}
                    </>
                  )}
                </div>
              </div>
              <Edit3 className="text-blue-500 cursor-pointer"
                onClick={() => setToggleTwittterInput(!toggleTwitterInput)} />
            </div>
            <div className="flex justify-between items-center h-12 my-2">
              <div className="flex items-center gap-3">
                <LinkedinIcon className="text-blue-400" />
                <div>
                  <h4 className="text-lg font-semibold">LinkedIn</h4>
                  {toggleLinkedinInput ? (
                      <div className="flex flex-row gap-3 items-center">
                          <Input
                              type="text"
                              placeholder="Enter your LinkedIn handle"
                              className="w-full h-5 rounded-xl"
                              value={linkedinInput}
                              onChange={(e) => setLinkedinInput(e.target.value)}
                          />
                          <Check className="text-green-500 cursor-pointer" onClick={linkedinHandle} />
                      </div>
                  ) : (
                      <>
                          {updatedUser?.linkedinHandle === null ? (
                              <h4 className="text-sm">Social Network</h4>
                          ) : (
                              <span>{slicedWord(updatedUser?.linkedinHandle)}.....</span>

                          )}
                      </>
                  )}
              </div>

              </div>
              <Edit3 className="text-blue-500 cursor-pointer"
                onClick={() => setToggleLinkedinInput(!toggleLinkedinInput)} />
            </div>
          </section>
        </main>
      ) : (
        <main className={`flex flex-col gap-5  p-5 shadow-xl rounded-xl justify-center items-center text-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <h1 className={`text-3xl font-bold ${theme === 'dark' ? "text-gray-300" : "text-gray-800"}`}>Welcome!</h1>
          <p className="text-lg text-gray-400">Please sign in to access your profile.</p>
          <Link to="/login" className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-bold mt-4 transition duration-300 ease-in-out">
            Login Now
          </Link>
        </main>
      )}
    </>
  );
};

export default UserProfile;
