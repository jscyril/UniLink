import { useEffect } from "react";

export default function AnalyticsTable(props) {
  useEffect(() => {
    console.log(props.rowInfo, "from analyticsTable");
  }, []);
  return (
    <div>
      <tr key={props?.rowInfo?.analyticsid}>
        <td className="relative text-base font-inter text-white text-left sm:hidden">
          {props?.rowInfo?.eventType}
        </td>
        <td className="relative text-base font-inter text-white text-left sm:hidden">
          {props?.rowInfo?.analyticsid}
        </td>
        <td className="relative text-base font-inter text-white text-left sm:hidden">
          {props?.rowInfo?.users.username}
        </td>
        <td className="relative text-base font-inter text-white text-left sm:hidden">
          {props?.rowInfo?.timestamp}
        </td>
      </tr>
    </div>
  );
}
