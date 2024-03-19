import { useState } from "react";

const Button = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevIsClicked) => !prevIsClicked);
  };

  return (
    <button
      className={`${
        isClicked
          ? "cursor-pointer border-[3px] border-indigo-600 rounded-12xl flex flex-row items-center justify-center bg-transparent py-0 px-4 "
          : " cursor-pointer [border:none] py-1 px-7 bg-mediumslateblue rounded-12xl flex flex-row items-center justify-center"
      }`}
      onClick={handleClick}
    >
      <div
        className={`relative text-base font-inter text-left ${
          isClicked ? "text-white" : "text-black"
        }`}
      >
        {isClicked ? "Joined" : "Join"}
      </div>
    </button>
  );
};

export default Button;
