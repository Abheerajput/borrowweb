"use client"
import Image from "next/image";
import React, { useState } from "react";
import home from "../../../../../public/assets/lendercommonimg.png";
import noapplication from "../../../../../public/assets/noapplication.png";
import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";

// --- UPDATED DATA ---
const applicationss = [
  { id: 1, title: 'Buy a Property', description: 'Lowest interest as low as 4%', icon: home, status: 'Pending', link: '/dashboard/application/lender/details' },
  { id: 2, title: 'Business Loan', description: 'Competitive rates for your business.', icon: home, status: 'Accepted', link: '/dashboard/application/lender/details' },
  { id: 3, title: 'Refinance Mortgage', description: 'Lower your monthly payments.', icon: home, status: 'Declined', link: '/dashboard/application/lender/details' },
];

const Page = () => {
  const [applications, setApplications] = useState(applicationss);
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Helper function to get styling for status badges
  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted': return 'bg-green-100 dark:text-black text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return '';
    }
  };

  const filteredApplications = selectedStatus === "All"
    ? applications
    : applications.filter(app => app.status === selectedStatus);

  return (
    <div>
      {/* header */}
      <div className="flex  xs:flex-col-reverse xs:items-start xs:justify-start justify-between text-black items-center">
        <div>
          <span
            className={`p-2  text-black cursor-pointer font-semibold ${selectedStatus === "Pending" ? "text-blue-600" : " text-black"}`}
            onClick={() => setSelectedStatus("Pending")}
          >
            Pending
          </span>
          <span
            className={`p-2 cursor-pointer dark:text-black font-semibold  ${selectedStatus === "Accepted" ? "text-blue-600" : ""}`}
            onClick={() => setSelectedStatus("Accepted")}
          >
            Accepted
          </span>
          <span
            className={`p-2 cursor-pointer  dark:text-black font-semibold ${selectedStatus === "Declined" ? "text-blue-600" : ""}`}
            onClick={() => setSelectedStatus("Declined")}
          >
            Declined
          </span>
          <span
            className={`p-2 cursor-pointer dark:text-black font-semibold ${selectedStatus === "All" ? "text-blue-600" : ""}`}
            onClick={() => setSelectedStatus("All")}
          >
            All
          </span>
        </div>
        <div className="flex p-2 flex-col">
          <span className="text-[20px] font-light ">Applications</span>
        </div>
      </div>

      {filteredApplications.length > 0 ? (
        <div className="grid xs:grid-cols-1  grid-cols-3 gap-6 mt-6">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-[#FFFFFF] rounded-[20px] flex flex-col justify-between gap-4 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Top Section */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <span>
                    <Image src={app.icon} alt="Application Icon" className="w-[50px] h-[50px]" />
                  </span>
                  <span>
                    <p className="text-[16px] text-[#111827] font-semibold">{app.title}</p>
                    <p className="text-[13px] text-[#7C7C7C] font-normal">{app.description}</p>
                  </span>
                </div>
                <Link href={app.link}>
                  <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                    <IoChevronForwardSharp className="text-gray-500 w-6 h-6" />
                  </div>
                </Link>
              </div>

              {/* Status Badge */}
              <div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(app.status)}`}>
                  {app.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No applications found
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
