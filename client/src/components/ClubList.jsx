import { useState, useEffect } from "react";
import Button from "./JoinButton";
import { Link } from "react-router-dom";
import axios from "../api/axios";
export default function ClubList() {
  const [clubValue, setClubValue] = useState({ clubArr: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/clubs");
        setClubValue(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[720px] box-border flex  rounded-md flex-col items-center justify-start py-3 px-5 gap-[30px_0px] border-solid border-darkslategray-100 border-[1px] lg:flex-col lg:gap-[30px_0px] md:w-auto md:[align-self:unset] md:flex-col sm:flex-1 sm:pl-0 sm:pr-0 sm:box-border">
      {clubValue?.clubArr.map((club) => (
        <div
          key={club.clubid}
          className="self-stretch flex flex-col items-center justify-start gap-[20px_0px] lg:w-auto lg:[align-self:unset] p-4 box-content rounded-md border-[1px] border-solid border-darkslategray-100">
          <Link
            to={`/club/${club.clubid}`}
            className="self-stretch flex flex-col items-center justify-start gap-[20px_0px] lg:w-auto lg:[align-self:unset] p-4 box-content rounded-md border-solid border-darkslategray-100">
            <img
              className="w-[400px] relative rounded-full h-[400px] object-cover"
              alt=""
              src={club.clublogo}
            />
          </Link>
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="flex flex-col items-start justify-start gap-[15px_0px]">
              <div className="relative text-3xl font-medium">
                {club.clubname}
              </div>
              <div className="relative ">{club.postcount} Posts</div>
            </div>
            <Button key={club.clubid} clubInfo={club} />
          </div>
        </div>
      ))}
    </div>
  );
}
