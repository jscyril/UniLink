import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function ClubCreate() {
  let { id } = useParams();
  const [clubname, setClubname] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [selectedImg, setSelectedImg] = useState();
  const [mod, setMod] = useState("");
  const [modlist, setModlist] = useState([]);
  const [btn, setBtn] = useState("Create");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(`/club/${id}`);
          if (response.statusText) {
            setClubname(response.data.club.clubname);
            setDescription(response.data.club.clubdesc);
            setImage(response.data.club.clublogo);
            setBtn("Update");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();

    const fetchOptions = async () => {
      try {
        const response = await axios.get(`/clubcreateupdate/${id}`);
        setModlist(response.data);
        console.log(modlist);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, [id]);

  useEffect(() => {
    // Fetch search results based on searchQuery
    const fetchSearchResults = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `/searchmods/${id}?name=${searchQuery}`
          );
          setSearchResults(response.data);
        } else {
          const response = await axios.get(
            `/searchmods/${id}?name=${searchQuery}`
          );
          setSearchResults(response.data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Fetch only if searchQuery is not empty
    if (searchQuery) {
      if (searchQuery.trim() !== "") {
        fetchSearchResults();
      }
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleModDelete = async (moderatorid) => {
    try {
      console.log(moderatorid);
      const response = await axios.delete(`/removemod/${moderatorid}`);
      if (response.data) {
        console.log("Moderator Deleted successfully", response.data);
        setModlist(modlist.filter((mod) => mod.moderatorid !== moderatorid));
      }
    } catch (error) {
      if (error.response) {
        console.error("Delete Moderator failed, error:", error.message);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(modlist);
    const clubData = new FormData();
    clubData.append("clubname", clubname);
    clubData.append("description", description);
    if (selectedImg) {
      clubData.append("clublogo", selectedImg);
    }
    try {
      if (id) {
        const response = await axios.patch(`/clubupdate/${id}`, clubData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.statusText) {
          navigate("/clubmoderation");
        }
      } else {
        const response = await axios.post("/clubcreate", clubData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.statusText) {
          navigate("/clubmoderation");
        }
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleAddMod = async () => {
    console.log(mod);
    try {
      const response = await axios.post("/addmod", mod);
      console.log("Data sent to server:", response.data.message);
      console.log("New mod info: ", response.data.newMod);
      setModlist([...modlist, response.data.newMod]);
    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const handleUserClick = (username) => {
    setMod(username);
    setSearchQuery(username.users.username); // Update input box value with selected username
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
    <div className="self-stretch h-auto flex-1 flex flex-row items-start justify-between py-0 px-[21px] lg:w-auto lg:[align-self:unset] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
      <div className="flex-1 flex h-auto flex-col items-center justify-start py-7 px-[420px] lg:flex-1 md:flex-[unset] md:self-stretch sm:flex-[unset] sm:self-stretch">
        <form
          onSubmit={handleSubmit}
          className="self-stretch flex flex-col items-start justify-center py-3 px-6 gap-[34px] border-solid border-darkslategray-100 border-[1px] rounded-md"
        >
          <div className="self-stretch flex flex-row items-center justify-start gap-[25px]">
            <div className="relative">Clubname:</div>
            <input
              className="[outline:none] bg-[transparent] flex-1 relative box-border h-[42px] border-[1px] rounded-md border-solid border-mediumslateblue text-white"
              type="text"
              value={clubname}
              onChange={(e) => setClubname(e.target.value)}
            />
          </div>
          <div className="self-stretch flex flex-row items-center justify-start gap-[10px]">
            <div className="relative">Description:</div>
            <textarea
              className="bg-[transparent] [outline:none] flex-1 relative rounded-md box-border h-[79px] border-[1px] border-solid border-mediumslateblue text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className="self-stretch flex flex-row items-center justify-start gap-[76px]">
          <div className="relative">Rules:</div>
          <textarea
            className="bg-[transparent] [outline:none] flex-1 relative rounded-md box-border h-[79px] border-[1px] border-solid border-mediumslateblue text-white"
            value={rules}
            onChange={(e) => setRules(e.target.value)}
          />
        </div> */}
          <div className="self-stretch flex flex-row items-center justify-start gap-[24px] ">
            <div className="relative">Club Logo:</div>
            <div className="flex flex-col">
              {image && (
                <div className="mt-4 flex flex-auto w-full justify-center">
                  <img
                    src={image}
                    alt="Selected"
                    className="max-w-full h-auto flex justify-center rounded-full scale-90"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleClick}
                className="cursor-pointer py-1.5 px-[60px] bg-[transparent] rounded-md flex flex-col items-center justify-start border-[1px] border-solid border-mediumslateblue "
              >
                <img
                  className="w-[27px] relative h-[27.5px] object-cover"
                  alt=""
                  src="/frame-523@2x.png"
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
          {id && (
            <div>
              <div className="self-stretch flex flex-row items-center justify-center gap-[31px]">
                <div className="relative">Add Mod:</div>
                <input
                  className="[outline:none] bg-[transparent] flex-1 relative rounded-md box-border h-[42px] border-[1px] border-solid border-mediumslateblue text-white"
                  type="text"
                  value={searchQuery}
                  placeholder="Search for a user..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setMod(searchResults[0]);
                    {
                      console.log("Value :", searchResults[0]);
                    }
                    handleAddMod();
                  }}
                  type="button"
                  className="cursor-pointer py-[10px] px-3 bg-[transparent] rounded flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue"
                >
                  <div className="relative text-base font-inter text-white text-left">
                    Add
                  </div>
                </button>
              </div>
              <div className="flex relative left-12">
                <ul>
                  {searchResults.map((user) => (
                    <li
                      className="text-white list-none text-center cursor-pointer"
                      key={user.userid}
                      onClick={() => handleUserClick(user)}
                    >
                      {user.users.username}
                    </li>
                  ))}
                </ul>
              </div>
              {modlist && (
                <div className="self-stretch flex flex-col items-start justify-center py-0 pr-0 pl-[147px] text-lg">
                  <div className="flex flex-col items-start justify-start">
                    {modlist?.map((mods) => (
                      <div
                        key={mods?.moderatorid}
                        className=" rounded-md self-stretch flex flex-row items-center justify-center py-0.5 px-2 gap-[150px] mb-3 border-[1px] border-solid border-mediumslateblue"
                      >
                        <div className="text-left relative">
                          {mods?.users?.username}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleModDelete(mods?.moderatorid);
                          }}
                          type="button"
                          className="cursor-pointer [border:none] p-0 bg-[transparent] w-[16.4px] relative h-[16.4px]"
                        >
                          <img
                            className="absolute top-[0px] left-[0px] w-[16.4px] h-[16.4px] object-cover"
                            alt=""
                            src="/mask-group1@2x.png"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className=" rounded-md cursor-pointer py-1 px-2.5 bg-[transparent] rounded-8xs flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue relative left-[255px]"
          >
            <div className="relative text-5xl font-inter text-white text-left">
              {btn}
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
