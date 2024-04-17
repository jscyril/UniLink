import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useClubStore from "../store/dataStore";
import { useParams, useLocation } from "react-router-dom";
import axios from "../api/axios";

export default function ClubInfoBar() {
  const { id } = useParams();
  const location = useLocation();
  const [clubInfos, setClubInfos] = useState();
  const [isClicked, setIsClicked] = useState(false);
  const { auth } = useAuth();
  const [userclub, setUserclub] = useState();
  const { updateClubMembership, fetchClubs } = useClubStore();
  useEffect(() => {
    let paramLocation;
    if (location.pathname.includes("post")) {
      paramLocation = "post";
    } else if (
      location.pathname.includes("club") ||
      location.pathname.includes("create")
    ) {
      paramLocation = "club";
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`/${paramLocation}/${id}`);
        if (response.statusText) {
          setClubInfos(response.data.club);
          const data = {
            userid: auth.user.userId,
            clubid: response.data.club.clubid,
          };
          try {
            const response = await axios.post("/follow", data);
            if (response.statusText) {
              setIsClicked(response.data.value);
              setUserclub(response.data.userclub);
              updateClubMembership(auth.user.userId, data.clubid); // Update club membership in Zustand store
            }
          } catch (error) {
            console.error(error.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [id, isClicked, location.pathname]);

  const handleClick = async () => {
    const data = {
      userid: auth.user.userId,
      clubid: clubInfos.clubid,
    };
    if (isClicked === false) {
      try {
        const response = await axios.post("/clubmember", data);
        await updateClubMembership(auth.user.userId, clubInfos.clubid);
        setIsClicked((prevIsClicked) => !prevIsClicked);
        setUserclub(response.data.userclub);
        await fetchClubs();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post("/clubmemberdelete", userclub);
        await updateClubMembership(data.userid, data.clubid);
        setIsClicked((prevIsClicked) => !prevIsClicked);
        await fetchClubs(); // Update club membership in Zustand store
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className=" fixed flex flex-col items-start justify-start gap-[15px_0px] text-13xl lg:hidden">
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
            {isClicked ? "Leave Club" : "Join Club"}
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
