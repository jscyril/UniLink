import "./ProfileCardComponent.css";

const ProfileCardComponent = () => {
  return (
    <section className="profile-card-component">
      <div className="profile-cardiv-container">
        <div className="profile-cardiv-containerdiv-">
          <div className="profile-cardiv-containerdiv-1">
            <div className="profile-cardiv-containerdiv-2">
              <img
                className="profile-cardiv-containerdiv-icon"
                alt=""
                src="/profile-cardivcontainerdivprofiledivdetailsdivname@2x.png"
              />
              <div className="profile-cardiv-containerdiv-3">Username</div>
            </div>
            <button className="profile-cardiv-containerdiv-4">
              <img
                className="profile-cardiv-containerdiv-child"
                alt=""
                src="/group-19@2x.png"
              />
              <img
                className="profile-cardiv-containerdiv-item"
                alt=""
                src="/line-17.svg"
              />
            </button>
          </div>
          <div className="profile-cardiv-containerdiv-5">
            Joined x days ago (date)
          </div>
        </div>
        <div className="profile-cardiv-containerdiv-6">
          <div className="profile-cardiv-containerdiv-7">
            <div className="user">Role</div>
            <div className="profile-cardiv-containerdiv-9">
              <div className="user">User</div>
            </div>
          </div>
          <div className="profile-cardiv-containerdiv-10">
            <div className="user">Clubs</div>
            <div className="profile-cardiv-containerdiv-12">
              <div className="swo-wrapper">
                <div className="user">SWO</div>
              </div>
              <div className="swo-wrapper">
                <div className="user">SAMAGRA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCardComponent;
