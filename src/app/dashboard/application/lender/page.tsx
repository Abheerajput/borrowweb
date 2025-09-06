"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";
import home from "../../../../../public/assets/lendercommonimg.png";
import noapplication from "../../../../../public/assets/noapplication.png";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Application {
  _id: string;
  title: string;
  description: string;
  status: string;
  link: string;
  icon: any;
}

const Page = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [declineReason, setDeclineReason] = useState<string>("");
const handleDecline = async (app: Application) => {
  const reason = prompt("Enter reason for declining this application:");
  if (!reason) return;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized");
      return;
    }

    await axios.post(
      "https://bdapi.testenvapp.com/api/v1/decline",
      { id: app._id, declineReason: reason },
      {
        headers: { Authorization: `${token}` },
      }
    );

    alert("Application declined successfully");

    // Update local state to reflect decline immediately
    setApplications((prev) =>
      prev.map((a) =>
        a._id === app._id
          ? { ...a, status: "Declined", declineReason: reason }
          : a
      )
    );
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to decline application");
  }
};

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/"); 
          return;
        }

        const response = await axios.get(
          "https://bdapi.testenvapp.com/api/v1/appliction-listing",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          const data = response.data.data;

          // Flatten grouped applications
          const apps: Application[] = [];
          Object.keys(data).forEach((type) => {
            data[type].forEach((group: any) => {
              group.data.forEach((item: any) => {
                apps.push({
                  _id: item.application._id,
                  title: item.application.basicDetails?.[0]?.lookingToData?.label || type,
                  description: item.application.basicDetails?.[0]?.alreadyPropertydata?.label || "",
                  status: item.status || "pending",
                  link: `/dashboard/application/lender/details/${item.application._id}`,
                  icon: home,
                });
              });
            });
          });

          setApplications(apps);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  const filteredApplications =
    selectedStatus === "All"
      ? applications
      : applications.filter(
          (app) => app.status?.toLowerCase() === selectedStatus.toLowerCase()
        );

  const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 dark:text-black text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  const handleCardClick = (app: Application) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedApplication", JSON.stringify(app));
    localStorage.setItem("applicationId", app._id); // use app._id directly
  }
  router.push(`/dashboard/application/lender/details/${app._id}`);
};


  return (
    <div>
      {/* Header */}
      <div className="flex xs:flex-col-reverse xs:items-start xs:justify-start justify-between text-black items-center">
        <div>
          {["Pending", "Accepted", "Declined", "All"].map((status) => (
            <span
              key={status}
              className={`p-2 cursor-pointer font-semibold ${
                selectedStatus === status ? "text-blue-600" : "text-black"
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              {status}
            </span>
          ))}
        </div>
        <div className="flex p-2 flex-col">
          <span className="text-[20px] font-light">Applications</span>
        </div>
      </div>

      {loading ? (
        <p className="mt-4 text-center text-black">Loading...</p>
      ) : error ? (
        <p className="mt-4 text-center text-red-500">{error}</p>
      ) : filteredApplications.length > 0 ? (
        <div className="grid xs:grid-cols-1 grid-cols-3 gap-6 mt-6">
          {filteredApplications.map((app) => (
 <div
  key={app._id}
  className="bg-[#FFFFFF] rounded-[20px] flex flex-col justify-between gap-4 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
  onClick={() => handleCardClick(app)}
>
  <div className="flex justify-between items-start">
    <div className="flex items-center gap-4">
      <span>
        <Image
          src={app.icon || home}
          alt="Application Icon"
          className="w-[50px] h-[50px]"
        />
      </span>
      <span>
        <p className="text-[16px] text-[#111827] font-semibold">{app.title}</p>
        <p className="text-[13px] text-[#7C7C7C] font-normal">{app.description}</p>
      </span>
    </div>
    <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
      <IoChevronForwardSharp className="text-gray-500 w-6 h-6" />
    </div>
  </div>

  <div>
  
    {["review", "pending"].includes(app.status.toLowerCase()) && (
      <div className="min-w-full gap-4 flex flex-col xs:flex-row justify-center my-4 items-center">
        <button
          className="text-white bg-[#013E8C] py-2 rounded-full w-1/2 hover:bg-opacity-90 transition-colors"
          onClick={(e) => {
            e.stopPropagation(); 
            alert("Accept API call here"); 
          }}
        >
          Accept
        </button>
        <button
          className="border text-[#808080] py-2 rounded-full w-1/2  hover:bg-gray-50 transition-colors"
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            handleDecline(app);
          }}
        >
          Decline
        </button>
      </div>
    )}
  </div>

  <div>
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
        app.status
      )}`}
    >
      {app.status}
    </span>
  </div>
</div>

))}

        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <span>
            <Image src={noapplication} alt="No applications found" />
          </span>
          <span className="mt-4 flex flex-col items-center">
            <p className="text-[18px] text-[#111827] font-medium">No ongoing applications.</p>
            <p className="text-[#013E8C] text-[22px] font-semibold">Ready to apply? Start a new one now.</p>
          </span>
        </div>
      )}
    </div>
  );
};

