import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import ClubInfoBar from "../components/ClubInfoBar";
import Card from "../components/Card";

import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Reply from "../components/Reply";
import Comments from "../components/Comments";

export default function Postopen() {
  const [postData, setPostData] = useState({
    post: []
  });
  const [clubValue, setClubValue] = useState()
  const {id}= useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/post/${id}`);
        console.log("in postopen",response.data);
        setPostData(response.data);
        console.log(response.data);
        setClubValue(response.data.club);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full relative bg-gray-400 overflow-hidden flex flex-row items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="h-fit w-screen flex-1 flex flex-col items-center justify-start gap-[40px] text-left text-xs text-white font-inter lg:flex-1 lg:self-stretch lg:h-auto md:flex-1 sm:flex-1">
        <NavBar />
        { (
          <div className=" flex flex-row items-start justify-between py-0 px-[38px] lg:w-auto lg:[align-self:unset] md:flex-col sm:flex-col sm:gap-[0px] sm:pl-0 sm:pr-0 sm:box-border">
            <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
              <SideNav />
            </div>
            {postData && (
            <div className=" flex flex-row items-start justify-start lg:flex-1">
              <div className=" flex flex-col items-center justify-start gap-[12px_0px] border-[1px] mb-2 rounded-md border-solid border-darkslategray-100 lg:flex-col lg:gap-[12px_0px] md:w-auto md:[align-self:unset] md:flex-col">
                <Card cardInfo={postData}/>
                <Reply />
                <Comments />
              </div>
            </div>
            )}

            <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
            {clubValue && <ClubInfoBar clubInfos={clubValue} />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
