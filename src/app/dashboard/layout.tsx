"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar/page";
import { FaBars } from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-w-full min-h-screen  bg-[#F7F7F7] ">
      {/* Sidebar Container */}
      <div
        className={`fixed   bg-[#F7F7F7] xs:bg-white  px-[1%]  py-[3%] gap-4  min-h-screen xs:w-[60%] w-[20%]  z-50  transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:static sm:translate-x-0 md:static rounded-xl md:translate-x-0 lg:static lg:translate-x-0 xl:static xl:translate-x-0`} // sm: applies to sm, md, lg, xl
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile-only overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 sm:hidden md:hidden lg:hidden xl:hidden" // sm:hidden hides it on all larger screens
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col w-full">
        {/* Top Bar for mobile screens ONLY */}
        <div className="p-4 bg-white shadow-sm  md:hidden lg:hidden xl:hidden sm:hidden sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-black text-lg">Dashboard</h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl text-gray-700 p-2"
            >
              <FaBars />
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="px-4 w-full  py-[3%] bg-[#F7F7F7]">
            {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

// import React from "react";
// import Sidebar from "../sidebar/page";

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div className="flex bg-[#F7F7F7] px-[4%] py-[2%] gap-4  min-h-screen">
//       <Sidebar />
//       <main className="px-4 w-4/5 bg-[#F7F7F7]">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default Layout;
