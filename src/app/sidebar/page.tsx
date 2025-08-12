"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaBell, FaUser, FaThList, FaTimes } from "react-icons/fa";
import logo from "../../../public/assets/borrowdirectlogo.png";
import Image from "next/image";

interface SidebarProps {
  closeSidebar?: () => void; // Used for the mobile close button
}

const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
  const [activeItem, setActiveItem] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { title: "Applications", icon: <FaThList />, path: "/dashboard/application" },
    { title: "Notifications", icon: <FaBell />, path: "/dashboard/notifications" },
    { title: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
  ];

  // This hook ensures the correct menu item is highlighted when the page loads or URL changes.
  useEffect(() => {
    const currentItem = menuItems.find(item => pathname.startsWith(item.path));
    if (currentItem) {
      setActiveItem(currentItem.title);
    }
  }, [pathname]);

  const handleNavigation = (title: string, path: string) => {
    setActiveItem(title);
    router.push(path);
    if (closeSidebar) {
      closeSidebar(); // Close the sidebar on mobile after navigation
    }
  };

  return (
    <div className="min-w-full min-h-screen  h-full p-4 rounded-xl  bg-white flex flex-col">
      {/* Header section with Logo and mobile-only close button */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex-grow">
          <Image src={logo} alt="logo" width={160} priority />
        </div>
        
        {/* The close button is ONLY visible on small screens (the inverse of sm) */}
        <button onClick={closeSidebar} className="text-gray-600 mt-[-50px] text-2xl md:hidden lg:hidden xl:hidden sm:hidden">
          <FaTimes />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-3">
        {menuItems.map(({ title, icon, path }) => (
          <li
            key={title}
            onClick={() => handleNavigation(title, path)}
            className={`cursor-pointer px-4 py-3 rounded-lg flex items-center gap-3 transition-colors duration-200 ${
              activeItem === title
                ? "bg-[#013E8C] text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg w-6 text-center">{icon}</span>
            <span className="font-medium">{title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
// "use client";
// import React, { useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { FaBell, FaUser, FaThList, FaTimes } from "react-icons/fa";
// import logo from "../../../public/assets/borrowdirectlogo.png";
// import Image from "next/image";

// interface SidebarProps {
//   closeSidebar?: () => void; // for mobile
// }

// const Sidebar: React.FC<SidebarProps> = ({ closeSidebar }) => {
//   const [activeItem, setActiveItem] = useState<string>("");
//   const router = useRouter();
//   const pathname = usePathname();

//   // This useEffect ensures the correct item is highlighted on page load/refresh
//   useEffect(() => {
//     const currentPath = "/" + pathname.split('/')[1] + "/" + pathname.split('/')[2];
//     const activeMenu = menuItems.find(item => item.path === currentPath);
//     if(activeMenu) {
//         setActiveItem(activeMenu.title);
//     }
//   }, [pathname]);

//   const menuItems = [
//     { title: "Applications", icon: <FaThList />, path: "/dashboard/application" },
//     { title: "Notifications", icon: <FaBell />, path: "/dashboard/notifications" },
//     { title: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
//   ];

//   const handleNavigation = (title: string, path: string) => {
//     setActiveItem(title);
//     router.push(path);
//     if (closeSidebar) closeSidebar();
//   };

//   return (
//     <div className="w-full h-full p-4 bg-white flex flex-col">
//       {/* Header: Logo and Mobile Close Button */}
//       <div className="flex justify-between items-center mb-8">
//         {/* Logo container that centers on desktop */}
//         <div className="flex-grow flex justify-center sm:justify-start">
//           <Image src={logo} alt="logo" width={160} style={{ width: 'auto', height: 'auto' }} priority />
//         </div>
        
//         {/* Mobile-only Close button, hidden on desktop */}
//         <button onClick={closeSidebar} className="text-gray-600 text-2xl sm:hidden">
//           <FaTimes />
//         </button>
//       </div>

//       <ul className="space-y-4">
//         {menuItems.map(({ title, icon, path }) => (
//           <li
//             key={title}
//             onClick={() => handleNavigation(title, path)}
//             className={`cursor-pointer px-4 py-3 rounded-lg flex items-center gap-3 transition-colors duration-200 ${
//               activeItem === title
//                 ? "bg-[#013E8C] text-white"
//                 : "text-[#595959] hover:bg-gray-100"
//             }`}
//           >
//             <span className="text-lg">{icon}</span>
//             <span className="font-medium">{title}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;














// import React, { useState } from "react";
// import Image from "next/image";
// import application from "../../../public/assets/application.png";
// import profile from "../../../public/assets/profile.png";
// import notification from "../../../public/assets/notification.png";

// const Sidebar: React.FC = () => {
//   const [activeItem, setActiveItem] = useState<string>("");

//   const menuItems = [
//     { title: "Applications", icon: application },
//     { title: "Notifications", icon: notification },
//     { title: "Profile", icon: profile },
//   ];

//   return (
//     <div className="w-[18%] rounded-[20px] bg-[#FFFFFF] text-white min-h-screen p-4">
//       <ul className="space-y-4 w-[70%]">
//         {menuItems.map(({ title, icon }) => (
//           <li
//             key={title}
//             onClick={() => setActiveItem(title)}
//             className={`cursor-pointer px-3 py-2 rounded flex items-center gap-3
//               ${
//                 activeItem === title
//                   ? "bg-[#013E8C] text-white"
//                   : "text-[#595959] hover:text-gray-700"
//               }`}
//           >
//             <Image src={icon} alt={`${title} icon`} width={20} height={20} />
//             <span>{title}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };


// export default Sidebar;

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaBell, FaUser, FaThList } from "react-icons/fa";
// import logo from "../../../public/assets/borrowdirectlogo.png";
// import Image from "next/image";

// const Sidebar: React.FC = () => {
//   const [activeItem, setActiveItem] = useState<string>("");
//   const router = useRouter();

//   // Menu items with icons and paths
//   const menuItems = [
//     { title: "Applications", icon: <FaThList />, path: "/dashboard/application"  },
//     { title: "Notifications", icon: <FaBell />, path: "/dashboard/notifications" },
//     { title: "Profile", icon: <FaUser />, path: "/dashboard/profile" },
//   ];

//   const handleNavigation = (title: string, path: string) => {
//     setActiveItem(title);
//     router.push(path);
//   };

//   return (
//     <div className="w-[22%] max-h-[800px] rounded-[20px] bg-[#FFFFFF] text-white min-h-screen p-4">
//       <ul className="space-y-4 w-[90%]">
//         <Image src={logo} alt="logo" className="mx-4 my-8" />
//         {menuItems.map(({ title, icon, path }) => (
//           <li
//             key={title}
//             onClick={() => handleNavigation(title, path)}
//             className={`cursor-pointer px-4 w-full py-2 rounded flex items-center gap-2
//               ${
//                 activeItem === title
//                   ? "bg-[#013E8C] text-white"
//                   : "text-[#595959] hover:text-gray-700"
//               }`}
//           >
//             <span className="text-lg">{icon}</span>
//             <span>{title}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
