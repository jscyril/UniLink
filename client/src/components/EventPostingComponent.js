import "./EventPostingComponent.css";

const EventPostingComponent = () => {
  return (
    <section className="event-posting-component">
      <div className="event-postingdiv-container">
        <div className="event-postingdiv-containerdi">
          <div className="event-postingdiv-containerdi1">Title:</div>
          <input className="event-postingdiv-containerdi2" type="text" />
        </div>
        <div className="event-postingdiv-containerdi3">
          <div className="event-postingdiv-containerdi1">Description:</div>
          <input className="event-postingdiv-containerdi5" type="text" />
        </div>
        <div className="event-postingdiv-containerdi6">
          <div className="event-postingdiv-containerdi7">
            <div className="event-postingdiv-containerdi1">
              Images / Videos:
            </div>
            <button className="event-postingdiv-containerdi9">
              <img
                className="event-postingdiv-containerdi-child"
                alt=""
                src="/group-21.svg"
              />
            </button>
          </div>
          <div className="event-postingdiv-containerdi10">
            <input className="rectangle-input" type="checkbox" />
            <div className="allow-comments">Allow Comments</div>
          </div>
        </div>
        <button className="event-postingdiv-containerbu">
          <div className="post1">Post</div>
        </button>
      </div>
    </section>
  );
};

export default EventPostingComponent;
