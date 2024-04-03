export default function Reply() {
  return (
    <div className="self-stretch rounded-lg bg-gray-800 box-border p-[8px] overflow-hidden shrink-0 flex flex-col items-start justify-start border-[1px] border-solid border-mediumslateblue">
      <div className="self-stretch flex flex-row items-end justify-between">
        <input
          className="[border:none] [outline:none] font-inter text-lg bg-[transparent] flex-1 flex flex-row items-center justify-start text-white"
          placeholder="Write comment..."
          type="text"
        />
        <button className="cursor-pointer [border:none] p-2.5 bg-[transparent] w-[41.5px] h-[30.2px] flex flex-row items-start justify-center box-border relative">
          <img
            className="w-[41.5px] absolute !m-[0] top-[0px] left-[0px] h-[30.2px] z-[0]"
            alt=""
            src="/vector-9.svg"
          />
        </button>
      </div>
    </div>
  );
}
