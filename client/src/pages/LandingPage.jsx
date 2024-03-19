import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="w-full relative h-screen overflow-hidden flex flex-col items-center justify-center bg-[url('/landing-page-unilink@3x.png')] bg-cover bg-no-repeat bg-[top]">
      <section className="self-stretch flex-1 flex flex-col items-center justify-center gap-[120px_0px] text-center text-[56px] text-white font-kanit">
        <div className="self-stretch flex flex-row items-start justify-between">
          <header className="w-[386px] h-20 flex flex-row items-center justify-center relative top-[12px]">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] w-[68px] relative shadow-[5px_9px_13.2px_rgba(14,_18,_110,_0.33)] h-[73.6px]">
              <img
                className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full object-cover"
                alt=""
                src="/vector@2x.png"
              />
            </button>
            <div className="w-[100px] h-20 overflow-hidden shrink-0 flex flex-col items-center justify-end ml-[-8px]">
              <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-10xl font-kanit text-white text-left inline-block">
                UniLink
              </button>
            </div>
            <div className="w-[100px] relative h-20 overflow-hidden shrink-0 ml-[-8px]" />
          </header>
          <nav className="m-0 self-stretch w-[486px] flex flex-row items-center justify-center p-2.5 box-border gap-[0px_38px]">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-10xl font-extralight font-kanit text-white text-left inline-block">
              Support
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-10xl font-extralight font-kanit text-white text-left inline-block">
              About
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-10xl font-extralight font-kanit text-white text-left inline-block">
              Contact us
            </button>
          </nav>
        </div>
        <div className="self-stretch h-[520px] flex flex-col items-center justify-start">
          <div className="flex-1 flex flex-col items-center justify-center gap-[52px_0px] sm:self-stretch sm:w-auto">
            <h2 className="m-0 w-[870px] relative text-inherit leading-[53.2px] uppercase font-extralight font-inherit inline-block">
              Discover, Engage, and Connect...
            </h2>
            <div className="self-stretch overflow-hidden flex flex-col items-end justify-center text-xl">
              <p className="m-0 self-stretch relative leading-[32.5px] font-medium sm:hidden">
                Explore a diverse range of sub-communities tailored to your
                interests, clubs, events, academic disciplines, and
                extracurricular activities. From sports enthusiasts to coding
                wizards, find your niche and start meaningful discussions.
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-[0px_72px]">
              <Link to="/signin" className="no-underline cursor-pointer">
                <button className="[border:none] cursor-pointer rounded-12xl py-3 px-[72px] bg-white rounded-30xl overflow-hidden flex flex-row items-center justify-center hover:animate-[1s_ease_0s_infinite_normal_none_shadow-inset-center] hover:opacity-[1]">
                  <div className=" no-underline relative text-mid font-inter text-black text-left">
                    Login
                  </div>
                </button>
              </Link>

              <Link to="/signup" className=" no-underline cursor-pointer">
                <button className="[border:none] cursor-pointer rounded-12xl py-3 px-[72px] bg-black rounded-30xl overflow-hidden flex flex-row items-center justify-center hover:animate-[1s_ease_0s_infinite_normal_none_shadow-inset-center] hover:opacity-[1]">
                  <div className="  relative text-mid font-inter text-white text-left">
                    Sign up
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
