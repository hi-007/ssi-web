// src/components/Navbar.jsx
import { useState } from "react";

import { Link } from "react-router-dom";
//import "../index.css";
import Logo from "../assets/svg/Logo.svg";

const NavbarIssue = () => {
  const [activeTab, setActiveTab] = useState("tabs-with-pill-1");

  return (
    <>
      <div className="bg-white mx-auto max-w-screen sm:h-auto">
        <header className="p-4 sm:px-6 lg:px-4 shadow-sm">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-4">
            <div className="flex h-14 items-center justify-between">
              <div className="md:flex md:items-center md:gap-12">
                <a className="block text-teal-600" href="#">
                  <span className="sr-only">Home</span>
                  <img src={Logo} alt="Logo" className="h-10" />
                </a>
              </div>

              <div className="hidden md:block">
                <nav className="navbar text-body">
                  <div className="tabs">
                    <div className="flex">
                      <ul className="flex bg-gray-100 rounded-3xl p-2 flex-wrap transition-all duration-300 overflow-hidden">
                        <li>
                          <Link
                            to="/home"
                            className={`inline-block py-2 px-6 text-gray-600 hover:text-gray-800 font-light ${
                              activeTab === "tabs-with-pill-1"
                              ? "bg-[#1A3D93] text-white rounded-full hover:text-white"
                              : "text-gray-600 hover:text-gray-800"
                            }`}
                            onClick={() => setActiveTab("tabs-with-pill-1")}
                            role="tab"
                          >
                            หน้าหลัก
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/organization-info"
                            className={`inline-block py-2 px-6 text-gray-600 hover:text-gray-800 font-light pointer-events-none ${
                              activeTab === "tabs-with-pill-2"
                              ? "bg-[#1A3D93] text-white rounded-full hover:text-white"
                              : "text-gray-600 hover:text-gray-800"
                            }`}
                            onClick={() => setActiveTab("tabs-with-pill-2")}
                            role="tab"
                          >
                            ข้อมูลองค์กร
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/news-info"
                            className={`inline-block py-2 px-6 pointer-events-none ${
                              activeTab === "tabs-with-pill-3"
                                ? "bg-[#1A3D93] text-white rounded-full hover:text-white"
                                : "text-gray-600 hover:text-gray-800"
                            } font-light`}
                            onClick={() => setActiveTab("tabs-with-pill-3")}
                            role="tab"
                          >
                            ข้อมูลข่าวสาร
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/faq"
                            className={`inline-block py-2 px-6 text-gray-600 hover:text-gray-800 font-light pointer-events-none ${
                              activeTab === "tabs-with-pill-4"
                              ? "bg-[#1A3D93] text-white rounded-full hover:text-white"
                              : "text-gray-600 hover:text-gray-800"
                            }`}
                            onClick={() => setActiveTab("tabs-with-pill-4")}
                            role="tab"
                          >
                            คำถามที่พบบ่อย
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/*  <div className="mt-3">
            <div
              id="tabs-with-pill-1"
              role="tabpanel"
              className={activeTab === "tabs-with-pill-1" ? "block" : "hidden"}
            >
              <p className="text-gray-500">
                This is the{" "}
                <em className="font-semibold text-gray-800">first</em>
                tab body.
              </p>
            </div>
            <div
              id="tabs-with-pill-2"
              role="tabpanel"
              className={activeTab === "tabs-with-pill-2" ? "block" : "hidden"}
            >
              <p className="text-gray-500">
                This is the{" "}
                <em className="font-semibold text-gray-800">second</em> 
                tab body.
              </p>
            </div>
            <div
              id="tabs-with-pill-3"
              role="tabpanel"
              className={activeTab === "tabs-with-pill-3" ? "block" : "hidden"}
            >
              <p className="text-gray-500">
                This is the{" "}
                <em className="font-semibold text-gray-800">third</em> 
                tab body.
              </p>
            </div>
            <div
              id="tabs-with-pill-4"
              role="tabpanel"
              className={activeTab === "tabs-with-pill-4" ? "block" : "hidden"}
            >
              <p className="text-gray-500">
                This is the{" "}
                <em className="font-semibold text-gray-800">fourth</em> 
                tab body.
              </p>
            </div>
            <div
              id="tabs-with-pill-5"
              role="tabpanel"
              className={activeTab === "tabs-with-pill-5" ? "block" : "hidden"}
            >
             
            </div>
          </div> */}
                  </div>
                </nav>
              </div>
              <div className="text-body">
                <div className="flex items-center gap-4">
                  <Link to="/profile">
                    <button
                      type="button"
                      className="py-2.5 px-6 text-sm rounded-full bg-[#1A3D93] text-white cursor-pointer font-light text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
                    >
                      ดูโปรไฟล์
                    </button>
                  </Link>
                  {/* <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavbarIssue;
