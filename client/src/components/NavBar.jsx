import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
export default function NavBar() {
  const [showLogout, setShowLogout] = useState(false);
  const [userValue, setUserValue] = useState("");
  const { auth, setAuth } = useAuth(); // Use the useAuth hook to access authentication context
  const isAdmin = auth?.user?.role === "admin";
  const isClubPage = location.pathname.includes("/club/");
  const [isMod, SetIsMod] =useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/");
        if (response.statusText) {
          setUserValue(response.data.username);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const fetchClubData = async () => {
      if(isClubPage){
        const userid = {userid: auth.user.userId}
        try {
          const response = await axios.post(`/isMod/${id}`,userid);
          console.log(response.data);
          SetIsMod(response.data.value);
        }catch(error){
          console.error(error);
        }
      }
    };

    fetchClubData();

  }, []);
  const handleDropdownClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogoutClick = async () => {
    try {
      const response = await axios.post("/logout");
      if (!response.status) {
        throw new Error("Network response was not ok");
      }
      setShowLogout(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Logout clicked");
    setAuth(null);
    navigate("/");
  };
  return (
    <header className=" self-stretch box-border h-14 flex flex-row items-center justify-between py-0 px-9 text-left text-sm text-white font-inter border-b-[1px] border-solid border-gray-300 md:self-stretch md:w-auto md:h-12 sm:flex sm:self-stretch sm:w-auto sm:pl-3 sm:pr-3 sm:box-border sm:max-w-[420px]">
      <button className=" bg-transparent">
        <Link
          to="/home"
          className="cursor-pointer [border:none] p-0 bg-[transparent] h-[55px] flex flex-row items-center justify-start gap-[12px] sm:flex sm:items-end sm:justify-start no-underline"
        >
          <img
            className="w-10 relative h-[43px] object-cover sm:flex"
            alt=""
            src="/NavBarLogo.png"
          />
          <div className="w-[147px] relative text-10xl font-inter text-mediumslateblue text-left inline-block shrink-0 sm:hidden">
            UniLink
          </div>
        </Link>
      </button>
      <form>
        <input
          className="  pl-7 relative [outline:none] font-inter text-sm bg-gray-600 h-10 w-[440px] rounded-22xl box-border overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-4 text-gray-200 border-[1px] border-solid border-gray-600 border-l-8 md:w-auto md:[align-self:unset] sm:bg-gray-500 sm:flex sm:w-auto sm:[align-self:unset] sm:h-auto sm:items-start sm:justify-start sm:pl-2 sm:pr-2 sm:box-border sm:border-[1px] sm:border-solid sm:border-darkslategray-200"
          placeholder="Search"
          type="text"
        />
      </form>
      <Link to="/admin">
        <button className="cursor-pointer py-0 px-2.5 bg-[transparent] rounded-7xl overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue relative ml-2 min-w-1">
          <div className="relative text-xs font-inter text-white text-left">
            Admin Dashboard
          </div>
        </button>
      </Link>
      {isClubPage && (isMod||isAdmin) &&(
        <Link to={`/addpost/${id}`}>
          <button className=" bg-transparent cursor-pointer">
            <img
              className="w-[18px] relative h-5 object-cover sm:flex"
              alt=""
              src="/post@2x.png"
            />
          </button>
        </Link>
      )}

      <div className="self-stretch relative flex flex-row items-center justify-start gap-[20px] sm:flex sm:w-auto sm:[align-self:unset] sm:pl-3 sm:pr-3 sm:box-border">
        <div className="w-[101px] flex flex-row items-center justify-center gap-[8px] sm:flex sm:w-auto sm:[align-self:unset]">
          <img
            className="w-[25px] relative h-[25px] object-cover sm:flex"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofileicon@2x.png"
          />
          <div className="flex-1 relative sm:hidden">{`${userValue}`}</div>
        </div>
        {/* Dropdown menu */}
        {showLogout && (
          <div className="absolute top-full left-0 mt-2 sm:hidden">
            <div
              className="rounded bg-gray-300 border p-2 text-center shadow-md hover:shadow-lg transition duration-300"
              style={{
                width: "calc(101px + 20px)", // Adjust the calculation as needed
              }}
            >
              <button
                className="text-white hover:bg-red-500 hover:text-black bg-transparent border border-red-500 rounded p-2 cursor-pointer transition duration-300"
                onClick={handleLogoutClick}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
        <button
          className="cursor-pointer [border:none] p-0 bg-[transparent] flex flex-col items-end justify-start relative left-[-10px]"
          onClick={handleDropdownClick}
        >
          <div className="w-6 relative h-4">
            <div className="absolute top-[-0.7px] left-[-0.7px] box-border w-[25.5px] h-[1.5px] border-t-[1.5px] border-solid border-white" />
            <div className="absolute top-[7.3px] left-[-0.7px] box-border w-[25.5px] h-[1.5px] border-t-[1.5px] border-solid border-white" />
            <div className="absolute top-[15.2px] left-[-0.7px] box-border w-[25.5px] h-[1.5px] border-t-[1.5px] border-solid border-white" />
          </div>
        </button>
      </div>
    </header>
  );
}
