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
    <div className="w-full relative bg-gray-400 overflow-hidden flex flex-col items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="self-stretch h-[1295.7px] flex flex-col items-center justify-start gap-[40px] text-center text-5xl text-mediumslateblue font-inter lg:self-stretch lg:w-auto lg:flex-1 md:self-stretch md:w-auto sm:self-stretch sm:w-auto sm:gap-[40px]">
        <NavBar />
        <div className="self-stretch flex-1 flex flex-row items-start justify-between py-0 px-[38px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
          <SideNav />
          <EditProfile />
          <EventBar />
        </div>
      </main>
    </div>
  );
};

export default EditProfilePage;
