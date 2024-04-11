import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function EditPostComponent() {
  const { auth } = useAuth();
  let { id } = useParams();
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImg, setSelectedImg] = useState();
  const [imagepath, setImagepath] = useState("");
  const [postValue, setPostValue] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/post/${id}`);
        if (response.statusText) {
          setPostValue(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setImagepath(response.data.imagepath);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setSelectedImg(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagepath(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImg(file);
    }
    console.log(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append("title", title);
    postData.append("description", description);
    postData.append("image", selectedImg);
    postData.append("clubid", postValue.club.clubid);
    postData.append("userid", auth.user.userId);

    try {
      const response = await axios.patch(
        `http://localhost:3000/editpost/${id}`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data sent to server:", response.data);
      Navigate(`/post/${id}`);
    } catch (error) {
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
  };

  return (
    <div className="flex flex-col h-auto items-start justify-center py-0 px-7 gap-[20px] border-b-[1px] lg:self-stretch lg:w-auto md:self-stretch md:w-auto sm:self-stretch sm:w-auto">
      <div className="w-[720px] flex flex-row h-auto items-start justify-start lg:flex-1 sm:w-auto sm:[align-self:unset]">
        <div className=" rounded-md flex-1 flex flex-col h-auto items-center justify-start py-0 px-5 border-solid border-darkslategray-100 border-[1px] lg:flex-col lg:gap-[30px] md:w-auto md:[align-self:unset] md:flex-col sm:flex-1 sm:pl-0 sm:pr-0 sm:box-border">
          <div className="self-stretch flex flex-row py-3 items-center justify-between text-xl md:self-stretch md:w-auto">
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-row items-center justify-center gap-[14px]">
                <img
                  className="w-10 relative rounded-[50%] h-10 object-cover"
                  alt=""
                  src={postValue?.club?.clublogo}
                />
                <div className="relative">{postValue?.club.clubname}</div>
                <button className="cursor-pointer py-0 px-2.5 bg-[transparent] rounded-7xl overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue">
                  <div className="relative text-xs font-inter text-white text-left">
                    {postValue?.user}
                  </div>
                </button>
              </div>
            </div>
            <button className="cursor-pointer [border:none] py-0 px-[30px] bg-mediumslateblue rounded-7xl overflow-hidden flex flex-row items-center justify-center">
              <div
                onClick={handleSubmit}
                className="relative text-base font-inter text-black text-left"
              >
                Done
              </div>
            </button>
          </div>
          <form>
            <div className="self-stretch rounded-lg h-auto flex flex-col items-center justify-between sm:items-center sm:justify-center">
              <div className="flex flex-col items-start justify-start gap-[15px]">
                <div className="flex flex-col items-start justify-start gap-[9px]">
                  <div className="relative font-light sm:text-base mt-2 text-3xl">
                    Title:
                  </div>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="[outline:none] bg-gray-700 w-[600px] relative rounded-lg box-border h-10 border-[1px] border-solid border-mediumslateblue text-white"
                    type="text"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start gap-[12px]">
                <div className="relative font-light sm:text-base text-3xl mt-2">
                  Description:
                </div>
                <textarea
                  className="[outline:none] bg-gray-700 w-[600px] relative rounded-lg box-border h-[130px] border-[1px] border-solid border-mediumslateblue text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {postValue?.imagepath && (
                <img
                  className="self-stretch relative max-w-full overflow-hidden py-3 min-h-screen h-screen object-contain"
                  alt=""
                  src={imagepath}
                />
              )}
              <div className="flex flex-col items-start justify-start gap-[22px]">
                <div className="flex flex-col items-start justify-start gap-[21px]">
                  <div className="relative font-light sm:text-base text-3xl mt-3">
                    Images / Videos:
                  </div>
                  <button
                    onClick={handleClick}
                    className="cursor-pointer py-2 px-[283px] bg-gray-700 rounded-lg overflow-hidden flex flex-row items-start justify-start border-[1px] border-dashed border-mediumslateblue"
                  >
                    <img
                      className="w-[27px] relative h-[27.5px] object-cover"
                      alt=""
                      src="/group-21@2x.png"
                    />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={hiddenFileInput}
                    name="image"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="self-stretch flex flex-row items-center justify-between py-6">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[34.1px] relative h-[31.2px]">
              <img
                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                alt=""
                src="/vector1.svg"
              />
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[35px] relative h-[33.2px]">
              <img
                className="absolute top-[0px] left-[0px] w-[35px] h-[33.2px] object-cover"
                alt=""
                src="/postdivpostdivpostactionsbuttoncomment@2x.png"
              />
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[18.2px] relative h-[28.3px]">
              <img
                className="absolute top-[14.1px] left-[0px] max-w-full overflow-hidden h-[14.1px] object-contain"
                alt=""
                src="/line-91@2x.png"
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
