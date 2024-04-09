import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideNav from "../components/SideNav";
import EventBar from "../components/EventBar";
import EditProfile from "../components/EditProfile";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const onLogoClick = useCallback(() => {
    navigate("/landing-page-unilink");
  }, [navigate]);

  return (
    <div className="w-full h-screen py-20 relative bg-gray-400 overflow-hidden flex flex-row items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="h-fit flex-1 flex flex-col items-center justify-start gap-[40px] text-left text-xs text-white font-inter lg:flex-1 lg:self-stretch lg:h-auto md:flex-1 sm:flex-1">
        <NavBar />
        <div className=" flex flex-row items-start justify-between py-0 px-[38px] lg:w-auto lg:[align-self:unset] md:flex-col sm:flex-col sm:gap-[0px] sm:pl-0 sm:pr-0 sm:box-border">
        <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
              <SideNav />
            </div>
            <div className="lg:flex-row z-10"><EditProfile /></div>
          
          <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
              <EventBar />
            </div>
        </div>
      </main>
    </div>
  );
};

export default EditProfilePage;
