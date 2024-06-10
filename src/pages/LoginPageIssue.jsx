// src/pages/LoginPageIssue.jsx

import React, { useState } from "react";

// src/pages/LoginPageVerify.jsx
import { Link } from "react-router-dom";
import Logo from "../assets/svg/Logo.svg";
import Rectangle1 from "../assets/svg/Rectangle1.svg";
import Rafiki from "../assets/img/rafiki.png";

const LoginPageIssue = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="text-profile">
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              src={Rectangle1}
              alt="Logo"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 hidden lg:flex items-center justify-center">
              <img
                src={Rafiki}
                alt="Rafiki"
                className="max-h-full max-w-full"
              />
            </div>
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-md lg:max-w-lg w-full">
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
                <img src={Logo} alt="Logo" className="h-10" />
              </a>

              <h1 className="my-8 text-xl font-normal text-[#03194F] sm:text-3xl md:text-4xl">
                เข้าสู่ระบบ
              </h1>

              <form action="" class=" ">
                <div class="relative mb-6 ">
                  <label class="flex items-center mb-2 text-gray-600 text-sm font-medium">
                    อีเมล
                    <svg
                      width="7"
                      height="7"
                      class="ml-1"
                      viewBox="0 0 7 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                        fill="#EF4444"
                      />
                    </svg>
                  </label>
                  <input
                    type="text"
                    id="default-search"
                    class="block w-full h-11 pr-5 px-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
                    placeholder="ระบุอีเมล"
                  />
                </div>

                <div className="relative mb-6">
                  <label className="flex items-center mb-2 text-gray-600 text-sm font-medium">
                    รหัสผ่าน
                    <svg
                      width="7"
                      height="7"
                      className="ml-1"
                      viewBox="0 0 7 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                        fill="#EF4444"
                      />
                    </svg>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="default-search"
                      className="block w-full h-11 pr-10 px-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none"
                      placeholder="ระบุรหัสผ่าน"
                      required=""
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="#9ca3af"
                            d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25"
                          />
                          <path
                            fill="#9ca3af"
                            d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="#9ca3af"
                            d="m5.24 22.51l1.43-1.42A14.06 14.06 0 0 1 3.07 16C5.1 10.93 10.7 7 16 7a12.4 12.4 0 0 1 4 .72l1.55-1.56A14.7 14.7 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68a16 16 0 0 0 4.18 6.17"
                          />
                          <path
                            fill="#9ca3af"
                            d="M12 15.73a4 4 0 0 1 3.7-3.7l1.81-1.82a6 6 0 0 0-7.33 7.33zm18.94-.07a16.4 16.4 0 0 0-5.74-7.44L30 3.41L28.59 2L2 28.59L3.41 30l5.1-5.1A15.3 15.3 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M20 16a4 4 0 0 1-6 3.44L19.44 14a4 4 0 0 1 .56 2m-4 9a13.05 13.05 0 0 1-6-1.58l2.54-2.54a6 6 0 0 0 8.35-8.35l2.87-2.87A14.54 14.54 0 0 1 28.93 16C26.9 21.07 21.3 25 16 25"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <div class="flex justify-between ">
                  <div className="">
                    {" "}
                    <div class="flex items-center">
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        value=""
                        class="w-5 h-5 cursor-pointer appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                      />
                      <label
                        for="link-checkbox"
                        class="text-sm font-normal cursor-pointer text-gray-600"
                      >
                        จำฉันในระบบ
                      </label>
                    </div>
                  </div>
                  <div>
                    <a class="text-sm font-normal text-gray-600">
                      ลืมรหัสผ่าน ?
                    </a>
                  </div>
                </div>

                <Link to="/home">
                  <div className="pt-4">
                    <button class="w-full h-12 shadow-sm rounded-md bg-[#1A3D93] hover:bg-[#1A3D93] transition-all duration-700 text-white text-base font-semibold leading-7">
                      เข้าสู่ระบบ
                    </button>
                  </div>
                </Link>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default LoginPageIssue;
