import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Clubcreate from "../components/clubcrreate";
import axios from "axios";

export default function ClubCreateupdate() {
  const navigate = useNavigate();
  const [clubname, setClubname] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [mod, setMod] = useState("");
  const [modlist, setModlist]=useState([]);

  useEffect(() => {
    // Fetching options from Prisma (you'll need to set up this endpoint in your server)
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/clubcreateupdate");
        setModlist(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const clubData = {
      clubname,
      description,
      rules,
      clublogo:""
    }
    try{
      const response = await axios.post(
        "http://localhost:3000/clubcreateupdate",
        clubData
      );
      console.log("Data sent to server:", response.data);
    }catch (error){
      console.error("Error sending data to server:", error);
      // Handle error response
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
    console.log("Form submitted!", clubname, description, rules);
  };

  const handleAddMod = async () =>{
    try{
      const response = await axios.post(
        "http://localhost:3000/addmod",
        mod
      );
      console.log("Data sent to server:", response.data);
    }catch(error){
      console.error("Error sending data to server:", error);
      // Handle error response
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
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };
  return (
    <div className="w-full relative bg-gray-400 overflow-hidden flex flex-col items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="self-stretch h-[1295.7px] flex flex-col items-center justify-start gap-[40px] text-left text-5xl text-white font-inter lg:self-stretch lg:w-auto lg:flex-1 md:self-stretch md:w-auto sm:self-stretch sm:w-auto">
        {/* <NavBar /> */}
        <div className="self-stretch flex-1 flex flex-row items-start justify-between py-0 px-[21px] lg:w-auto lg:[align-self:unset] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
          <div className="flex-1 flex flex-col items-center justify-start py-7 px-[420px] lg:flex-1 md:flex-[unset] md:self-stretch sm:flex-[unset] sm:self-stretch">
            <form onSubmit={handleSubmit} className="self-stretch flex flex-col items-start justify-center py-3 px-6 gap-[34px] border-r-[1px] border-solid border-darkslategray-100 border-l-[1px]">
              <div className="self-stretch flex flex-row items-center justify-start gap-[25px]">
                <div className="relative">Clubname:</div>
                <input
                  className="[outline:none] bg-[transparent] flex-1 relative rounded-sm box-border h-[42px] border-[1px] border-solid border-mediumslateblue text-white"
                  type="text"
                  value={clubname}
                  onChange={(e) => setClubname(e.target.value)}
                />
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-[10px]">
                <div className="relative">Description:</div>
                <textarea 
                  className="bg-[transparent] [outline:none] flex-1 relative rounded-sm box-border h-[79px] border-[1px] border-solid border-mediumslateblue text-white" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-[76px]">
                <div className="relative">Rules:</div>
                <textarea 
                  className="bg-[transparent] [outline:none] flex-1 relative rounded-sm box-border h-[79px] border-[1px] border-solid border-mediumslateblue text-white" 
                  value={rules} 
                  onChange={(e) => setRules(e.target.value)}
                />
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-[24px]">
                <div className="relative">Club Logo:</div>
                <button onClick={handleClick} className="cursor-pointer py-1.5 px-[60px] bg-[transparent] rounded-sm flex flex-col items-center justify-start border-[1px] border-solid border-mediumslateblue">
                  <img
                    className="w-[27px] relative h-[27.5px] object-cover"
                    alt=""
                    src="/frame-523@2x.png"
                  />
                </button>
                <input
                  type="file"
                  onChange={handleChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                />
              </div>
              <div className="self-stretch flex flex-row items-center justify-center gap-[31px]">
                <div className="relative">Add Mod:</div>
                <input
                  className="[outline:none] bg-[transparent] flex-1 relative rounded-sm box-border h-[42px] border-[1px] border-solid border-mediumslateblue text-white"
                  type="text"
                  value={mod}
                  onChange={(e) => setMod(e.target.value)}
                />
                <button onClick={handleAddMod} className="cursor-pointer py-1 px-2.5 bg-[transparent] rounded-8xs flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue">
                  <div className="relative text-base font-inter text-mediumslateblue text-left">
                    Add
                  </div>
                </button>
              </div>
              <div className="self-stretch flex flex-col items-start justify-center py-0 pr-0 pl-[147px] text-lg">
                <div className="flex flex-col items-start justify-start">
                  {modlist?.map((mods)=>(
                    <Clubcreate key={mods.userid} />
                  ))}
                </div>
              </div>
              <button type="submit" className="cursor-pointer py-1 px-2.5 bg-[transparent] rounded-8xs flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue">
                <div className="relative text-5xl font-inter text-mediumslateblue text-left">
                  Create
                </div>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

