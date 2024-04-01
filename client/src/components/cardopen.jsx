import { useEffect, useState } from "react"
import axios from "../api/axios"
import { useParams } from "react-router-dom";


export default function cardopen(){
    const {id}= useParams();
    const [postData, setPostData]=useState({});
    useEffect(async()=>{
        try {
            const response = await axios.get(`/post/${id}`);
            if(response.data){
                setPostData=response.data;
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    },[])

    return (
        <div
      key={props.cardInfo.postid}
      className=" flex flex-row items-start justify-start lg:flex-1"
    >
      <div className=" flex flex-col items-center justify-start gap-[12px_0px] border-[1px] mb-2 rounded-md border-solid border-darkslategray-100 lg:flex-col lg:gap-[12px_0px] md:w-auto md:[align-self:unset] md:flex-col">
        <div className=" sm:ml-auto sm:mt-1 w-[794px] box-border flex flex-col items-start justify-center py-0 px-7 gap-[20px] border-solid border-darkslategray-100 lg:self-stretch lg:w-auto md:self-stretch md:w-auto sm:self-stretch sm:w-auto ">
          <div className="self-stretch flex flex-row items-center justify-between">
            <div className="w-auto flex flex-row items-center justify-between">
              <div className="flex flex-row items-center justify-start gap-[14px]">
                <img
                  className="w-10 relative rounded-[50%] h-10 object-cover mt-[5px]"
                  alt=""
                  src={postData.club.clublogo}
                />
                <div className="relative text-nowrap">
                  {postData.club.clubname}
                </div>
              </div>
              <button className="cursor-pointer py-0 px-2.5 bg-[transparent] rounded-7xl overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue relative ml-2 min-w-1">
                <div className="relative text-xs font-inter text-white text-left">
                  {postData.user.username}
                </div>
              </button>
            </div>
            {/* <Button /> */}
          </div>
          <Link to="/post" className=" text-inherit no-underline">
            <h2 className="m-0 relative text-5xl font-normal font-inherit">
              {postData.post.title}
            </h2>
          </Link>
          <div className="self-stretch flex flex-row items-end justify-between text-xs">
            <div className="relative">{postData.post.description}</div>
          </div>
          <div className="relative flex text-xs">
            {getTimeAgo(postData.post.timestamp)}
          </div>

          {postData.post.imagepath && (
            <img
              className="self-stretch relative max-w-full max-h-dvh overflow-hidden flex justify-center align-middle"
              alt=""
              src={postData.post.imagepath}
            />
          )}
          <div className="self-stretch flex flex-row items-center justify-between pt-0 px-0 pb-2">
            <img
              className="w-[30.1px] relative h-[27.6px] object-cover"
              alt=""
              src="/frame-450@2x.png"
            />
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
    )
};