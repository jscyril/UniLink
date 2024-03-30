import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Clubmoderation from "../components/Clubmoderation";
import axios from "axios";
export default function ClubModeration() {
  const navigate = useNavigate();
  const [clubList,setClubList] = useState([])

  useEffect(() => {
    // Fetching options from Prisma (you'll need to set up this endpoint in your server)
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clubmoderation");
        setClubList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  return (
    <div className="w-full relative bg-gray-400 overflow-hidden flex flex-col items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="self-stretch h-[1295.7px] flex flex-col items-center justify-start gap-[40px] text-left text-lg text-white font-inter lg:self-stretch lg:w-auto lg:flex-1 md:self-stretch md:w-auto sm:self-stretch sm:w-auto">
        {/* <NavBar /> */}
        <div className="self-stretch flex-1 flex flex-row items-start justify-between py-0 px-[290px] lg:self-stretch lg:w-auto lg:pl-[220px] lg:pr-[220px] lg:box-border md:flex-col md:pl-5 md:pr-5 md:box-border sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
          <div className="flex-1 h-[402.6px] flex flex-row items-start justify-center md:w-auto md:self-stretch md:flex-[unset] sm:flex-[unset] sm:self-stretch">
            <div className="flex-1 flex flex-col items-start justify-start py-7 px-[22px] gap-[18px] border-r-[1px] border-solid border-darkslategray-100 border-l-[1px] lg:flex-1 md:flex-1">
              <button className="cursor-pointer py-0.5 px-2.5 bg-[transparent] rounded overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue">
                <div className="relative text-5xl font-inter text-white text-left">
                  Add Club
                </div>
              </button>
              {clubList?.map((clubs)=>(
                <Clubmoderation key={clubs.clubid} clubInfo={clubs}/>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};