export default Page;










// "use client"
// import Image from "next/image";
// import React, { useState } from "react";
// import home from "../../../../../public/assets/lendercommonimg.png";
// import noapplication from "../../../../../public/assets/noapplication.png";
// import Link from "next/link";
// import { IoChevronForwardSharp } from "react-icons/io5";

// // --- UPDATED DATA ---
// const applicationss = [
//   { id: 1, title: 'Buy a Property', description: 'Lowest interest as low as 4%', icon: home, status: 'Pending', link: '/dashboard/application/lender/details' },
//   { id: 2, title: 'Business Loan', description: 'Competitive rates for your business.', icon: home, status: 'Accepted', link: '/dashboard/application/lender/details' },
//   { id: 3, title: 'Refinance Mortgage', description: 'Lower your monthly payments.', icon: home, status: 'Declined', link: '/dashboard/application/lender/details' },
// ];

// const Page = () => {
//   const [applications, setApplications] = useState(applicationss);
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   // Helper function to get styling for status badges
//   const getStatusClasses = (status:any) => {
//     switch (status.toLowerCase()) {
//       case 'accepted': return 'bg-green-100 dark:text-black text-green-800';
//       case 'declined': return 'bg-red-100 text-red-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       default: return '';
//     }
//   };

//   const filteredApplications = selectedStatus === "All"
//     ? applications
//     : applications.filter(app => app.status === selectedStatus);

//   return (
//     <div>
//       {/* header */}
//       <div className="flex  xs:flex-col-reverse xs:items-start xs:justify-start justify-between text-black items-center">
//         <div>
//           <span
//             className={`p-2  text-black cursor-pointer font-semibold ${selectedStatus === "Pending" ? "text-blue-600" : " text-black"}`}
//             onClick={() => setSelectedStatus("Pending")}
//           >
//             Pending
//           </span>
//           <span
//             className={`p-2 cursor-pointer dark:text-black font-semibold  ${selectedStatus === "Accepted" ? "text-blue-600" : ""}`}
//             onClick={() => setSelectedStatus("Accepted")}
//           >
//             Accepted
//           </span>
//           <span
//             className={`p-2 cursor-pointer  dark:text-black font-semibold ${selectedStatus === "Declined" ? "text-blue-600" : ""}`}
//             onClick={() => setSelectedStatus("Declined")}
//           >
//             Declined
//           </span>
//           <span
//             className={`p-2 cursor-pointer dark:text-black font-semibold ${selectedStatus === "All" ? "text-blue-600" : ""}`}
//             onClick={() => setSelectedStatus("All")}
//           >
//             All
//           </span>
//         </div>
//         <div className="flex p-2 flex-col">
//           <span className="text-[20px] font-light ">Applications</span>
//         </div>
//       </div>

//       {filteredApplications.length > 0 ? (
//         <div className="grid xs:grid-cols-1  grid-cols-3 gap-6 mt-6">
//           {filteredApplications.map((app) => (
//             <div
//               key={app.id}
//               className="bg-[#FFFFFF] rounded-[20px] flex flex-col justify-between gap-4 p-4 shadow-sm hover:shadow-md transition-shadow"
//             >
//               {/* Card Top Section */}
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-4">
//                   <span>
//                     <Image src={app.icon} alt="Application Icon" className="w-[50px] h-[50px]" />
//                   </span>
//                   <span>
//                     <p className="text-[16px] text-[#111827] font-semibold">{app.title}</p>
//                     <p className="text-[13px] text-[#7C7C7C] font-normal">{app.description}</p>
//                   </span>
//                 </div>
//                 <Link href={app.link}>
//                   <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
//                     <IoChevronForwardSharp className="text-gray-500 w-6 h-6" />
//                   </div>
//                 </Link>
//               </div>

//               {/* Status Badge */}
//               <div>
//                 <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(app.status)}`}>
//                   {app.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         // No applications found
//         <div className="mt-12 flex flex-col items-center justify-center text-center">
//           <span>
//             <Image src={noapplication} alt="No applications found" />
//           </span>
//           <span className="mt-4 flex flex-col items-center">
//             <p className="text-[18px] text-[#111827] font-medium">No ongoing applications.</p>
//             <p className="text-[#013E8C] text-[22px] font-semibold">Ready to apply? Start a new one now.</p>
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;
