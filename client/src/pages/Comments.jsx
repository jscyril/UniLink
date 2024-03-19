


export default function Comments() {
  return (
    <div className="w-full relative bg-gray-400 overflow-hidden flex flex-row items-start justify-start lg:w-auto lg:[align-self:unset] lg:gap-[0px] md:w-auto md:[align-self:unset] sm:w-auto sm:[align-self:unset]">
      <main className="h-fit w-screen flex-1 flex flex-col items-center justify-start gap-[40px] text-left text-xs text-white font-inter lg:flex-1 lg:self-stretch lg:h-auto md:flex-1 sm:flex-1">
        <NavBar username={postValue?.username} />
        {postValue && (
          <div className=" flex flex-row items-start justify-between py-0 px-[38px] lg:w-auto lg:[align-self:unset] md:flex-col sm:flex-col sm:gap-[0px] sm:pl-0 sm:pr-0 sm:box-border">
            <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
              <SideNav clubs={postValue?.clubs} />
            </div>

            <div className="flex flex-row items-start justify-start lg:flex-1 sm:w-auto sm:[align-self:unset]">
              <div className="h-[1199.7px] flex-1 flex flex-col items-center justify-start lg:flex-col lg:gap-[12px_0px] md:w-auto md:[align-self:unset] md:flex-col">
                <div className="self-stretch flex-1 rounded-lg bg-gray-400 overflow-hidden flex flex-row items-start justify-start py-[22px] px-[18px] sm:py-0 sm:px-0.5 sm:box-border">
                  <div className="flex-1 flex flex-col items-center justify-start py-2 px-[18px] gap-[31px_0px] border-[1px] border-solid border-darkslategray-100 sm:py-0 sm:px-1.5 sm:box-border">
                    <div className="self-stretch flex flex-col items-start justify-center py-3.5 px-7 gap-[20px_0px] border-b-[1px] border-solid border-darkslategray-100 sm:py-1 sm:px-2 sm:box-border">
                      <div className="self-stretch flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-center">
                          <div className="flex flex-row items-center justify-center gap-[0px_14px]">
                            <img
                              className="w-10 relative rounded-[50%] h-10 object-cover"
                              alt=""
                              src="/postdivpostdivclubactionsdivposterinfodivposterinfoelementsprofilephoto@2x.png"
                            />
                            <div className="relative">Club</div>
                            <button className="cursor-pointer py-0 px-2.5 bg-[transparent] rounded-7xl overflow-hidden flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue">
                              <div className="relative text-xs font-inter text-white text-left">
                                Username
                              </div>
                            </button>
                          </div>
                        </div>
                        <button className="cursor-pointer py-0 px-5 bg-[transparent] rounded-7xl overflow-hidden flex flex-row items-center justify-center border-[1.5px] border-solid border-mediumslateblue sm:pl-2 sm:pr-2 sm:box-border">
                          <div className="relative text-base font-inter text-white text-left sm:text-xs">
                            Joined
                          </div>
                        </button>
                      </div>
                      <h2 className="m-0 relative text-5xl font-normal font-inherit">
                        Heading
                      </h2>
                      <div className="self-stretch flex flex-row items-end justify-between text-xs">
                        <div className="relative">Paragraph</div>
                        <div className="relative">Posted this time ago</div>
                      </div>
                      <img
                        className="self-stretch relative max-w-full overflow-hidden h-[304px] shrink-0 object-cover"
                        alt=""
                        src="/postdivpostpostimage@2x.png"
                      />
                      <div className="self-stretch flex flex-row items-center justify-between">
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[34.1px] relative h-[31.2px]">
                          <img
                            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                            alt=""
                            src="/vector.svg"
                          />
                        </button>
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[35px] relative h-[33.2px]">
                          <img
                            className="absolute top-[0px] left-[0px] w-[35px] h-[33.2px] object-cover"
                            alt=""
                            src="/postdivpostdivpostactionsbuttoncomment@2x.png"
                          />
                        </button>
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[18.2px] relative h-[28.3px]">
                          <img
                            className="absolute top-[14.1px] left-[0px] max-w-full overflow-hidden h-[14.1px] object-contain"
                            alt=""
                            src="/line-98@2x.png"
                          />
                          <img
                            className="absolute top-[0px] left-[6.1px] max-w-full overflow-hidden h-[28.3px] object-contain"
                            alt=""
                            src="/line-108@2x.png"
                          />
                          <img
                            className="absolute top-[18.2px] left-[12.1px] max-w-full overflow-hidden h-[10.1px] object-contain"
                            alt=""
                            src="/line-118@2x.png"
                          />
                          <img
                            className="absolute top-[8.1px] left-[18.2px] max-w-full overflow-hidden h-[20.2px] object-contain"
                            alt=""
                            src="/line-128@2x.png"
                          />
                        </button>
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[25.5px] relative h-[17.3px]">
                          <img
                            className="absolute top-[0px] left-[0px] w-[25.5px] h-[17.3px] object-contain"
                            alt=""
                            src="/postdivpostdivpostactionsbuttonshare@2x.png"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-end justify-start gap-[25px_0px] text-sm">
                      <div className="self-stretch rounded-lg bg-gray-200 box-border h-[66.2px] overflow-hidden shrink-0 flex flex-col items-start justify-start p-[18px] border-[1px] border-solid border-mediumslateblue">
                        <div className="self-stretch flex flex-row items-end justify-between">
                          <input
                            className="[border:none] [outline:none] font-inter text-lg bg-[transparent] flex-1 flex flex-row items-center justify-start text-gray-800"
                            placeholder="Write comment..."
                            type="text"
                          />
                          <button className="cursor-pointer [border:none] p-2.5 bg-[transparent] w-[41.5px] flex flex-row items-start justify-between box-border relative">
                            <img
                              className="w-[41.5px] absolute my-0 mx-[!important] top-[0px] left-[0px] h-[30.2px] z-[0]"
                              alt=""
                              src="/vector-9.svg"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="self-stretch rounded-lg bg-gray-200 overflow-hidden flex flex-col items-start justify-start py-[11px] px-0">
                        <div className="self-stretch flex flex-col items-center justify-start py-0 px-3 gap-[4px_0px]">
                          <div className="self-stretch flex flex-row items-end justify-between">
                            <div className="flex flex-col items-start justify-start">
                              <div className="flex flex-col items-start justify-center gap-[10px_0px]">
                                <div className="flex flex-row items-center justify-center">
                                  <div className="flex flex-row items-center justify-center gap-[0px_14px]">
                                    <img
                                      className="w-5 relative rounded-[50%] h-5 object-cover"
                                      alt=""
                                      src="/ellipse-39@2x.png"
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
                      <div className="self-stretch rounded-lg bg-gray-200 overflow-hidden flex flex-col items-start justify-start py-[11px] px-0">
                        <div className="self-stretch flex flex-col items-start justify-center gap-[10px_0px]">
                          <div className="self-stretch flex flex-col items-start justify-start py-0 px-2.5 gap-[14px_0px]">
                            <div className="flex flex-col items-start justify-start gap-[28px_0px]">
                              <div className="flex flex-col items-start justify-center gap-[10px_0px]">
                                <div className="flex flex-row items-center justify-center">
                                  <div className="flex flex-row items-center justify-center gap-[0px_14px]">
                                    <img
                                      className="w-5 relative rounded-[50%] h-5 object-cover"
                                      alt=""
                                      src="/ellipse-39@2x.png"
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
                              <div className="flex flex-col items-start justify-center gap-[10px_0px]">
                                <div className="flex flex-row items-center justify-center">
                                  <div className="flex flex-row items-center justify-center gap-[0px_14px]">
                                    <img
                                      className="w-5 relative rounded-[50%] h-5 object-cover"
                                      alt=""
                                      src="/ellipse-39@2x.png"
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
                              <div className="flex flex-col items-start justify-center gap-[10px_0px]">
                                <div className="flex flex-row items-center justify-center">
                                  <div className="flex flex-row items-center justify-center gap-[0px_14px]">
                                    <img
                                      className="w-5 relative rounded-[50%] h-5 object-cover"
                                      alt=""
                                      src="/ellipse-39@2x.png"
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
                            <div className="self-stretch relative box-border h-px border-t-[1px] border-solid border-black" />
                          </div>
                          <div className="self-stretch rounded-lg bg-gray-200 overflow-hidden flex flex-col items-start justify-start p-[18px] text-lg text-gray-800 border-[1px] border-solid border-mediumslateblue">
                            <div className="self-stretch flex flex-row items-end justify-between">
                              <div className="relative">Reply...</div>
                              <img
                                className="w-[41.5px] relative h-[30.2px]"
                                alt=""
                                src="/vector-9.svg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch rounded-lg bg-gray-200 overflow-hidden flex flex-col items-start justify-start py-[11px] px-0">
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
                      <div className="self-stretch rounded-lg bg-gray-200 overflow-hidden flex flex-col items-start justify-start py-[11px] px-0">
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
                            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xs font-kanit text-white text-left inline-block">
                              Load Replies
                            </button>
                          </div>
                          <div className="self-stretch relative box-border h-px border-t-[1px] border-solid border-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" relative w-60 self-stretch flex flex-row items-start justify-start py-0 px-[38px] gap-[50px] md:flex-col sm:flex-col sm:gap-[50px] sm:pl-0 sm:pr-0 sm:box-border">
              <EventsBar events={postValue.events} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
