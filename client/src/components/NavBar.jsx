import { useState } from "react";
export default function NavBar(props) {
  const [showLogout, setShowLogout] = useState(false);

  const handleDropdownClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogoutClick = () => {
    // Handle logout logic here
    console.log("Logout clicked");
  };
  return (
    <header className=" self-stretch box-border h-14 flex flex-row items-center justify-between py-0 px-9 text-left text-sm text-white font-inter border-b-[1px] border-solid border-dimgray md:self-stretch md:w-auto md:h-12 sm:flex sm:self-stretch sm:w-auto sm:pl-3 sm:pr-3 sm:box-border sm:max-w-[420px]">
      <button className="cursor-pointer [border:none] p-0 bg-[transparent] h-[55px] flex flex-row items-center justify-start gap-[12px] sm:flex sm:items-end sm:justify-start">
        <img
          className="w-10 relative h-[43px] object-cover sm:flex"
          alt=""
          src="/NavBarLogo.png"
        />
        <div className="w-[147px] relative text-10xl font-inter text-mediumslateblue text-left inline-block shrink-0 sm:hidden">
          UniLink
        </div>
      </button>
      <form>
          <input
            className="  pl-7 relative [outline:none] font-inter text-sm bg-gray-600 h-10 w-[440px] rounded-22xl box-border overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-4 text-gray-200 border-[1px] border-solid border-gray-600 border-l-8 md:w-auto md:[align-self:unset] sm:bg-gray-500 sm:flex sm:w-auto sm:[align-self:unset] sm:h-auto sm:items-start sm:justify-start sm:pl-2 sm:pr-2 sm:box-border sm:border-[1px] sm:border-solid sm:border-darkslategray-200"
            placeholder="Search"
            type="text"
          />
      </form>
      <button className=" bg-transparent cursor-pointer">
        <img
          className="w-[18px] relative h-5 object-cover sm:flex"
          alt=""
          src="/post@2x.png"
        />
      </button>

      <div className="self-stretch relative flex flex-row items-center justify-start gap-[20px] sm:flex sm:w-auto sm:[align-self:unset] sm:pl-3 sm:pr-3 sm:box-border">
        <div className="w-[101px] flex flex-row items-center justify-center gap-[8px] sm:flex sm:w-auto sm:[align-self:unset]">
          <img
            className="w-[25px] relative h-[25px] object-cover sm:flex"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofileicon@2x.png"
          />
          <div className="flex-1 relative sm:hidden">{props.username}</div>
        </div>
        {/* Dropdown menu */}
        {showLogout && (
          <div className="absolute top-full left-0 mt-2 sm:hidden">
            <div
              className="rounded bg-gray-300 border border-red-500 p-2 text-center shadow-md hover:shadow-lg transition duration-300"
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
        <div
          className="w-[11px] relative h-1.5 sm:flex"
          onClick={handleDropdownClick}
        >
          <img
            className="absolute top-[-0.5px] left-[-1px] rounded-12xs w-[13px] h-[7px] object-cover cursor-pointer"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofiledropdownicon@2x.png"
          />
        </div>
      </div>
    </header>
  );
}
