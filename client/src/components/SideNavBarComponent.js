import "./SideNavBarComponent.css";

const SideNavBarComponent = () => {
  return (
    <div className="side-nav-bar-component1">
      <div className="side-nav-bardiv-options1" class="Options">
        <button className="side-nav-bardiv-optionsbutto9">
          <img
            className="side-nav-bardiv-optionsbutto10"
            alt=""
            src="/side-nav-bardivoptionsbuttonhomeicon@2x.png"
          />
          <div className="side-nav-bardiv-optionsbutto11">Home</div>
        </button>
        <button className="side-nav-bardiv-optionsbutto12">
          <img
            className="side-nav-bardiv-optionsbutto13"
            alt=""
            src="/side-nav-bardivoptionsbuttonprofileicon@2x.png"
          />
          <div className="side-nav-bardiv-optionsbutto11">Profile</div>
        </button>
        <button className="side-nav-bardiv-optionsbutto15">
          <img
            className="side-nav-bardiv-optionsbutto16"
            alt=""
            src="/side-nav-bardivoptionsbuttonannouncementsicon@2x.png"
          />
          <div className="side-nav-bardiv-optionsbutto11">Announcements</div>
        </button>
      </div>
      <img className="side-nav-bardivider1" alt="" />
      <div className="side-nav-bardiv-clubs1" class="Clubs">
        <div className="side-nav-bardiv-clubsclubact5">
          <button className="side-nav-bardiv-clubsclubact6">
            <img
              className="side-nav-bardiv-clubsclubact7"
              alt=""
              src="/side-nav-bardivclubsclubactionsbuttonclubsicon@2x.png"
            />
            <div className="side-nav-bardiv-optionsbutto11">Clubs</div>
          </button>
          <button className="side-nav-bardiv-clubsclubact9">
            <a href="#" className="see-all1">
              See All
            </a>
          </button>
        </div>
        <div className="side-nav-bardiv-clubsclublis7" class="clublist">
          <div
            className="side-nav-bardiv-clubsclublis8"
            class="clublist-myclubs"
          >
            <button className="side-nav-bardiv-clubsclublis9">
              <div className="my-clubs1">My Clubs</div>
            </button>
            <div className="side-nav-bardiv-clubsclublis10" />
            <div className="side-nav-bardiv-clubsclublis11">SWO</div>
          </div>
          <div className="side-nav-bardiv-clubsclublis12">CUSBMA</div>
          <div className="side-nav-bardiv-clubsclublis13">SAMAGRA</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavBarComponent;
