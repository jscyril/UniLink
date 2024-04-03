import axios from "../api/axios";
import { useEffect, useState } from "react";


export default function Clubcreate(props){
  const [user, setUser]= useState({});
  const userid = props.modInfo.userid;
  useEffect(()=>{
    const user = async()=>{
      try{
        const response = await axios.get(`/clubmoderator/${userid}`);
        if(response.data){
          setUser(response.data);
          console(response.data);
        }
      } catch(error){
        console.error(error);
      }
    }
    user();
  },[])
  const handleModDelete = async ()=>{
    // logic for deleting the mod
    try{
      const response = await axios.put(
        "/clubcreateupdate",
        props
      );
    }catch(error){
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
        // setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.message);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Request setup error:", error.message);
      }
    }
  }
    return(
        <div key={props.mods} className="self-stretch flex flex-row items-center justify-center py-0.5 px-2 gap-[150px] border-t-[1px] border-solid border-mediumslateblue">
                    <div className="relative">{user.username}</div>
                    <button onClick={handleModDelete} className="cursor-pointer [border:none] p-0 bg-[transparent] w-[16.4px] relative h-[16.4px]">
                      <img
                        className="absolute top-[0px] left-[0px] w-[16.4px] h-[16.4px] object-cover"
                        alt=""
                        src="/mask-group1@2x.png"
                      />
                    </button>
                  </div>
    );
}