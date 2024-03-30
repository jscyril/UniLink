import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import Card from "../components/Card";
import EventsBar from "../components/EventBar";
import axios from "../api/axios";
export default function Home() {
  const [postValue, setPostValue] = useState({
    post: [],
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get("/", {
          signal: controller.signal,
        });
        console.log(response);
        if (!response.statusText) {
          throw new Error("Network response was not ok");
        }
        isMounted && setPostValue(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="w-full relative bg-gray-400 overflow-hidden flex flex-row items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="h-fit w-screen flex-1 flex flex-col items-center justify-start gap-[40px] text-left text-xs text-white font-inter lg:flex-1 lg:self-stretch lg:h-auto md:flex-1 sm:flex-1">
        <NavBar />
        {postValue && (
          <div className=" flex flex-row items-start justify-between py-0 px-[38px] lg:w-auto lg:[align-self:unset] md:flex-col sm:flex-col sm:gap-[0px] sm:pl-0 sm:pr-0 sm:box-border">
            <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
              <SideNav />
            </div>

            <div className="lg:flex-row">
              {postValue?.post.map((post) => (
                <Card key={post.postid} cardInfo={post} />
              ))}
            </div>

            <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
              <EventsBar />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
