import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function ClubInfoBar({ clubInfos }) {
  const [isClicked, setIsClicked] = useState(false);
  const { auth } = useAuth();
  const [userclub, setUserclub] = useState()
;  useEffect(() => {
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
  }, []);

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
    <div className="flex flex-col items-start justify-start gap-[15px_0px] text-13xl lg:hidden">
      <div className="w-[260px] flex flex-col items-start justify-start py-0 px-[18px] box-border">
        <h2 className="m-0 w-[222px] relative text-inherit font-normal font-inherit inline-block">
          {clubInfos?.clubname}
        </h2>
        <div className="flex flex-row items-end justify-center gap-[0px_12px] text-sm text-mediumslateblue">
          <img
            className="w-6 relative h-6 object-cover"
            alt=""
            src="/club-info-card-divclubcarddivclubheadingdivmembersicon@2x.png"
          />
          <div className="relative">{clubInfos?.members} Members</div>
        </div>
      </div>
      <img
        className="self-stretch relative rounded-full max-w-full overflow-hidden h-[260px] shrink-0 object-cover"
        alt=""
        src={clubInfos?.clublogo}
      />
      <div className="w-[260px] flex flex-col items-center justify-center py-0 px-[13px] box-border gap-[15px_0px] text-sm">
        <div className="w-[233px] relative inline-block">
          {clubInfos?.clubdesc}
        </div>
        <button
          className={`${
            isClicked
              ? "cursor-pointer py-[9px] px-14 bg-[transparent] rounded-full overflow-hidden flex flex-row items-center justify-center border-[1.7px] border-solid border-red-600"
              : "cursor-pointer py-[9px] px-14 bg-[transparent] rounded-full overflow-hidden flex flex-row items-center justify-center border-[1.7px] border-solid border-mediumslateblue"
          }`}
          onClick={handleClick}>
          <div className="relative text-sm font-inter text-left text-slate-200">
            {isClicked ? "Leave CLub" : "Join Club"}
          </div>
        </button>
      </div>
      {/* <div className="w-[260px] flex flex-col items-start justify-start py-0 px-[30px] box-border gap-[10px_0px] text-base">
      <div className="relative">Clubs Guidelines:</div>
      <ul className="m-0 font-inherit text-inherit pl-[21px]">
      <li className="mb-0">Lorem ipsum</li>
      <li className="mb-0">Lorem ipsum</li>
      <li className="mb-0">Lorem ipsum</li>
      <li>Lorem ipsum</li>
      </ul>
    </div> */}
    </div>
  );
}
