import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  const trigger = React.useRef(null);
  const sidebar = React.useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded] = React.useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const navigateToFeaturedPage = () => {
    navigate("/featured-projects");
  };

  React.useEffect(() => {
    const clickHandler = (event) => {
      const target = event.target;
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  React.useEffect(() => {
    const keyHandler = (keyCode) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  React.useEffect(() => {
    localStorage.setItem("sidebar-expanded", JSON.stringify(sidebarExpanded));
    const bodyElement = document.querySelector("body");
    if (bodyElement) {
      if (sidebarExpanded) {
        bodyElement.classList.add("sidebar-expanded");
      } else {
        bodyElement.classList.remove("sidebar-expanded");
      }
    }
  }, [sidebarExpanded]);
  return (
    <div
      id="sidebar"
      ref={sidebar}
      className={`flex flex-col absolute opacity-1 z-50 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-full overflow-y-hidden lg:overflow-y-hidden w-60 lg:w-60 lg:sidebar-expanded:!w-64 2xl:!w-60 shrink-0 bg-white dark:bg-[#121212] border-r border-slate-200 dark:border-slate-700 p-4 transition-all duration-200 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-64"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        setSidebarOpen(!sidebarOpen);
      }}
    >
      <div className="flex flex-col h-full justify-between mb-2 mt-4 pr-3 sm:px-2 overflow-y-scroll hide-scrollbar">
        <div className="space-y-8 flex-1">
          <div className="">
            <ul className="mt-0">
              <li
                className={`px-3 py-2 rounded-md mb-0.5 last:mb-0 ${
                  pathname.includes("overview") &&
                  "bg-[#252063] dark:bg-[#1D9BF0]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/overview"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("overview")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("overview") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("overview") && "text-white"
                      }`}
                    >
                      Overview
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("projects") &&
                  "bg-[#252063] dark:bg-[#1D9BF0]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/projects"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("projects")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("projects") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("projects") && "text-white"
                      }`}
                    >
                      Projects
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("donors") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/donors"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("donors")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("donors") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("donors") && "text-white"
                      }`}
                    >
                      Donors
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("updates") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/updates"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("updates")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("updates") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("updates") && "text-white"
                      }`}
                    >
                      Updates
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("comments") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/comments"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("comments")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("comments") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("comments") && "text-white"
                      }`}
                    >
                      Comments
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("withdrawals") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/withdrawals"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("withdrawals")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("withdrawal") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("withdrawals") && "text-white"
                      }`}
                    >
                      Withdrawals
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("perks") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/user-roles"
                  className={`block truncate transition duration-150 py-2 px-3 rounded-md ${
                    pathname.includes("user")
                      ? "hover:text-slate-200 bg-gray-100"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("user") && "text-[#0D6EFD]"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("user") && "text-[#0D6EFD]"
                      }`}
                    >
                      Users and Roles
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("backedProjects") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/backedProjects"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("backed-projects")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("backedProjects") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("backedProjects") && "text-white"
                      }`}
                    >
                      Backed Projects
                    </span>
                  </div>
                </NavLink>
              </li>

              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("statistics") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/statistics"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("statistics")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("statistics") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("statistics") && "text-white"
                      }`}
                    >
                      Statistics
                    </span>
                  </div>
                </NavLink>
              </li>

              <li
                className={`px-3 py-2 rounded-md mt-5 mb-0.5 last:mb-0 ${
                  pathname.includes("backedProjects") && "bg-[#252063]"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard/backedProjects"
                  className={`block truncate transition duration-150 ${
                    pathname.includes("backed-projects")
                      ? "hover:text-slate-200"
                      : "hover:text-black"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={`w-4 h-4 ${
                        pathname.includes("backedProjects") && "text-white"
                      } dark:text-white`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    <span
                      className={`text-xs text-black dark:text-white font-medium ml-3 2xl:opacity-100 duration-200 ${
                        pathname.includes("backedProjects") && "text-white"
                      }`}
                    >
                      Backed Projects
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          className="bg-white border border-[#475569] shadow-lg rounded-md py-2 text-xs text-[#475569] mt-20 px-4 flex items-center gap-4"
          onClick={navigateToFeaturedPage}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.75 1.6875H1.6875V1.75V14.25V14.3125H1.75H6.125C6.27419 14.3125 6.41726 14.3718 6.52275 14.4773C6.62824 14.5827 6.6875 14.7258 6.6875 14.875C6.6875 15.0242 6.62824 15.1673 6.52275 15.2727C6.41726 15.3782 6.27419 15.4375 6.125 15.4375H1.75C1.43506 15.4375 1.13301 15.3124 0.910311 15.0897C0.687611 14.867 0.5625 14.5649 0.5625 14.25V1.75C0.5625 1.43506 0.687611 1.13301 0.910311 0.910311C1.13301 0.687611 1.43506 0.5625 1.75 0.5625H6.125C6.27418 0.5625 6.41726 0.621763 6.52275 0.727253C6.62824 0.832742 6.6875 0.975816 6.6875 1.125C6.6875 1.27418 6.62824 1.41726 6.52275 1.52275C6.41726 1.62824 6.27418 1.6875 6.125 1.6875H1.75ZM15.273 7.60201L15.273 7.60203C15.3253 7.65427 15.3668 7.71631 15.3951 7.7846C15.4234 7.85288 15.438 7.92608 15.438 8C15.438 8.07392 15.4234 8.14712 15.3951 8.2154C15.3668 8.28369 15.3253 8.34573 15.273 8.39797L15.273 8.39799L12.148 11.523C12.0424 11.6285 11.8993 11.6878 11.75 11.6878C11.6007 11.6878 11.4576 11.6285 11.352 11.523C11.2465 11.4174 11.1872 11.2743 11.1872 11.125C11.1872 10.9757 11.2464 10.8326 11.352 10.727C11.352 10.727 11.352 10.727 11.352 10.727L13.4106 8.6692L13.5173 8.5625H13.3664H6.125C5.97582 8.5625 5.83274 8.50324 5.72725 8.39775C5.62176 8.29226 5.5625 8.14918 5.5625 8C5.5625 7.85082 5.62176 7.70774 5.72725 7.60225C5.83274 7.49676 5.97582 7.4375 6.125 7.4375H13.3664H13.5173L13.4106 7.3308L11.352 5.27299C11.2465 5.16744 11.1872 5.02428 11.1872 4.875C11.1872 4.72572 11.2465 4.58256 11.352 4.47701C11.4576 4.37145 11.6007 4.31215 11.75 4.31215C11.8993 4.31215 12.0424 4.37145 12.148 4.47701L15.273 7.60201Z"
              fill="#475569"
              stroke="#475569"
              stroke-width="0.125"
            />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
