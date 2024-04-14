import moment from "moment";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Card(props) {
  const isPostPage = location.pathname.includes("/post/");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const isAdmin = auth?.user?.role === "admin";
  const [isMod, SetIsMod] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [postData, setPostData] = useState();
  useEffect(() => {
    const fetchClubData = async () => {
      if (isPostPage && props.cardInfo && props.cardInfo.club) {
        // Added null check for props.cardInfo.club
        const userid = { userid: auth.user.userId };
        try {
          const response = await axios.post(
            `/isMod/${props.cardInfo.club.clubid}`,
            userid
          );
          SetIsMod(response.data.value);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchLike = async () => {
      if (props.cardInfo && props.cardInfo.postid) {
        const data = {
          userid: auth.user.userId,
          postid: props.cardInfo.postid,
        };
        try {
          const check = await axios.post("/isliked", data);
          setIsLiked(check.data.value);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchPostDetails = async () => {
      try {
        if (props.cardInfo && props.cardInfo.postid) {
          const postDataa = await axios.get(`/post/${props.cardInfo.postid}`);
          setPostData(postDataa.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchClubData();
    fetchLike();
    fetchPostDetails();
  }, [isLiked, props.cardInfo]);

  const getTimeAgo = (timestamp) => {
    const postTime = moment(timestamp);
    const now = moment();
    const duration = moment.duration(now.diff(postTime));
    const minutes = Math.floor(duration.asMinutes());
    if (minutes < 1) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      const hours = Math.floor(duration.asHours());
      if (hours < 24) {
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      } else {
        const days = Math.floor(duration.asDays());
        if (days < 7) {
          return `${days} ${days === 1 ? "day" : "days"} ago`;
        } else {
          const weeks = Math.floor(duration.asWeeks());
          return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
        }
      }
    }
  };

  const handleLike = async () => {
    const data = {
      userid: auth.user.userId,
      postid: props.cardInfo.postid,
    };
    if (isLiked === false) {
      const response = await axios.post("/likepost", data);
      setIsLiked(response.data.value);
    } else {
      const response = await axios.post("/unlikepost", data);
      setIsLiked(response.data.value);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(`/postdelete/${props.cardInfo.postid}`);
      navigate(`/club/${props.cardInfo.club.clubid}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      // key={props.cardInfo.postid}
      className=" flex flex-row items-start justify-start lg:flex-1"
    >
      <div className=" flex flex-col items-center justify-start gap-[12px_0px] border-[1px] mb-2 rounded-md border-solid border-darkslategray-100 lg:flex-col lg:gap-[12px_0px] md:w-auto md:[align-self:unset] md:flex-col">
        <div className=" sm:ml-auto sm:mt-1 w-[760px] box-border flex flex-col items-start justify-center py-0 px-7 gap-[20px] border-solid border-darkslategray-100 lg:self-stretch lg:w-auto md:self-stretch md:w-auto sm:self-stretch sm:w-auto ">
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="w-auto flex flex-row items-center justify-between self-stretch md:self-stretch md:w-auto">
              {props.cardInfo.club && (
                <div className="flex flex-row items-center justify-start gap-[14px]">
                  <img
                    className="w-10 relative rounded-[50%] h-10 object-cover mt-[5px]"
                    alt=""
                    src={props.cardInfo.club.clublogo}
                  />
                  <div className="relative text-nowrap">
                    {props.cardInfo.club.clubname}
                  </div>
                </div>
              )}
              <button className="cursor-pointer py-0 px-2.5 bg-[transparent] rounded-7xl overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue relative ml-2 min-w-1">
                <div className="relative text-xs font-inter text-white text-left">
                  {props.cardInfo.user}
                </div>
              </button>
            </div>
            {isPostPage && (isAdmin || isMod) && (
              <div className="flex flex-row items-center justify-start gap-[20px]">
                <Link
                  to={`/editpost/${props.cardInfo.postid}`}
                  className="cursor-pointer"
                >
                  <img
                    className="w-[27.6px] relative h-[27.2px] object-cover"
                    alt=""
                    src="/group-26@2x.png"
                  />
                </Link>
                <div className=" cursor-pointer" onClick={handleDelete}>
                  <img
                    className="w-[31.6px] relative h-[31.6px] object-cover"
                    alt=""
                    src="/mask-group@2x11.png"
                  />
                </div>
              </div>
            )}
          </div>
          <Link
            to={`/post/${props.cardInfo.postid}`}
            className="self-stretch flex flex-col items-start justify-start gap-[20px] text-5xl no-underline text-white cursor-default"
          >
            <h2 className="m-0 relative text-5xl font-normal font-inherit">
              {props.cardInfo.title}
            </h2>
            <div className="self-stretch flex flex-row items-end justify-between text-xs">
              <div className="relative">{props.cardInfo.description}</div>
            </div>
            <div className="relative flex text-xs">
              {getTimeAgo(props.cardInfo.timestamp)}
            </div>

            {props.cardInfo.imagepath && (
              <img
                className="self-stretch relative max-w-full max-h-dvh overflow-hidden flex justify-center align-middle"
                alt=""
                src={props.cardInfo.imagepath}
              />
            )}
          </Link>
          <div className="self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-2">
            <button
              onClick={handleLike}
              className="cursor-pointer border-none p-0 bg-transparent flex items-center text-white"
            >
              {isLiked ? (
                <img
                  className="w-[30.1px] h-[27.6px] object-cover"
                  alt=""
                  src="/vector1.svg"
                />
              ) : (
                <img
                  className="w-[30.1px] h-[27.6px] object-cover"
                  alt=""
                  src="/frame-450@2x.png"
                />
              )}
              {postData && <span className="ml-2">{postData.postlikes}</span>}
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[35px] relative h-[33.2px]">
              <img
                className="absolute top-[0px] left-[0px] w-[30px] h-[28.4px] object-cover"
                alt=""
                src="/postdivpostdivpostactionsbuttoncomment@2x.png"
              />
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[21px] relative h-[29px]">
              <img
                className="absolute top-[14.1px] left-[0px] max-w-full overflow-hidden h-[14.1px] object-contain"
                alt=""
                src="/line-9@2x.png"
              />
              <img
                className="absolute top-[0px] left-[6.1px] max-w-full overflow-hidden h-[28.3px] object-contain"
                alt=""
                src="/line-10@2x.png"
              />
              <img
                className="absolute top-[18.2px] left-[12.1px] max-w-full overflow-hidden h-[10.1px] object-contain"
                alt=""
                src="/line-11@2x.png"
              />
              <img
                className="absolute top-[8.1px] left-[18.2px] max-w-full overflow-hidden h-[20.2px] object-contain"
                alt=""
                src="/line-12@2x.png"
              />
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[25.5px] relative h-[17.3px]">
              <img
                className="absolute top-[0px] left-[0px] w-[25.5px] h-[17.3px] object-contain"
                alt=""
                src="/postdivpostdivpostactionsbuttonshare@2x.png"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
