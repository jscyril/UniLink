import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function ClubJoinButton(props) {
  const [isClicked, setIsClicked] = useState(false);
  const { auth } = useAuth();
  useEffect(() => {
    const usedata = async () => {
      try {
        const data = {
          userid: auth.user.userId,
          clubid: clubInfo.clubid,
        };
        console.log(clubInfo.clubid);
        const response = await axios.post("/follow", data);
        if (response.data.value) {
          console.log(response.data);
          setIsClicked(response.data.value);
        }
      } catch (error) {
        console.log(error);
      }
    };
    usedata();
  }, []);

  const handleClick = async () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
    const data = {
      clubid: clubInfo.clubid,
      userid: auth.user.userId,
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
          ? "cursor-pointer py-[9px] px-14 bg-[transparent] rounded-full overflow-hidden flex flex-row items-center justify-center border-[1.7px] border-solid border-red-600"
          : "cursor-pointer py-[9px] px-14 bg-[transparent] rounded-full overflow-hidden flex flex-row items-center justify-center border-[1.7px] border-solid border-mediumslateblue"
      }`}
      onClick={handleClick}>
      <div 
      className="relative text-sm font-inter text-left text-slate-200">
        {isClicked ? "Leave CLub" : "Join Club"}
      </div>
    </button>
  );
}
