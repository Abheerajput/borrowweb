"use client"
import Image from "next/image";
import React, { useState } from "react";

import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

// --- SIMULATED API DATA ---
// In a real application, you would fetch this data using useEffect from an API endpoint.
const loanApplicationsData = [
  {
    id: 1,
    title: "Buy a Property",
    purchasePrice: 50000,
    downPayment: 10000,
    closingDate: "2025-07-26",
    incomeType: "Employed",
    status: "Pending" // User needs to upload documents
  },
  {
    id: 2,
    title: "Condo Purchase",
    purchasePrice: 150000,
    downPayment: 30000,
    closingDate: "2024-12-10",
    incomeType: "Self-Employed",
    status: "Review" // Admin needs to accept/decline
  },
  {
    id: 3,
    title: "First Home",
    purchasePrice: 220000,
    downPayment: 22000,
    closingDate: "2025-02-15",
    incomeType: "Employed",
    status: "Accepted" // Application is complete
  },
  {
    id: 4,
    title: "Investment Property",
    purchasePrice: 300000,
    downPayment: 75000,
    closingDate: "2025-03-01",
    incomeType: "Business Owner",
    status: "Declined", // Application was rejected
    declineReason: "Credit score too low for loan approval."
  },
    {
    id: 5,
    title: "Refinance Loan",
    purchasePrice: 180000,
    downPayment: 0,
    closingDate: "2024-11-20",
    incomeType: "Employed",
    status: "Review" // Another one for admin review
  }
];

// Helper function to get styling for status badges
const getStatusClasses = (status:any) => {
  switch (status.toLowerCase()) {
    case 'accepted': return 'bg-green-100 text-green-800';
    case 'declined': return 'bg-red-100 text-red-800';
    case 'pending': return 'bg-blue-100 text-blue-800';
    case 'review': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Define the Application type
interface Application {
  id: number;
  title: string;
  purchasePrice: number;
  downPayment: number;
  closingDate: string;
  incomeType: string;
  status: string;
  declineReason?: string;
}

// --- Child Component for a single Application Card ---
const ApplicationCard = ({ application }: { application: Application }) => {
  
  // Conditionally render buttons based on application status
  const renderActionButtons = () => {
    switch (application.status.toLowerCase()) {
      case 'pending':
        return (
          <div className="min-w-full flex justify-center my-4 items-center">

             <Link 
        href="/dashboard/application/uploaddocs" 
        className="text-white bg-[#013E8C] py-3 rounded-full w-full text-center hover:bg-opacity-90 transition-colors"
      >
        Upload Document
      </Link>
          </div>
        );
      case 'review':
        return (
          <div className="min-w-full gap-4 flex justify-center my-4 items-center">
            <button className="text-white bg-[#013E8C] py-3 rounded-full w-full hover:bg-opacity-90 transition-colors">Accept</button>
            <button className="border text-[#808080] py-3 rounded-full w-full hover:bg-gray-50 transition-colors">Decline</button>
          </div>
        );
      case 'accepted':
         return (
          <div className="text-center my-4 py-3 text-green-700 font-medium">
            Application Accepted
          </div>
        );
      case 'declined':
         return (
              <div className="text-center my-4 py-3">
      <p className="text-red-700 font-medium">Application Declined</p>
      {application.declineReason && (
        <p className="mt-2 text-sm text-gray-600 bg-red-50 p-2 rounded">
          Reason: {application.declineReason}
        </p>
      )}
    </div>
        );
      default:
        return null;
    }
  }
  
  return (
    <div className="max-w-md bg-white shadow-sm rounded-md border min-w-64 p-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-[#3B3B3B] text-[20px] font-semibold">{application.title}</h1>
          <span className={`px-3 py-1 text-xs flex-wrap font-bold rounded-full ${getStatusClasses(application.status)}`}>
            {application.status}
          </span>
        </div>
        <p className="text-[#808080] ">Property Value:</p>
        <div className="space-y-1 mt-2">
            <p className="flex text-[#808080] justify-between">Purchase Price: <span className="text-black font-medium">${application.purchasePrice.toLocaleString()}</span></p>
            <p className="flex text-[#808080] justify-between">Down Payment: <span className="text-black font-medium">${application.downPayment.toLocaleString()}</span></p>
            <p className="flex text-[#808080] justify-between">Closing Date: <span className="text-black font-medium">{application.closingDate}</span></p>
            <p className="flex text-[#808080] justify-between">Income Type: <span className="text-black font-medium">{application.incomeType}</span></p>
        </div>
      </div>
      <div className="mt-4">
        {renderActionButtons()}
      </div>
    </div>
  );
};


// --- Main Page Component ---
const Page = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filterStatuses = ["All", "Pending", "Review", "Accepted", "Declined"];

  const filteredApplications = loanApplicationsData.filter(app => 
    selectedStatus === "All" || app.status === selectedStatus
  );

  return (
    <div className="p-4 md:p-8">
      {/* Header and Filters */}
      <div className="flex flex-col justify-between items-start mb-8 gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl xs:flex-col xs:items-start   flex items-center font-medium text-black">
             <Link href="/dashboard/application/lender">
              <IoMdArrowRoundBack />
            </Link>
            Loan Applications</h1>
          <p className="text-gray-500">View and manage all loan applications.</p>
        </div>
        <div className="flex items-center flex-wrap gap-4 p-1 rounded-lg">
          {filterStatuses.map(status => (
            <button 
              key={status} 
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedStatus === status ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Grid */}
      <div className="min-w-full">
        {filteredApplications.length > 0 ? (
          <div className="grid xs:grid-cols-1  grid-cols-3 gap-6">
            {filteredApplications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-medium text-gray-700">No Applications Found</h3>
            <p className="text-gray-500 mt-2">There are no applications with the status "{selectedStatus}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;