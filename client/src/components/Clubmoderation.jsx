import axios from "../api/axios";

export default function Clubmoderation(props) {
  
  const handleSettings = async (event) => {
    // Logic for sending it to clubcreateupdate page
  };

  const handleDelete = async (event) => {
    try {
      const response = await axios.delete("http://localhost:3000/clubmoderation", { data: { clubid: props.clubInfo.clubid } });
      
      if (import.meta.env.MODE !== 'production') {
        console.log(response.data);
      }
      
    } catch (error) {
      if (import.meta.env.MODE !== 'production') {
        console.log(error);
      }
    }
  };

  return (
    <div key={props.clubid} className="self-stretch flex flex-col items-center justify-start lg:flex-col lg:gap-[12px] md:self-stretch md:w-auto md:flex-col">
      <div className="self-stretch rounded-11xl flex flex-row items-center justify-between py-2 px-[30px] border-[1.5px] border-solid border-mediumslateblue">
        <div className="flex flex-row items-center justify-center gap-[16px]">
          <img
            className="w-10 relative rounded-[50%] h-10 object-cover"
            alt=""
            src={props.clubInfo.clublogo}
          />
          <div className="rounded-7xl overflow-hidden flex flex-row items-center justify-center py-0.5 px-2.5 border-[1px] border-solid border-mediumslateblue">
            <div className="relative">{props.clubInfo.clubname}</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-[24px]">
          <button onClick={handleSettings} className="cursor-pointer [border:none] p-0 bg-[transparent] w-[44.4px] relative h-[44.4px]">
            <img
              className="absolute top-[0px] left-[0px] w-[44.4px] h-[44.4px] object-cover"
              alt=""
              src="/mask-group@2x.png"
            />
          </button>
          <button onClick={handleDelete} className="cursor-pointer [border:none] p-0 bg-[transparent] w-[44.4px] relative h-[44.4px]">
            <img
              className="absolute top-[0px] left-[0px] w-[44.4px] h-[44.4px] object-cover"
              alt=""
              src="/mask-group1@2x.png"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
