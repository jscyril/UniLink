import { useState } from "react";

export default function NavBar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const logout = () => {
    // Implement your logout logic here
    console.log("Logout clicked");
    // You may want to redirect the user to the logout page or clear authentication tokens.
  };

  const profile = () => {
    // Implement your profile logic here
    console.log("Profile clicked");
    // You may want to redirect the user to the profile page.
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
      <input
        className="[outline:none] font-inter text-sm bg-gray-600 h-10 w-[440px] rounded-22xl box-border overflow-hidden shrink-0 flex flex-row items-center justify-start py-2.5 px-4 text-gray-200 border-[1px] border-solid border-darkslategray-300 md:w-auto md:[align-self:unset] sm:bg-gray-500 sm:flex sm:w-auto sm:[align-self:unset] sm:h-auto sm:items-start sm:justify-start sm:pl-2 sm:pr-2 sm:box-border sm:border-[1px] sm:border-solid sm:border-darkslategray-200"
        placeholder="Search for posts or clubs"
        type="text"
      />
      <img
        className="w-[18px] relative h-5 object-cover sm:flex"
        alt=""
        src="/post@2x.png"
      />
      {/* <div className="self-stretch w-[140px] flex flex-row items-center justify-start gap-[20px] sm:flex sm:w-auto sm:[align-self:unset] sm:pl-3 sm:pr-3 sm:box-border">
        <div className="w-[101px] flex flex-row items-center justify-center gap-[8px] sm:flex sm:w-auto sm:[align-self:unset]">
          <img
            className="w-[25px] relative h-[25px] object-cover sm:flex"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofileicon@2x.png"
          />
          <div className="flex-1 relative sm:hidden">Username</div>
        </div>
        <div className="w-[11px] relative h-1.5 sm:flex">
          <img
            className="absolute top-[-0.5px] left-[-1px] rounded-12xs w-[13px] h-[7px] object-cover"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofiledropdownicon@2x.png"
          />
        </div>
      </div>
    </header> */}
      <div className="self-stretch w-[140px] flex flex-row items-center justify-start gap-[20px] sm:flex sm:w-auto sm:[align-self:unset] sm:pl-3 sm:pr-3 sm:box-border relative">
        <button
          className="w-[101px] flex flex-row items-center justify-center gap-[8px] sm:flex sm:w-auto sm:[align-self:unset]"
          onClick={toggleDropdown}
        >
          <img
            className="w-[25px] relative h-[25px] object-cover sm:flex"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofileicon@2x.png"
          />
          <div className="flex-1 relative sm:hidden">Username</div>
        </button>
        {dropdownVisible && (
          <div className="dropdown-content absolute top-10 left-0 w-[101px] bg-#1a1a1b border-[1px] border-solid border-gray-300 rounded-7px py-2 px-3 shadow-md">
            <button className="dropdown-item" onClick={profile}>
              Profile
            </button>
            <button className="dropdown-item" onClick={logout}>
              Log out
            </button>
          </div>
        )}
        <div className="w-[11px] relative h-1.5 sm:flex">
          <img
            className="absolute top-[-0.5px] left-[-1px] rounded-12xs w-[13px] h-[7px] object-cover"
            alt=""
            src="/headernavbarprofile-dropdown-menuprofiledivprofiledropdownicon@2x.png"
          />
        </div>
      </div>
    </header>
  );
}
