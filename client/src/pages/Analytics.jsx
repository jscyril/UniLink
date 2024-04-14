import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "../api/axios";
import Table from "../components/Table";

export default function Analytics() {
  const [selected, setSelected] = useState("signInTable");
  const [tableInfo, setTableInfo] = useState();
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("/analytics");
        switch (selected) {
          case "signInTable":
            setTableInfo(response.data.signInTable);
            break;
          case "signUpTable":
            setTableInfo(response.data.signUpTable);
            break;
          case "addPostTable":
            setTableInfo(response.data.addPostTable);
            break;
          case "createClubTable":
            setTableInfo(response.data.createClubTable);
            break;
          default:
            setTableInfo(response.data.signInTable); // default to signInTable
            break;
        }
        console.log(tableInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTables();
  }, [selected]);
  return (
    <div className="w-[1440px] py-20 h-auto relative bg-gray-400 overflow-hidden flex flex-col items-start justify-start gap-[0px] lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="self-stretch h-auto flex flex-col items-center justify-start gap-[40px] w-auto  lg:self-stretch lg:w-auto lg:flex-1 md:self-stretch md:w-auto sm:self-stretch sm:w-auto">
        <NavBar />
        <div className="self-stretch h-auto flex-1 flex flex-row items-stretch justify-stretch py-0 px-[258px] box-border w-auto gap-[50px md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
          <div className="flex-1 flex h-auto flex-row items-start justify-center lg:flex-1 md:flex-[unset] md:self-stretch sm:flex-[unset] sm:self-stretch">
            <div className="flex-1 rounded-lg box-border flex flex-col items-stretch justify-stretch py-4 px-5 gap-[26px] w h-auto border-[1px] border-solid border-darkslategray-100 lg:flex-1 lg:flex-col lg:gap-[12px_26px] md:w-auto md:[align-self:unset] md:flex-col">
              <div className="rounded-[13px] bg-gray-800 flex flex-row self-start justify-self-start items-start justify-start py-2.5 px-4 gap-[20px]">
                <button
                  onClick={() => setSelected("signInTable")}
                  className="cursor-pointer py-1.5 px-2.5 bg-[transparent] rounded-lg flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-100"
                >
                  <div className="relative text-base font-inter text-white text-left sm:hidden">
                    Sign in
                  </div>
                </button>
                <button
                  onClick={() => setSelected("signUpTable")}
                  className="cursor-pointer py-1.5 px-2.5 bg-[transparent] rounded-lg flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-100"
                >
                  <div className="relative text-base font-inter text-white text-left sm:hidden">
                    Sign up
                  </div>
                </button>
                <button
                  onClick={() => setSelected("addPostTable")}
                  className="cursor-pointer py-1.5 px-2.5 bg-[transparent] rounded-lg flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-100"
                >
                  <div className="relative text-base font-inter text-white text-left sm:hidden">
                    Posts
                  </div>
                </button>
                <button
                  onClick={() => setSelected("createClubTable")}
                  className="cursor-pointer py-1.5 px-2.5 bg-[transparent] rounded-lg flex flex-row items-center justify-center border-[1px] border-solid border-darkslategray-100"
                >
                  <div className="relative text-base font-inter text-white text-left sm:hidden">
                    Clubs
                  </div>
                </button>
              </div>
              {tableInfo && (
                <Table tableInfo={tableInfo} tableType={selected} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
