import { useState, useEffect } from "react";

export default function EventsBar() {
  const [eventValue, setEventValue] = useState({
    events: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEventValue(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-[235px] flex flex-col items-center justify-start gap-[18px] text-5xl text-mediumslateblue lg:hidden lg:h-auto md:hidden text-left">
      <h2 className="m-0 relative text-inherit font-light font-inherit">
        Trending Events
      </h2>
      <div className="self-stretch flex flex-col items-start justify-center py-0 pr-0 pl-2 gap-[12px] text-left text-base text-gray-100">
        {eventValue?.events.slice(0,4).map((trending) => (
          <div
            key={trending.postid}
            className="flex flex-row items-start justify-start"
          >
            <a href="#" className="relative text-inherit no-underline">
              🔥 {trending.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
