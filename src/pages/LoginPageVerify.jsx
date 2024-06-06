// src/pages/LoginPageVerify.jsx
import { Link } from "react-router-dom";
import LogoVertex from "../assets/svg/LogoVertex.svg";

const LoginPageVerify = () => {
  return (
    <div className="text-profile">
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <a className="block text-blue-600" href="#">
                <span className="sr-only">Home</span>
                <img src={LogoVertex} alt="Logo" className="h-10" />
              </a>

              <h1 className="mt-6 text-2xl font-bold text-[#03194F] sm:text-3xl md:text-4xl">
                เข้าสู่ระบบ
              </h1>

              <div className="w-96">
                <form action="" class="lg:p-16 p-6 ">
                  <div class="relative mb-6">
                    <label class="flex  items-center mb-2 text-gray-600 text-sm font-medium">
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

                  <div class="relative mb-6">
                    <label class="flex  items-center mb-2 text-gray-600 text-sm font-medium">
                      รหัสผ่าน{" "}
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
                      placeholder="ระบุรหัสผ่าน"
                      required=""
                    />
                  </div>
                  <div class="flex items-center my-6">
                    <input
                      id="checkbox-policy"
                      type="checkbox"
                      value=""
                      class="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-indigo-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-indigo-500 checked:bg-indigo-100"
                    />
                    <label
                      for="checkbox-policy"
                      class="text-sm font-normal text-gray-600"
                    >
                      จำฉันในระบบ
                    </label>
                  </div>
                  <Link to="/homeverify">
                    <button class="w-full h-12 shadow-sm rounded-md bg-[#1A3D93] hover:bg-[#1A3D93] transition-all duration-700 text-white text-base font-semibold leading-7">
                      เข้าสู่ระบบ
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default LoginPageVerify;
