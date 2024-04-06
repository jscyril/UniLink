// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import useAuth from "../hooks/useAuth";
// import { useNavigate, useParams } from "react-router-dom";

// export default function AddPost({ handleFile }) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [allowComments, setAllowComments] = useState(false);
//   const [selectedImg, setSelectedImg] = useState();
//   const [options, setOptions] = useState([]); // State to hold the fetched options
//   const { auth } = useAuth();
//   const { id } = useParams();
//   const Navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const postData = new FormData();
//     postData.append("title", title);
//     postData.append("description", description);
//     postData.append("image", selectedImg);
//     postData.append("clubid", parseInt(id));
//     postData.append("userid", auth.user.userId);

//     console.log(selectedImg);
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/addpost`,
//         postData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Data sent to server:", response.data);
//       Navigate(`/club/${id}`);
//     } catch (error) {
//       console.error("Error sending data to server:", error);
//       // Handle error response
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         console.error("Error status:", error.response.status);
//         console.error("Error data:", error.response.data);
//         // setError(error.response.data.message);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No response received:", error.message);
//       } else {
//         // Something happened in setting up the request that triggered an error
//         console.error("Request setup error:", error.message);
//       }
//     }
//   };

//   const hiddenFileInput = useRef(null);
//   const handleClick = (event) => {
//     event.preventDefault();
//     hiddenFileInput.current.click();
//   };

//   const handleImageUpload = async (event) => {
//     event.preventDefault();
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImg(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSelectedImg(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//     console.log(file);
//   };

//   return (
//     <div className="w-[720px] self-stretch h- flex flex-row items-start justify-start lg:flex-1 sm:w-auto sm:[align-self:unset] relative">
//       <div className=" rounded-md self-stretch h-auto flex-1 flex flex-col items-center justify-start py-0 px-5 border-solid border-darkslategray-100 border-[1px] lg:flex-col lg:gap-[30px] md:w-auto md:[align-self:unset] md:flex-col sm:flex-1 sm:pl-0 sm:pr-0 sm:box-border relative">
//         <form onSubmit={handleSubmit}>
//           <div className="self-stretch rounded-lg h-[478.5px] flex flex-col items-center justify-between sm:items-center sm:justify-center relative">
//             <div className="flex flex-col items-start justify-start gap-[15px]">
//               <div className="flex flex-col items-start justify-start gap-[9px]">
//                 <div className="relative font-light sm:text-base mt-2 text-3xl">
//                   Title:
//                 </div>
//                 <input
//                   name="title"
//                   value={title}
//                   onChange={(e) => {
//                     setTitle(e.target.value);
//                   }}
//                   className="[outline:none] bg-gray-700 w-[600px] relative rounded-lg box-border h-10 border-[1px] border-solid border-mediumslateblue text-white"
//                   type="text"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col items-start justify-start gap-[12px]">
//               <div className="relative font-light sm:text-base text-3xl mt-2">
//                 Description:
//               </div>
//               <textarea
//                 className="[outline:none] bg-gray-700 w-[600px] relative rounded-lg box-border h-[130px] border-[1px] border-solid border-mediumslateblue text-white"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col items-start justify-start gap-[22px]">
//               <div className="flex flex-col items-start justify-start gap-[21px]">
//                 <div className="relative font-light sm:text-base text-3xl mt-3">
//                   Images / Videos:
//                 </div>
//                 {selectedImg && (
//                   <div className="mt-4">
//                     <img
//                       src={selectedImg}
//                       alt="Selected"
//                       className="max-w-full h-auto"
//                     />
//                   </div>
//                 )}
//                 <button
//                   onClick={handleClick}
//                   className="cursor-pointer py-2 px-[283px] bg-gray-700 rounded-lg overflow-hidden flex flex-row items-start justify-start border-[1px] border-dashed border-mediumslateblue"
//                 >
//                   <img
//                     className="w-[27px] relative h-[27.5px] object-cover"
//                     alt=""
//                     src="/group-21@2x.png"
//                   />
//                 </button>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   ref={hiddenFileInput}
//                   name="image"
//                   className="hidden"
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="mb-2 cursor-pointer [border:none] py-2.5 px-[119px] bg-mediumslateblue rounded-lg overflow-hidden flex flex-row items-center justify-center sm:items-center sm:justify-center sm:pl-[60px] sm:pr-[60px] sm:box-border"
//             >
//               <div className="relative text-5xl font-medium font-inter text-black text-left sm:text-sm">
//                 Post
//               </div>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";

export default function AddPost({ handleFile }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  const [image, setImage] = useState();
  const [selectedImg, setSelectedImg] = useState();
  const { auth } = useAuth();
  const { id } = useParams();
  const Navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const postData = new FormData();
    postData.append("title", title);
    postData.append("description", description);
    postData.append("image", selectedImg);
    postData.append("clubid", parseInt(id));
    postData.append("userid", auth.user.userId);

    console.log(selectedImg);
    try {
      const response = await axios.post(
        `http://localhost:3000/addpost`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data sent to server:", response.data);
      Navigate(`/club/${id}`);
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
  const handleClick = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      setSelectedImg(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImg(file);
    }
    console.log(file);
  };

  return (
    <div className="rounded-md w-[720px] h-auto flex flex-auto border-solid border-darkslategray-100 border-[1px] flex-col items-start justify-start lg:flex-auto sm:w-auto sm:[align-self:unset] relative">
      <div className=" rounded-md self-stretch flex-auto flex flex-col items-center justify-start py-0 px-5  lg:flex-col lg:gap-[30px] md:w-auto md:[align-self:unset] md:flex-col sm:flex-1 sm:pl-0 sm:pr-0 sm:box-border relative">
        <form onSubmit={handleSubmit}>
          <div className="self-stretch rounded-lg flex flex-auto h-auto flex-col items-center justify-between sm:items-center sm:justify-center relative mb-5">
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
            <div className="flex flex-col items-start justify-start">
              <div className="flex flex-col items-start justify-start ">
                <div className="relative font-light sm:text-base text-3xl mt-3 m-3">
                  Images / Videos:
                </div>
                {image && (
                  <div className="mt-4 flex flex-auto w-full justify-center">
                    <img
                      src={image}
                      alt="Selected"
                      className="max-w-full h-auto flex justify-center"
                    />
                  </div>
                )}
                <button
                  onClick={handleClick}
                  className="cursor-pointer mt-4 py-2 px-[283px] bg-gray-700 rounded-lg overflow-hidden flex flex-row items-start justify-start border-[1px] border-dashed border-mediumslateblue"
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
            <button
              type="submit"
              className="mb-2 cursor-pointer [border:none] py-2.5 px-[119px] bg-mediumslateblue relative top-5 rounded-lg overflow-hidden flex flex-row items-center justify-center sm:items-center sm:justify-center sm:pl-[60px] sm:pr-[60px] sm:box-border"
            >
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
