import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import ClubList from "../components/ClubList";
import EventsBar from "../components/EventBar";
import { useState, useEffect } from "react";
import axios from "../api/axios";
export default function Clubs() {
  const [postValue, setPostValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/clubs");
        setPostValue(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full relative py-20 bg-gray-400 overflow-hidden flex flex-row items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="h-fit w-screen flex-1 flex flex-col items-center justify-start gap-[40px] text-left text-xs text-white font-inter lg:flex-1 lg:self-stretch lg:h-auto md:flex-1 sm:flex-1">
        <NavBar />
        {postValue && (
          <div className=" flex flex-row items-start justify-between py-0 px-[38px] lg:w-auto lg:[align-self:unset] md:flex-col sm:flex-col sm:gap-[0px] sm:pl-0 sm:pr-0 sm:box-border">
            <div
              className="  relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border
"
            >
              <SideNav />
            </div>

            <div className="flex flex-row items-start z-10 justify-start lg:flex-1 sm:w-auto sm:[align-self:unset]">
              <div className="w-[720px] box-border flex  rounded-md flex-col items-center justify-start py-3 px-5 gap-[30px_0px] border-solid border-darkslategray-100 border-[1px] lg:flex-col lg:gap-[30px_0px] md:w-auto md:[align-self:unset] md:flex-col sm:flex-1 sm:pl-0 sm:pr-0 sm:box-border">
                {postValue.map((club) => (
                  <ClubList key={club.clubid} clubInfo={club} />
                ))}
              </div>
            </div>

            <div
              className="  relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border
"
            >
              <EventsBar />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
