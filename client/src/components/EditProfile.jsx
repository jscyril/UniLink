import { useEffect, useState } from "react"


export default function EditProfile(){
    const [userdata,setUserdata]=useState({});

    useEffect(()=>{
        
    })
    return(
        <div className="flex flex-row items-start justify-start lg:flex-1 md:self-stretch md:w-auto sm:self-stretch sm:w-auto">
            <div className="w-[720px] box-border flex flex-col items-center justify-start py-0 px-5 border-r-[1px] border-solid border-darkslategray-100 border-l-[1px] lg:flex-1 lg:flex-col lg:gap-[12px_30px] md:flex-1 md:flex-col sm:w-auto sm:[align-self:unset] sm:pl-0 sm:pr-0 sm:box-border">
              <div className="self-stretch flex flex-col items-center justify-start lg:self-stretch lg:w-auto md:self-stretch md:w-auto">
                <div className="self-stretch flex flex-col items-center justify-start gap-[58px]">
                  <img
                    className="w-[90px] relative h-[90px] object-cover"
                    alt=""
                    src="/profile-cardivcontainerdivprofiledivdetailsdivname@2x.png"
                  />
                  <form className="m-0 self-stretch flex flex-col items-center justify-center gap-[25px] sm:gap-[12px_25px]">
                    <div className="self-stretch flex flex-row items-center justify-center py-0 px-10 gap-[73px] sm:gap-[73px_52px] sm:pl-5 sm:pr-5 sm:box-border">
                      <div className="relative text-9xl font-inter text-white text-left sm:text-base">
                        Username:
                      </div>
                      <input
                        className="[outline:none] bg-[transparent] flex-1 relative rounded-sm box-border h-[34px] border-[1px] border-solid border-mediumslateblue text-white"
                        type="text"
                      />
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-center py-0 px-10 gap-[139px] sm:gap-[139px_90px] sm:pl-5 sm:pr-5 sm:box-border">
                      <div className="relative text-9xl font-inter text-white text-left sm:text-base">
                        Email:
                      </div>
                      <input
                        className="[outline:none] bg-[transparent] flex-1 relative rounded-sm box-border h-[34px] border-[1px] border-solid border-mediumslateblue text-white"
                        type="text"
                      />
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-center py-0 px-10 gap-[26px] sm:pl-5 sm:pr-5 sm:box-border ">
                      <div className="relative text-9xl font-inter text-white text-left sm:text-base">
                        Old Password:
                      </div>
                      <input
                        className="[outline:none] bg-[transparent] flex-1 relative rounded-sm box-border h-[34px] border-[1px] border-solid border-mediumslateblue text-white"
                        type="text"
                      />
                    </div>
                    <div className="self-stretch flex flex-row items-center justify-center py-0 px-10 gap-[12px] sm:gap-[12px_19px] sm:pl-5 sm:pr-5 sm:box-border">
                      <div className="relative text-9xl font-inter text-white text-left sm:text-base">
                        New Password:
                      </div>
                      <input
                        className="[outline:none] bg-[transparent] flex-1 relative rounded-sm box-border h-[34px] border-[1px] border-solid border-mediumslateblue"
                        type="text"
                      />
                    </div>
                  </form>
                  <button className="cursor-pointer py-1 px-2.5 bg-[transparent] rounded-8xs flex flex-row items-center justify-center border-[1px] border-solid border-mediumslateblue">
                    <div className="relative text-5xl font-inter text-mediumslateblue text-left">
                      Update
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
}