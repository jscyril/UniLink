

export default function Notifications(props){
    return(
        <div key={props.cardInfo.id} className="self-stretch rounded-lg flex flex-col items-start justify-center py-2 px-4 border-[1.5px] border-solid border-darkslategray-100">
                <div className="self-stretch flex flex-row items-center justify-between">
                  <div className="w-[136px] flex flex-row items-start justify-start gap-[0px_14px]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex flex-row items-center justify-center">
                        <div className="flex flex-row items-center justify-center">
                          <img
                            className="w-10 relative rounded-[50%] h-10 object-cover"
                            alt=""
                            src={props.cardInfo.avatar}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start py-1 px-0 gap-[12px_0px]">
                      <button className="cursor-pointer py-0.5 px-2.5 bg-[transparent] rounded-7xl overflow-hidden flex items-center justify-center border-[1px] border-solid border-mediumslateblue">
                        <div className="relative text-base font-inter text-white text-left whitespace-nowrap">{props.cardInfo.club}</div>
                      </button>
                      <div className="relative whitespace-nowrap">{props.cardInfo.heading}</div>
                    </div>
                  </div>
                  <img
                    className="w-2.5 relative rounded-[50%] h-2.5 object-cover"
                    alt=""
                    src="../public/ellipse-45@2x.png"
                  />
                </div>
              </div>
    );
}