import { useEffect, useState } from "react";
export default function Table(props) {
  const [total, setTotal] = useState();
  const [month, setMonth] = useState();
  const [week, setWeek] = useState();
  const [event, setEvent] = useState();
  const [eventBy, setEventBy] = useState("");
  const [eventType, setEventType] = useState("");
  const [tabArray, setTabArray] = useState([]);
  useEffect(() => {
    const getCount = async () => {
      try {
        const currentDate = new Date();
        const oneWeekAgo = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        const oneMonthAgo = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        // Set eventType based on tableType
        switch (props.tableType) {
          case "signInTable":
            setEventType("signin");
            setEventBy("user");
            break;
          case "signUpTable":
            setEventType("signup");
            setEventBy("user");
            break;
          case "addPostTable":
            setEventType("add-post");
            setEventBy("post");
            break;
          case "likePostTable":
            setEventType("like-post");
            setEventBy("like");
            break;
          case "createClubTable":
            setEventType("create-club");
            setEventBy("club");
            break;
          default:
            setEventType("signin");
            setEventBy("user");
            break;
        }
        const totalSignIns = props.tableInfo.filter(
          (item) => item.eventType === eventType
        ).length;
        const monthSignIns = props.tableInfo.filter(
          (item) =>
            item.eventType === eventType &&
            new Date(item.timestamp) > oneMonthAgo
        ).length;
        const weekSignIns = props.tableInfo.filter(
          (item) =>
            item.eventType === eventType &&
            new Date(item.timestamp) > oneWeekAgo
        ).length;

        setTotal(totalSignIns);
        setMonth(monthSignIns);
        setWeek(weekSignIns);
      } catch (error) {
        console.error("Error calculating counts:", error);
      }
    };
    if (props.tableInfo !== undefined && props.tableType) {
      setEvent(props.tableType);
      setTabArray(props.tableInfo);
      console.log(props.tableInfo);
      getCount();
    }
  }, [event, eventBy, eventType, props.tableType, props.tableInfo]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Get time in 12-hour format
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Get day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    // Construct formatted string
    const timeStr = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
    const dateStr = `${day}-${month}-${year}`;

    return `${timeStr} ${dateStr}`;
  };
  return (
    <div className="flex flex-col ">
      <div>
        <table className=" table-auto">
          <tbody>
            <tr>
              <td className=" relative whitespace-normal text-base font-inter text-gray-500 text-left sm:hidden">
                Total:
              </td>
              <td className="relative text-base font-inter text-gray-500 text-left  sm:hidden">
                {total}
              </td>
            </tr>
            <tr>
              <td className="relative whitespace-normal text-base font-inter text-gray-500 text-left sm:hidden">
                30 days:
              </td>
              <td className="relative text-base font-inter text-gray-500 text-left  sm:hidden">
                {month}
              </td>
            </tr>
            <tr>
              <td className="relative whitespace-normal text-base font-inter text-gray-500 text-left  sm:hidden">
                7 days:
              </td>
              <td className="relative text-base font-inter text-gray-500 text-left  sm:hidden">
                {week}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" relative overflow-x-auto">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="h-[19px] px-3  whitespace-normal py-2 text-base font-inter text-gray-500 text-center  sm:hidden">
                EventType
              </th>
              <th className="h-[19px] px-3 py-2 text-base font-inter text-gray-500 text-center sm:hidden">
                EventId
              </th>
              <th className="h-[19px] px-3 py-2 text-base font-inter text-gray-500 text-center   sm:hidden">
                {eventBy}
              </th>
              <th className="h-[19px] px-3 py-2 text-base font-inter text-gray-500 text-center  sm:hidden">
                TimeStamp
              </th>
            </tr>
            {props?.tableInfo.map((row) => (
              <tr key={props?.rowInfo?.analyticsid}>
                <td className="h-[19px] px-3 py-1 text-base font-inter text-white text-center sm:hidden">
                  {row?.eventType}
                </td>
                <td className="h-[19px] px-3 py-1 text-base font-inter text-white text-center sm:hidden">
                  {row?.analyticsid}
                </td>
                <td className="h-[19px] px-3 py-1 text-base font-inter text-white text-center sm:hidden">
                  { row?.clubs?.clubname || row?.posts?.title || row?.users?.username}
                </td>
                <td className="h-[19px] px-3 py-1 text-base font-inter text-white text-center sm:hidden">
                  {formatTimestamp(row.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
