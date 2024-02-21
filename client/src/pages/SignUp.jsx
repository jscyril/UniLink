import { Link } from "react-router-dom";
export default function SignUp() {
  return (
    <div className="w-full relative h-[1201px] flex flex-col items-start justify-start sm:w-auto sm:[align-self:unset] sm:h-auto">
      <main className="self-stretch flex-1 bg-gray-400 overflow-hidden flex flex-col items-center justify-start py-[115px] px-0 sm:self-stretch sm:w-auto sm:flex-1">
        <section className="self-stretch flex-1 flex flex-col items-center justify-start gap-[30px_0px] text-left text-21xl text-mediumslateblue font-inter sm:self-stretch sm:w-auto">
          <div className="self-stretch flex flex-col items-center justify-start gap-[26px_0px]">
            <Link to="/" className=" no-underline text-inherit">
            <div className="w-[199px] h-[55px] flex flex-row items-center justify-center py-1.5 px-[23px] box-border gap-[0px_13px]">
              <img
                className="w-[66px] relative h-[71px] object-cover"
                alt=""
                src="/authenticatedivlogologo@2x.png"
              />
              <h2 className="m-0 relative text-inherit font-normal font-inherit">
                UniLink
              </h2>
            </div></Link>
            <div className="flex flex-col items-center justify-start gap-[4px_0px] text-5xl text-white">
              <div className="flex flex-row items-start justify-start gap-[0px_60px]">
              <Link to="/signIn" className=" text-inherit no-underline">
                <div className="relative">Sign In</div></Link>
                <div className="relative text-mediumslateblue">Sign Up</div>
              </div>
              <div className="w-[262px] relative [background:linear-gradient(90deg,_#fff,_#707dff)] box-border h-0.5 border-t-[2px] border-solid border-white sm:bg-white" />
            </div>
          </div>
          <div className="rounded-11xl bg-gray-400 shadow-[0px_7px_70px_-22px_rgba(112,_125,_255,_0.25)] flex flex-col items-center justify-start pt-[55px] px-14 pb-[85px] border-[1px] border-solid border-darkslateblue sm:self-stretch sm:w-auto sm:py-4 sm:px-3 sm:box-border">
            <div className="flex flex-col items-center justify-start gap-[36px_0px] sm:self-stretch sm:w-auto">
              <img
                className="w-[142px] relative h-[142px] object-cover sm:self-stretch sm:w-auto"
                alt=""
                src="/sign-updivsignupicon@2x.png"
              />
              <form id="signupForm">
                <div className="w-[390px] h-[220px] flex flex-col items-center justify-start gap-[22px_0px] sm:self-stretch sm:w-auto">
                  <div className="self-stretch flex flex-col items-center justify-start gap-[22px_0px]">
                    <input
                      id="usernameInput"
                      className="[outline:none] font-light font-inter text-5xl bg-gray-800 self-stretch rounded-lg overflow-hidden flex flex-col items-start justify-start py-1 px-3 text-gray-600 border-[2px] border-solid border-mediumslateblue"
                      placeholder="Username"
                      type="text"
                    />
                    <input
                      id="emailInput"
                      className="[outline:none] font-light font-inter text-5xl bg-gray-800 self-stretch rounded-lg overflow-hidden flex flex-col items-start justify-start py-[5px] px-[13px] text-gray-600 border-[2px] border-solid border-mediumslateblue"
                      placeholder="Email address"
                      type="text"
                    />
                    <input
                      id="passwordInput"
                      className="[outline:none] font-light font-inter text-5xl bg-gray-800 self-stretch rounded-lg overflow-hidden flex flex-col items-start justify-start py-[5px] px-[13px] text-gray-600 border-[2px] border-solid border-mediumslateblue"
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                  <Link to="/home" className=" no-underline text-inherit">
                  <button
                    type="submit"
                    className="cursor-pointer rounded-full py-4 px-[52px] bg-mediumslateblue rounded-9xl shadow-[0px_4px_33px_9px_#13152c] overflow-hidden flex flex-row items-center justify-center border-[2px] border-solid border-mediumslateblue sm:py-3 sm:px-8 sm:box-border sm:border-[2px] sm:border-solid sm:border-mediumslateblue">
                    <div className="relative text-5xl font-inter text-black text-justify sm:text-base">
                      Sign Up
                    </div>
                  </button></Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
