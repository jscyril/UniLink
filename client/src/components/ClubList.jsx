

export default function ClubList(){
    return(
        <div className="self-stretch box-border flex flex-col items-center justify-start py-0 px-5 gap-[30px_0px] border-r-[1px] border-solid border-darkslategray-100 border-l-[1px] lg:flex-col lg:gap-[30px_0px] md:w-auto md:[align-self:unset] md:flex-col sm:flex-1 sm:pl-0 sm:pr-0 sm:box-border">
              <div className="self-stretch flex flex-col items-center justify-start gap-[20px_0px] lg:w-auto lg:[align-self:unset]">
                <img
                  className="self-stretch relative max-w-full overflow-hidden h-[400px] shrink-0 object-cover"
                  alt=""
                  src="/club-carddivcontainerimage@2x.png"
                />
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-start gap-[15px_0px]">
                    <div className="relative font-medium">Club</div>
                    <div className="relative text-3xl">No. of Posts</div>
                  </div>
                  <button className="cursor-pointer [border:none] py-[5px] px-[50px] bg-mediumslateblue w-40 rounded-7xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border sm:py-1 sm:px-3 sm:box-border">
                    <div className="relative text-9xl tracking-[0.09em] font-inter text-black text-left sm:text-base">
                      Join
                    </div>
                  </button>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-center justify-start gap-[20px_0px] lg:w-auto lg:[align-self:unset]">
                <img
                  className="self-stretch relative max-w-full overflow-hidden h-[400px] shrink-0 object-cover"
                  alt=""
                  src="/club-carddivcontainerimage@2x.png"
                />
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start justify-start gap-[15px_0px]">
                    <div className="relative font-medium">Club</div>
                    <div className="relative text-3xl">No. of Posts</div>
                  </div>
                  <button className="cursor-pointer [border:none] py-[5px] px-[50px] bg-mediumslateblue w-40 rounded-7xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border sm:py-1 sm:px-3 sm:box-border">
                    <div className="relative text-9xl tracking-[0.09em] font-inter text-black text-left sm:text-base">
                      Join
                    </div>
                  </button>
                </div>
              </div>
            </div>
    );
}