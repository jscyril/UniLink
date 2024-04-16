import { useState, useEffect } from "react";
import Button from "./JoinButton";
import { Link } from "react-router-dom";
import axios from "../api/axios";
export default function ClubList(props) {
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
    <div
      key={props.clubInfo.clubid}
      className="self-stretch flex flex-col items-center justify-start gap-[20px_0px] lg:w-auto lg:[align-self:unset] p-4 box-content rounded-md border-[1px] border-solid border-darkslategray-100"
    >
      <Link
        to={`/club/${props.clubInfo.clubid}`}
        className="self-stretch flex flex-col items-center justify-start gap-[20px_0px] lg:w-auto lg:[align-self:unset] p-4 box-content rounded-md border-solid border-darkslategray-100"
      >
        <img
          className="w-[400px] relative rounded-full h-[400px] object-cover"
          alt=""
          src={props.clubInfo.clublogo}
        />
      </Link>
      <div className="self-stretch flex flex-row items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-[15px_0px]">
          <div className="relative text-3xl font-medium">
            {props.clubInfo.clubname}
          </div>
          <div className="relative ">{props.clubInfo.postcount} Posts</div>
        </div>
        <Button key={props.clubInfo.clubid} clubInfos={props.clubInfo} />
      </div>
    </div>
  );
}
