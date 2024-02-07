import "./ClubCardComponent.css";

const ClubCardComponent = () => {
  return (
    <div className="club-card-component">
      <div className="club-carddiv-container">
        <img
          className="club-carddiv-containerimage-icon"
          alt=""
          src="/club-carddivcontainerimage@2x.png"
        />
        <div className="club-carddiv-containerdiv-su">
          <div className="club-carddiv-containerdiv-su1">
            <div className="club-carddiv-containerdiv-su2">Club</div>
            <div className="club-carddiv-containerdiv-su3">X Posts</div>
          </div>
          <button className="club-carddiv-containerdiv-su4">
            <div className="club-carddiv-containerdiv-su5">Join</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubCardComponent;
