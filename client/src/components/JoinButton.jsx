import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const Button = (props) => {
  const [isClicked, setIsClicked] = useState(false);
  const {auth} = useAuth();

  useEffect(() => {
    const usedata = async()=>{
      try {
        const data = {
          userid: auth.user.userId,
          clubid: props.clubInfo.clubid,
        };
        console.log(auth);
        const response = await axios.post("/follow", data);
        if (response.data.value) {
          setIsClicked(response.data.value);
        }
      } catch (error) {
        console.log(error);
      }
    }
    usedata()
  },[]);
  const handleClick = async () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
    const data = {
      clubid: props.clubInfo.clubid,
      userid: auth.user.userId,
    };
    if(isClicked){
      try {
        const response = await axios.post("/clubmember", data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else{
      try {
        const response = await axios.delete("/clubmember", data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <button
      className={`${
        isClicked
          ? "cursor-pointer border-[3px] border-indigo-600 rounded-12xl flex flex-row items-center justify-center bg-transparent py-0 px-4 "
          : " cursor-pointer [border:none] py-1 px-7 bg-mediumslateblue rounded-12xl flex flex-row items-center justify-center"
      }`}
      onClick={handleClick}>
      <div
        className={`relative text-base font-inter text-left ${
          isClicked ? "text-white" : "text-black"
        }`}>
        {isClicked ? "Joined" : "Join"}
      </div>
    </button>
  );
};

export default Button;
