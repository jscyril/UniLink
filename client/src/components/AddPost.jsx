import { useState, useRef } from "react";
import axios from "axios";

export default function AddPost({handleFile}) {
  // const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  
  // const maxNumber = 69;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = {
      title,
      description,
      allowComments,
      imagepath:""
    };
    
    try {
      const response = await axios.post(
        "http://localhost:3000/addpost",
        postData
      );
      console.log("Data sent to server:", response.data);
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
  
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
  };

  return (
    <div className="w-[720px] flex flex-row items-start justify-start lg:flex-1 sm:w-auto sm:[align-self:unset]">
      <div className=" rounded-md flex-1 flex flex-col items-center justify-start py-0 px-5 border-solid border-darkslategray-100 border-[1px] lg:flex-col lg:gap-[30px] md:w-auto md:[align-self:unset] md:flex-col sm:flex-1 sm:pl-0 sm:pr-0 sm:box-border">
        <form onSubmit={handleSubmit}>
          <div className="self-stretch rounded-lg h-[478.5px] flex flex-col items-center justify-between sm:items-center sm:justify-center">
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
            <div className="flex flex-col items-start justify-start gap-[12px]">
              <div className="relative font-light sm:text-base text-3xl mt-2">
                Description:
              </div>
              <input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="[outline:none] bg-gray-700 w-[600px] relative rounded-lg box-border h-[130px] border-[1px] border-solid border-mediumslateblue  text-white"
                type="text"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[22px]">
              <div className="flex flex-col items-start justify-start gap-[21px]">
                <div className="relative font-light sm:text-base text-3xl mt-3">
                  Images / Videos:
                </div>
                <button onClick={handleClick} className="cursor-pointer py-2 px-[283px] bg-gray-700 rounded-lg overflow-hidden flex flex-row items-start justify-start border-[1px] border-dashed border-mediumslateblue">
                  <img
                    className="w-[27px] relative h-[27.5px] object-cover"
                    alt=""
                    src="/group-21@2x.png"
                  />
                </button>
                <input
                  type="file"
                  onChange={handleChange}
                  ref={hiddenFileInput}
                  style={{ display: "none" }}/>
              </div>
              <div className="flex flex-row items-end justify-center gap-[8px] text-base">
                <input
                  name="allowComments"
                  checked={allowComments}
                  onChange={(e) => setAllowComments(e.target.checked)}
                  className="m-0 w-5 relative box-border h-5 border-[2px] border-solid border-mediumslateblue"
                  type="checkbox"
                />
                <div className="relative sm:text-xs">Allow Comments</div>
              </div>
            </div>
            <button
              type="submit"
              className="mb-2 cursor-pointer [border:none] py-2.5 px-[119px] bg-mediumslateblue rounded-lg overflow-hidden flex flex-row items-center justify-center sm:items-center sm:justify-center sm:pl-[60px] sm:pr-[60px] sm:box-border">
              <div className="relative text-5xl font-medium font-inter text-black text-left sm:text-sm">
                Post
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
