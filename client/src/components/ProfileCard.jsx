import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function CardProfile() {
  const [userValue, setUserValue] = useState({
    user: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://unilink-i3u4.onrender.com/profile"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserValue(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function getAccountAge(accountCreationTimestamp) {
    // Convert account creation timestamp to Date object
    const creationDate = new Date(accountCreationTimestamp);

    // Get current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const difference = currentDate - creationDate;

    // Calculate years
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

    // Calculate months
    const months = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );

    // Calculate days
    const days = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );

    // Calculate hours
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    // Calculate minutes
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return {
      years,
      months,
      days,
      hours,
      minutes,
    };
  }

  function formatJoinMessage(accountAge) {
    const { years, months, days, hours, minutes } = accountAge;

    // Construct the join message
    let joinMessage = "Joined ";
    if (years > 0) {
      joinMessage += years + (years === 1 ? " year" : " years");
      if (months > 0 || days > 0) {
        joinMessage += ", ";
      }
    }
    if (months > 0) {
      joinMessage += months + (months === 1 ? " month" : " months");
      if (days > 0) {
        joinMessage += ", ";
      }
    }
    if (days > 0) {
      joinMessage += days + (days === 1 ? " day ago" : " days ago");
    }
    return joinMessage;
  }
  const joinDate = userValue.user.registrationdate;
  const getDateObj = getAccountAge(joinDate);
  const fJoinDate = formatJoinMessage(getDateObj);
  // userValue.user.clubs.map((club) => console.log(club.clubname));
  return (
    <div className="flex flex-row items-start justify-start lg:flex-1 md:self-stretch md:w-auto sm:self-stretch sm:w-auto">
      <div className="w-[747px] h-[450px] box-border flex flex-col items-center justify-start py-0 px-5 border-[1px] rounded-md border-solid border-darkslategray-100 lg:flex-1 lg:flex-col lg:gap-[30px] md:flex-1 md:flex-col sm:w-auto sm:[align-self:unset] sm:pl-0 sm:pr-0 sm:box-border">
        <div className="self-stretch flex flex-col items-center justify-start lg:self-stretch lg:w-auto">
          <div className="w-[620px] rounded-lg flex flex-col items-start justify-start lg:self-stretch lg:w-auto lg:h-auto md:self-stretch md:w-auto">
            {userValue && (
              <div className="self-stretch flex-1 flex flex-col items-start justify-start py-3.5 px-3 gap-[15px] sm:self-stretch sm:w-auto">
                <div className="self-stretch flex-1 flex flex-col items-end justify-between sm:self-stretch sm:w-auto">
                  <div className="self-stretch h-[140px] flex flex-col items-center justify-start gap-[21px] sm:self-stretch sm:w-auto">
                    <img
                      className="w-[120px] relative h-[120px] object-cover"
                      alt=""
                      src="/profile-cardivcontainerdivprofiledivdetailsdivname@2x.png"
                    />
                    <h2 className="m-0 relative font-light font-inherit text-[22px]">
                      {userValue.user.username}
                    </h2>
                  </div>
                  <Link
                    to="/editprofile"
                    className="cursor-pointer [border:none] p-0 bg-[transparent] w-[27.6px] relative h-[27.2px]"
                  >
                    <img
                      className="absolute top-[0px] w-[27.6px] h-[27.2px] object-cover"
                      alt=""
                      src="/group-26@2x.png"
                    />
                  </Link>
                  <div className="self-stretch relative text-xs font-light top-2 flex justify-center">
                    {fJoinDate}
                  </div>
                </div>
                <div className="self-stretch flex-1 flex flex-col items-start justify-start py-0 px-px gap-[9px] text-13xl">
                  <div className="flex flex-col items-start justify-start gap-[9px]">
                    <h2 className="m-0 relative text-inherit font-normal font-inherit">
                      Role
                    </h2>
                    {/* <div className="rounded-[39.77px] bg-darkslategray-300 overflow-hidden flex flex-row items-center justify-center py-0 px-[15.296552658081055px] text-lg-4 border-[1.5px] border-solid border-mediumslateblue">
                      <div className="relative">{userValue.user.role}</div>
                    </div> */}
                    <div className="rounded-lg bg-darkslategray-300 py-0 px-[10px] overflow-hidden flex flex-row items-center justify-center border-[2px] border-solid border-mediumslateblue">
                      <div className="relativ text-lg-6">
                        {userValue.user.role}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-[8px]">
                    <h2 className="m-0 relative text-inherit font-normal font-inherit">
                      Clubs
                    </h2>
                    {userValue.user.clubs && (
                      <div className="flex flex-row flex-wrap items-start justify-start gap-[15px]">
                        {userValue?.user.clubs.map((club) => (
                          <button
                            className=" rounded-lg cursor-pointer py-0 px-[10px] bg-darkslategray-300 overflow-hidden flex flex-row items-center justify-center border-[2px] border-solid border-mediumslateblue"
                            key={club.clubid}
                          >
                            <div className="relative text-lg-6 font-inter text-white text-left">
                              {club.clubname}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
