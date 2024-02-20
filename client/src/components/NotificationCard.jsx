import Notifications from "../components/Notifications"
import { useEffect, useState } from "react";

export default function NotificationCard(){
  const [postValue, setPostValue] = useState({
    clubs: [],
    eventBar: {},
    post: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPostValue(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

    return(
      
        <div  className=" flex flex-row items-start justify-start lg:flex-1 md:self-stretch md:w-auto ">
            <div  className="w-[834px] rounded-lg box-border flex flex-col items-center justify-start py-4 px-5 gap-[12px_0px]  lg:flex-1 lg:flex-col lg:gap-[12px_0px] md:w-auto md:[align-self:unset] md:flex-col border-[1px] border-solid border-darkslategray-100">
              <div className="self-stretch flex flex-row items-start justify-center py-0 px-4 gap-[0px_12px] text-5xl">
                <img
                  className="w-8 relative h-[27.6px] overflow-hidden shrink-0 object-cover"
                  alt=""
                  src="../public/side-nav-bardivoptionsbuttonannouncementsicon@2x.png"
                />
                <h3 className="m-0 self-stretch flex-1 relative text-inherit font-normal font-inherit">
                  Announcements
                </h3>
              </div>
              {postValue?.post.map((post) => (
                <Notifications key={post.id} cardInfo={post} />
              ))}
            </div>
          </div>
              
            
    );
}