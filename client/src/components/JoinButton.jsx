import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const Joinbutton = ({ clubInfos }) => {
  const [isClicked, setIsClicked] = useState(false);
  const {auth} = useAuth();
  const [userclub, setUserclub] = useState();
  useEffect(() => {
    const usedata = async () => {
      try {
        console.log("in clubinfo");
        const data = {
          userid: auth.user.userId,
          clubid: clubInfos.clubid
        };
        console.log(data);
        const response = await axios.post("/follow", data);
        if (response.data.value) {
          console.log("in clubinfo",response.data);
          setIsClicked(response.data.value);
          setUserclub(response.data.userclub);
        }
      } catch (error) {
        console.log(error);
      }
    };
    usedata();
  },[]);

  const handleClick = async () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
    const data = {
      userid: auth.user.userId,
      clubid: clubInfos.clubid
    };
    if (!isClicked) {
      try {
        const response = await axios.post("/clubmember", data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post("/clubmemberdelete", userclub);
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
          ? "cursor-pointer border-[3px] border-mediumslateblue rounded-12xl flex flex-row items-center justify-center bg-transparent py-0 px-4 "
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

export default Joinbutton;
