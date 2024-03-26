export default function Comments() {
  return (
    <div className="self-stretch rounded-lg bg-gray-800 overflow-hidden flex flex-col items-start justify-start py-[11px] px-0">
      <div className="self-stretch flex flex-col items-center justify-start py-0 px-3 gap-[4px_0px]">
        <div className="self-stretch flex flex-row items-end justify-between">
          <div className="flex flex-col items-start justify-start">
            <div className="flex flex-col items-start justify-center gap-[10px_0px]">
              <div className="flex flex-row items-center justify-center">
                <div className="flex flex-row items-center justify-center gap-[0px_14px]">
                  <img
                    className="w-5 relative rounded-[50%] h-5 object-cover"
                    alt=""
                    src="/ellipse-391@2x.png"
                  />
                  <button className="cursor-pointer py-0 px-2.5 bg-[transparent] rounded-7xl overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue">
                    <div className="relative text-xs font-inter text-white text-left">
                      Username
                    </div>
                  </button>
                </div>
              </div>
              <div className="relative">Comment</div>
            </div>
          </div>
          <div className="w-[69px] relative text-xs font-kanit inline-block h-[18px] shrink-0">{` `}</div>
        </div>
        <div className="self-stretch relative box-border h-px border-t-[1px] border-solid border-black" />
      </div>
    </div>
  );
}
