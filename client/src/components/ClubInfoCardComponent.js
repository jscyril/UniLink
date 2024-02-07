import "./ClubInfoCardComponent.css";

const ClubInfoCardComponent = () => {
  return (
    <section className="club-info-card-component">
      <div className="club-info-card-div-clubcardd">
        <div className="club-info-card">Club Name</div>
        <div className="club-info-card-div-clubcardd1">
          <img
            className="club-info-card-div-clubcardd2"
            alt=""
            src="/club-info-card-divclubcarddivclubheadingdivmembersicon@2x.png"
          />
          <div className="club-info-card1">X Members</div>
        </div>
      </div>
      <img
        className="club-info-card-div-clubcardi"
        alt=""
        src="/club-info-card-divclubcardimage@2x.png"
      />
      <div className="club-info-card-div-clubcardd3">
        <div className="club-info-card2">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. `}</div>
        <button className="club-info-card-div-clubcardd4">
          <div className="club-info-card3">Leave Community</div>
        </button>
      </div>
      <div className="club-info-card-div-clubcardd5">
        <div className="club-info-card4">Clubs Guidelines:</div>
        <div className="club-info-card-container">
          <ul className="lorem-ipsum-lorem-ipsum-lorem">
            <li className="lorem-ipsum">Lorem ipsum</li>
            <li className="lorem-ipsum">Lorem ipsum</li>
            <li className="lorem-ipsum">Lorem ipsum</li>
            <li className="lorem-ipsum">Lorem ipsum</li>
            <li className="lorem-ipsum">Lorem ipsum</li>
            <li>Lorem ipsum</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ClubInfoCardComponent;
