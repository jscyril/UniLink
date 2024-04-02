import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const LOGIN_URL = "/signin/";
export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  console.log(from);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      // Handle successful response
      if (response.statusText) {
        const accessToken = response?.data.accessToken;
        const user = response?.data.user;
        console.log(user);
        setAuth({ user, accessToken });
        console.log("Login successful");
        navigate(from, { replace: true });
      } 
    } catch (error) {
      if (!error?.response) {
        setError("Server did not respond");
      } else if (error.response?.status === 400) {
        setError("Invalid Username");
      } else if (error.response?.status === 401) {
        setError("Incorrect Password");
      } else {
        setError("Login Failed");
      }
    }
  };

  return (
    <div className="w-full relative h-screen flex flex-col items-start justify-start p-2.5 box-border sm:w-auto sm:[align-self:unset] sm:h-auto">
      <main className="self-stretch flex-1 bg-gray-400 overflow-hidden flex flex-col items-center justify-start px-0 sm:self-stretch sm:w-auto sm:flex-1">
        <section className="self-stretch flex-1 flex flex-col items-center justify-start gap-[30px_0px] text-left text-21xl text-mediumslateblue font-inter sm:self-stretch sm:w-auto">
          <div className="self-stretch flex flex-col items-center justify-start gap-[26px_0px] relative top-3">
            <Link to="/" className=" no-underline text-inherit">
              <div className="w-[199px] h-[55px] flex flex-row items-center justify-center py-1.5 px-[23px] box-border gap-[0px_13px]">
                <img
                  className="w-[56px] relative h-[61px] object-cover"
                  alt=""
                  src="/authenticatedivlogologo@2x.png"
                />
                <h2 className="m-0 relative text-inherit font-normal font-inherit">
                  UniLink
                </h2>
              </div>
            </Link>
            <div className="flex flex-col items-center justify-start gap-[4px_0px] text-5xl">
              <div className="flex flex-row items-start justify-start gap-[0px_60px]">
                <div className="relative">Sign In</div>
                <Link to="/signUp" className=" no-underline">
                  <div className="relative text-white">Sign Up</div>
                </Link>
              </div>
              <div className="w-[262px] relative box-border h-0.5 border-t-[2px] border-solid border-indigo-300 sm:bg-white" />
            </div>
          </div>
          <div className="rounded bg-gray-400 shadow-[0px_7px_70px_-22px_rgba(112,_125,_255,_0.25)] flex flex-col items-center justify-start pt-[15px] px-8 pb-[15px] text-justify text-5xl text-gray-600 border-[2px] border-mediumslateblue border-solid sm:self-stretch sm:w-auto sm:py-4 sm:px-3 sm:box-border">
            <div className="flex flex-col items-center justify-start gap-[36px_0px] sm:self-stretch sm:w-auto">
              <img
                className="w-[142px] relative h-[142px] object-cover sm:self-stretch sm:w-auto"
                alt=""
                src="/sign-updivsignupicon@2x.png"
              />
              <form id="signInForm" onSubmit={handleSubmit}>
                <div className="w-[390px] h-[220px] flex flex-col items-center justify-start gap-[22px_0px] sm:self-stretch sm:w-auto">
                  <div className="self-stretch flex flex-col items-center justify-start gap-[22px_0px]">
                    <div className="w-[390px] rounded-lg bg-gray-200 box-border overflow-hidden hidden flex-col items-start justify-start py-1 px-3 border-[2px] border-solid border-mediumslateblue">
                      <div className="self-stretch flex flex-row items-center justify-start gap-[0px_12px]">
                        <img
                          className="w-5 relative h-5 object-cover"
                          alt=""
                          src="/sign-updivsignupicon@2x.png"
                        />
                        <div className="relative font-light">Username</div>
                      </div>
                    </div>
                    <input
                      id="emailInputSignIn"
                      className="[outline:none] font-light font-inter text-5xl bg-gray-800 self-stretch rounded-lg overflow-hidden flex flex-col items-start justify-start py-[5px] px-[13px] text-white border-[2px] border-solid border-mediumslateblue"
                      placeholder="username"
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      required
                    />
                    <input
                      id="passwordInputSignIn"
                      className="[outline:none] font-light font-inter text-5xl bg-gray-800 self-stretch rounded-lg overflow-hidden flex flex-col items-start justify-start py-[5px] px-[13px] text-white border-[2px] border-solid border-mediumslateblue"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                  <button
                    type="submit"
                    className="cursor-pointer py-4 px-[52px] bg-mediumslateblue rounded-full shadow-[0px_4px_33px_9px_#13152c] overflow-hidden flex flex-row items-center justify-center border-[2px] border-solid border-mediumslateblue sm:py-3 sm:px-8 sm:box-border sm:border-[2px] sm:border-solid sm:border-mediumslateblue"
                  >
                    <div className="relative text-5xl font-inter text-black text-justify sm:text-base">
                      Sign In
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
