import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex h-full flex-row overflow-y-auto overflow-x-hidden lg:p-10 px-7 py-5">
        <aside className="sticky top-0 left-0 right-0 h-full flex-initial md:flex md:h-full">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </aside>

        <main className="flex-1 overflow-y-scroll">
          <section className="relative mx-auto max-w-[110rem] py-8 px-4 sm:px-4 md:pr-10 md:pl-8 lg:px-8">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
