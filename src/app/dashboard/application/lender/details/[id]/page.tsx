"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import home from "../../../../../public/assets/lendercommonimg.png"; // Assuming this path is correct

// Re-using your InnerApplication from the previous file for better typing
interface InnerApplication {
  _id: { $oid: string }; // Updated to match your JSON structure
  userId: { $oid: string }; // Updated to match your JSON structure
  basicDetails: {
    lookingToData?: { id: number; label: string };
    alreadyPropertydata?: { id: number; label: string };
    downpayment?: string;
    closingDate?: string;
    propertyUsedData?: { id: number; label: string };
    propertyAddress?: string;
    manualAdress?: string | null;
    realtorData?: { id: number; label: string };
    propertyValue?: string | null;
    mortgageBalance?: string | null;
    firstPropertyData?: string | null;
    purchasePrice?: string;
    downPayment?: string;
    realtorReferData?: { id: number; label: string };
    realtorFirstName?: string;
    realtorLastName?: string;
    realtorCompanyName?: string;
    realtorEmail?: string;
    realtorPhoneNumber?: string;
    [key: string]: any;
  }[];
  borrowers: {
    BorrowersData: {
      borrower1: {
        firstName?: string;
        middleName?: string;
        lastName?: string;
        email?: string;
        cellPhone?: string;
        homePhone?: string;
        workPhone?: string;
        sinNumber?: string;
        manualAddress?: string;
        rent?: string;
        dateOfBirth?: string;
        maritialStatus?: string;
        numOfDependents?: string;
        googleAdress?: string;
        living?: { id: number; label: string };
        startLiving?: string;
        [key: string]: any;
      };
      [key: string]: any; // For other borrowers if they exist
    };
    [key: string]: any;
  }[];
  documents: {
    id: number;
    name: string;
    uploadedData: {
      primaryImageFront?: string;
      primaryImageBack?: string;
      secondaryImageFront?: string;
      secondaryImageBack?: string;
    };
    [key: string]: any;
  }[];
  income: {
    typeOfIncome?: { id: number; title: string; image: number };
    currentEmployment?: { id: number; label: string };
    companyName?: string;
    jobTitle?: string;
    workOftenData?: { id: number; label: string };
    bonusOvertime?: { id: number; label: string };
    benifits?: { id: number; label: string };
    annualIncome?: string;
    workedYear?: string;
    workedMonth?: string;
    startworking?: string;
    stopworking?: string;
    [key: string]: any;
  }[];
  assets: {
    assetType?: { id: number; title: string; image: number };
    valueOfAsset?: string;
    assetDiscription?: string;
    [key: string]: any;
  }[];
  properties: {
    sellingPlan?: { id: number; label: string };
    proceeds?: string;
    mortgageTypeData?: { id: number; label: string };
    lender?: string;
    currentRate?: string;
    oftenPayments?: string;
    payments?: string;
    balance?: string;
    due?: string;
    mortgage?: { id: number; label: string };
    [key: string]: any;
  }[];
  referral: {
    refer?: { id: number; label: string };
    firstName?: string;
    lastName?: string;
    companyName?: string;
    email?: string;
    phoneNumber?: string;
    referEmail?: string;
    refferalTypeData?: { id: number; label: string };
    [key: string]: any;
  }[];
  currentState: number;
  requestCounts: number;
  isAccepted: string;
  isCompleted: number;
 
}

// Ensure ApplicationDoc matches the structure you're saving in localStorage
export interface ApplicationDoc {
  _id: string;
  applicationId: string;
  lenderId: string;
  status: string;
  title: string;
  description: string;
  declineReason: string | null;
 
  icon?: any;
  application: InnerApplication; // Use the full InnerApplication interface
}


// Status badge helper
const getStatusClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case "accepted":
      return "bg-green-100 text-green-800";
    case "decline":
      return "bg-red-100 text-red-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Helper function to format currency
const formatCurrency = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined || value === "") return "N/A";
    const num = parseFloat(value.toString());
    if (isNaN(num)) return value.toString();
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(num); // Assuming Canadian dollars
};

// Helper component for displaying a single detail row
const DetailRow = ({ label, value }: { label: string; value: any }) => {
  // Handle MongoDB $oid and $date objects
  if (value && typeof value === 'object' && value.$oid) {
    value = value.$oid;
  } else if (value && typeof value === 'object' && value.$date) {
    value = value.$date;
  }

  if (value === null || value === undefined || value === "") return null; // Don't show empty fields

  let displayValue;
  // Special formatting for dates
  if (typeof value === "string" && (label.toLowerCase().includes("date") || label.toLowerCase().includes("working"))) {
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        displayValue = date.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
      } else {
        displayValue = value;
      }
    } catch {
      displayValue = value;
    }
  }
  // Special formatting for currency values
  else if (typeof value === "string" && (
    label.toLowerCase().includes("payment") ||
    label.toLowerCase().includes("price") ||
    label.toLowerCase().includes("income") ||
    label.toLowerCase().includes("value") ||
    label.toLowerCase().includes("balance") ||
    label.toLowerCase().includes("proceeds") ||
    label.toLowerCase().includes("rent")
  )) {
    displayValue = formatCurrency(value);
  }
  // Handle objects with 'label' or 'title' for display
  else if (value && typeof value === "object" && (value.label || value.title)) {
      displayValue = value.label || value.title;
  }
  else if (Array.isArray(value)) {
    displayValue = value.length > 0 ? value.map(item => {
        if (typeof item === 'object' && (item.label || item.title)) return item.label || item.title;
        return JSON.stringify(item);
    }).join(", ") : "None";
  } else if (typeof value === "object") {
    displayValue = JSON.stringify(value, null, 2); 
  } else {
    displayValue = value.toString();
  }

  return (
    <div className="flex justify-between xs:flex-col xs:items-start xs:justify-start items-start py-1">
      <span className="font-medium text-gray-600 capitalize">
        {label.replace(/([A-Z])/g, ' $1').trim()}:
      </span>
      <span className="text-black xs:text-start text-right xs:min-w-[100%] max-w-[60%] whitespace-pre-wrap">
        {displayValue}
      </span>
    </div>
  );
};

// Recursive component to render nested objects more gracefully
const NestedDetails = ({ data, level = 0, parentKey = "" }: { data: Record<string, any>; level?: number; parentKey?: string }) => {
  if (!data || Object.keys(data).length === 0) return null;

  // const paddingLeft = level * 16; // 16px per level

  // Specific titles for known sections
  const getSectionTitle = (key: string) => {
    switch (key) {
      case "basicDetails": return "Basic Details";
      case "borrowers": return "Borrower Information";
      case "documents": return "Uploaded Documents";
      case "income": return "Income Details";
      case "assets": return "Asset Information";
      case "properties": return "Property Information (Existing)";
      case "referral": return "Referral Details";
      default: return key.replace(/([A-Z])/g, ' $1').trim();
    }
  };


  return (
    <div 
    // style={{ paddingLeft: `${paddingLeft}px` }}
     className={` ${level > 0 ? ' border-gray-200  xs:pl-0 xs:px-0  pl-2 mt-2' : ''}`}>
      {Object.entries(data).map(([key, value]) => {
  if (
    ["currentState", "requestCounts", "isAccepted", "isCompleted", "_id", "userId"].includes(key) ||
    key.toLowerCase().includes("created") || 
    key.toLowerCase().includes("updated") || 
    key.toLowerCase() === "__v"
  ) return null;
      
        if ((value && typeof value === 'object' && (value.$oid || value.$date))  && key !== 'userId' && key !== 'created' && key !== 'updated') {
            return <DetailRow key={key} label={key} value={value} />;
        }
      
        if (Array.isArray(value) && value.length > 0 &&
          ["basicDetails", "borrowers", "documents", "income", "assets", "properties", "referral"].includes(key)) {
          return (
            <div key={key} className="mt-4">
              <p className={`font-semibold text-gray-800 ${level === 0 ? 'text-lg' : 'text-md'} mb-2`}>
                {getSectionTitle(key)}:
              </p>
           <div className="space-y-4">
  {value.map((item: any, index: number) => (
    <div key={index} className="p-3 bg-white rounded-md border border-gray-100">
      
      {key !== "documents" && (
        <p className="font-medium text-gray-700 mb-2">Item {index + 1}</p>
      )}
      
      {key === "documents" && item.uploadedData ? (
        <div className="grid grid-cols-2 gap-4 mt-2">
          {Object.values(item.uploadedData).map((imgUrl, idx) => {
            if (!imgUrl) return null;
            return (
              <img
                key={`${index}-${idx}`}
                src={imgUrl as string}
                alt={`Document ${index + 1}`}
                className="w-full h-auto rounded-md border"
              />
              
            );
          })}
        </div>
      ) : typeof item === "object" && item !== null ? (
        <NestedDetails data={item} level={level + 1} parentKey={key} />
      ) : (
        <DetailRow label={`Value ${index + 1}`} value={item} />
      )}

    </div>
  ))}
</div>


            </div>
          );
        }
        // General object rendering
        else if (value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0) {
          // Special handling for the Borrower1 object
          if (key === "BorrowersData" && value.borrower1) {
            return (
              <div key={key} className="mt-2">
                
                <p className="font-semibold text-gray-700 capitalize">Borrower 1:</p>
                <NestedDetails data={value.borrower1} level={level + 1} parentKey={key} />
              </div>
            );
          }
          return (
            <div key={key} className="mt-2">
              <p className={`font-semibold text-gray-700 capitalize ${level === 0 ? 'text-md' : 'text-sm'}`}>
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </p>
              <NestedDetails data={value} level={level + 1} parentKey={key} />
            </div>
          );
        }
        // Default rendering for primitive values
        else {
          return <DetailRow key={key} label={key} value={value} />;
        }
      })}
    </div>
  );
};


const ApplicationCard = ({ app }: { app: ApplicationDoc }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg xs:p-2 xs:mb-2 p-6 mb-8 border border-gray-200">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">{app.title || "Application Details"}</h2>
        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusClasses(app.status)}`}>
          {app.status}
        </span>
      </div>

      {app.declineReason && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md mb-4">
          <p className="font-medium">Decline Reason:</p>
          <p>{app.declineReason}</p>
        </div>
      )}

      {/* Basic Application Details (top-level fields) */}
      <div className="mb-6 grid xs:grid-cols-1  grid-cols-2 gap-x-8 gap-y-4 text-sm">
        <DetailRow label="Application ID" value={app.applicationId} />
        <DetailRow label="Lender ID" value={app.lenderId} />
        <DetailRow label="Description" value={app.description} />
        <DetailRow label="Document ID" value={app._id} /> {/* The _id of the ApplicationDoc itself */}
      </div>
      {/* {app.image && Array.isArray(app.image) && app.image.length > 0 && (
  <div className="mt-4">
    <p className="font-semibold text-gray-800 mb-2">Application Images:</p>
    <div className="grid grid-cols-2 gap-4">
      {app.image.map((imgUrl, idx) => (
        <img
          key={idx}
          src={imgUrl}
          alt={`Application Image ${idx + 1}`}
          className="w-full h-auto rounded-md border"
        />
      ))}
    </div>
  </div>
)} */}


      {/* Full Nested Application Object */}
      {app.application && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Comprehensive Application Data
          </h3>
          <div className="bg-gray-50  xs:bg-white xs:border-0 xs:p-0 p-4 rounded-lg border border-gray-100 overflow-x-auto">
            <NestedDetails data={app.application} />
          </div>
        </div>
      )}
    </div>
  );
};


const Page = () => {
  const [application, setApplication] = useState<ApplicationDoc | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("selectedApplication");
      if (data) {
        try {
          const parsedData: ApplicationDoc = JSON.parse(data);
          setApplication(parsedData);
        } catch (e) {
          console.error("Failed to parse application data from localStorage", e);
          // Handle error, maybe clear item or set application to null
        }
      }
    }
  }, []);

  return (
    <div className="p-4 md:p-8  xs:p-0 xs:bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/application/lender" className="text-gray-600 hover:text-gray-900 transition-colors">
          <IoMdArrowRoundBack className="text-2xl" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
      </div>

      {application ? (
        <ApplicationCard app={application} />
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-2xl font-medium text-gray-700 mb-2">No Application Found</h3>
          <p className="text-gray-500 mt-2">Please go back to the applications list and select an application to view its details.</p>
          <Link href="/dashboard/application/lender" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go to Applications
          </Link>
        </div>
      )}
    </div>
  );
};

export default Page;
// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { IoMdArrowRoundBack } from "react-icons/io";

// // Default icon
// import home from "../../../../../public/assets/lendercommonimg.png";

// // Status badge helper
// const getStatusClasses = (status: string) => {
//   switch (status.toLowerCase()) {
//     case "accepted":
//       return "bg-green-100 text-green-800";
//     case "declined":
//       return "bg-red-100 text-red-800";
//     case "pending":
//       return "bg-blue-100 text-blue-800";
//     case "review":
//       return "bg-yellow-100 text-yellow-800";
//     default:
//       return "bg-gray-100 text-gray-800";
//   }
// };

// // Type for flattened application
// interface Application {
//   _id: string;
//   title: string;
//   description?: string;
//   purchasePrice?: number;
//   downPayment?: number;
//   closingDate?: string;
//   incomeType?: string;
//   status: string;
//   declineReason?: string;
//   icon?: any;
// }

// // Child component for displaying application details
// const ApplicationCard = ({ application }: { application: Application }) => {
//   const renderActionButtons = () => {
//     switch (application.status.toLowerCase()) {
//       case "pending":
//         return (
//           <div className="min-w-full flex justify-center my-4 items-center">
//             <Link
//               href="/dashboard/application/uploaddocs"
//               className="text-white bg-[#013E8C] py-3 rounded-full w-full text-center hover:bg-opacity-90 transition-colors"
//             >
//               Upload Document
//             </Link>
//           </div>
//         );
//       case "review":
//         return (
//           <div className="min-w-full gap-4 flex justify-center my-4 items-center">
//             <button className="text-white bg-[#013E8C] py-3 rounded-full w-full hover:bg-opacity-90 transition-colors">
//               Accept
//             </button>
//             <button className="border text-[#808080] py-3 rounded-full w-full hover:bg-gray-50 transition-colors">
//               Decline
//             </button>
//           </div>
//         );
//       case "accepted":
//         return (
//           <div className="text-center my-4 py-3 text-green-700 font-medium">
//             Application Accepted
//           </div>
//         );
//       case "declined":
//         return (
//           <div className="text-center my-4 py-3">
//             <p className="text-red-700 font-medium">Application Declined</p>
//             {application.declineReason && (
//               <p className="mt-2 text-sm text-gray-600 bg-red-50 p-2 rounded">
//                 Reason: {application.declineReason}
//               </p>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-md bg-white shadow-sm rounded-md border min-w-64 p-4 flex flex-col justify-between">
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-[#3B3B3B] text-[20px] font-semibold">{application.title}</h1>
//           <span
//             className={`px-3 py-1 text-xs flex-wrap font-bold rounded-full ${getStatusClasses(application.status)}`}
//           >
//             {application.status}
//           </span>
//         </div>

//         {/* Display all available fields */}
//         <div className="space-y-2">
//           {application.description && (
//             <p className="flex justify-between text-[#808080]">
//               Description: <span className="text-black font-medium">{application.description}</span>
//             </p>
//           )}
//           {application.purchasePrice !== undefined && (
//             <p className="flex justify-between text-[#808080]">
//               Purchase Price:{" "}
//               <span className="text-black font-medium">${application.purchasePrice.toLocaleString()}</span>
//             </p>
//           )}
//           {application.downPayment !== undefined && (
//             <p className="flex justify-between text-[#808080]">
//               Down Payment:{" "}
//               <span className="text-black font-medium">${application.downPayment.toLocaleString()}</span>
//             </p>
//           )}
//           {application.closingDate && (
//             <p className="flex justify-between text-[#808080]">
//               Closing Date: <span className="text-black font-medium">{application.closingDate}</span>
//             </p>
//           )}
//           {application.incomeType && (
//             <p className="flex justify-between text-[#808080]">
//               Income Type: <span className="text-black font-medium">{application.incomeType}</span>
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="mt-4">{renderActionButtons()}</div>
//     </div>
//   );
// };

// // Main details page
// const Page = () => {
//   const [application, setApplication] = useState<Application | null>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const data = localStorage.getItem("selectedApplication");
//       if (data) {
//         setApplication(JSON.parse(data));
//       }
//     }
//   }, []);

//   return (
//     <div className="p-4 md:p-8">
//       {/* Header */}
//       <div className="flex flex-col justify-between items-start mb-8 gap-4">
//         <div className="flex flex-col">
//           <h1 className="text-2xl xs:flex-col xs:items-start flex items-center font-medium text-black">
//             <Link href="/dashboard/application/lender">
//               <IoMdArrowRoundBack />
//             </Link>
//             <span className="ml-2">Application Details</span>
//           </h1>
//         </div>
//       </div>

//       {/* Application Detail */}
//       <div className="min-w-full">
//         {application ? (
//           <ApplicationCard application={application} />
//         ) : (
//           <div className="text-center py-20 bg-gray-50 rounded-lg">
//             <h3 className="text-xl font-medium text-gray-700">No Application Found</h3>
//             <p className="text-gray-500 mt-2">Please go back and select an application.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;


// "use client"
// import Image from "next/image";
// import React, { useState } from "react";

// import Link from "next/link";
// import { IoChevronForwardSharp } from "react-icons/io5";
// import { IoMdArrowRoundBack } from "react-icons/io";

// // --- SIMULATED API DATA ---
// // In a real application, you would fetch this data using useEffect from an API endpoint.
// const loanApplicationsData = [
//   {
//     id: 1,
//     title: "Buy a Property",
//     purchasePrice: 50000,
//     downPayment: 10000,
//     closingDate: "2025-07-26",
//     incomeType: "Employed",
//     status: "Pending" // User needs to upload documents
//   },
//   {
//     id: 2,
//     title: "Condo Purchase",
//     purchasePrice: 150000,
//     downPayment: 30000,
//     closingDate: "2024-12-10",
//     incomeType: "Self-Employed",
//     status: "Review" // Admin needs to accept/decline
//   },
//   {
//     id: 3,
//     title: "First Home",
//     purchasePrice: 220000,
//     downPayment: 22000,
//     closingDate: "2025-02-15",
//     incomeType: "Employed",
//     status: "Accepted" // Application is complete
//   },
//   {
//     id: 4,
//     title: "Investment Property",
//     purchasePrice: 300000,
//     downPayment: 75000,
//     closingDate: "2025-03-01",
//     incomeType: "Business Owner",
//     status: "Declined", // Application was rejected
//     declineReason: "Credit score too low for loan approval."
//   },
//     {
//     id: 5,
//     title: "Refinance Loan",
//     purchasePrice: 180000,
//     downPayment: 0,
//     closingDate: "2024-11-20",
//     incomeType: "Employed",
//     status: "Review" // Another one for admin review
//   }
// ];

// // Helper function to get styling for status badges
// const getStatusClasses = (status:any) => {
//   switch (status.toLowerCase()) {
//     case 'accepted': return 'bg-green-100 text-green-800';
//     case 'declined': return 'bg-red-100 text-red-800';
//     case 'pending': return 'bg-blue-100 text-blue-800';
//     case 'review': return 'bg-yellow-100 text-yellow-800';
//     default: return 'bg-gray-100 text-gray-800';
//   }
// };

// // Define the Application type
// interface Application {
//   id: number;
//   title: string;
//   purchasePrice: number;
//   downPayment: number;
//   closingDate: string;
//   incomeType: string;
//   status: string;
//   declineReason?: string;
// }

// // --- Child Component for a single Application Card ---
// const ApplicationCard = ({ application }: { application: Application }) => {
  
//   // Conditionally render buttons based on application status
//   const renderActionButtons = () => {
//     switch (application.status.toLowerCase()) {
//       case 'pending':
//         return (
//           <div className="min-w-full flex justify-center my-4 items-center">

//              <Link 
//         href="/dashboard/application/uploaddocs" 
//         className="text-white bg-[#013E8C] py-3 rounded-full w-full text-center hover:bg-opacity-90 transition-colors"
//       >
//         Upload Document
//       </Link>
//           </div>
//         );
//       case 'review':
//         return (
//           <div className="min-w-full gap-4 flex justify-center my-4 items-center">
//             <button className="text-white bg-[#013E8C] py-3 rounded-full w-full hover:bg-opacity-90 transition-colors">Accept</button>
//             <button className="border text-[#808080] py-3 rounded-full w-full hover:bg-gray-50 transition-colors">Decline</button>
//           </div>
//         );
//       case 'accepted':
//          return (
//           <div className="text-center my-4 py-3 text-green-700 font-medium">
//             Application Accepted
//           </div>
//         );
//       case 'declined':
//          return (
//               <div className="text-center my-4 py-3">
//       <p className="text-red-700 font-medium">Application Declined</p>
//       {application.declineReason && (
//         <p className="mt-2 text-sm text-gray-600 bg-red-50 p-2 rounded">
//           Reason: {application.declineReason}
//         </p>
//       )}
//     </div>
//         );
//       default:
//         return null;
//     }
//   }
  
//   return (
//     <div className="max-w-md bg-white shadow-sm rounded-md border min-w-64 p-4 flex flex-col justify-between">
//       <div>
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-[#3B3B3B] text-[20px] font-semibold">{application.title}</h1>
//           <span className={`px-3 py-1 text-xs flex-wrap font-bold rounded-full ${getStatusClasses(application.status)}`}>
//             {application.status}
//           </span>
//         </div>
//         <p className="text-[#808080] ">Property Value:</p>
//         <div className="space-y-1 mt-2">
//             <p className="flex text-[#808080] justify-between">Purchase Price: <span className="text-black font-medium">${application.purchasePrice.toLocaleString()}</span></p>
//             <p className="flex text-[#808080] justify-between">Down Payment: <span className="text-black font-medium">${application.downPayment.toLocaleString()}</span></p>
//             <p className="flex text-[#808080] justify-between">Closing Date: <span className="text-black font-medium">{application.closingDate}</span></p>
//             <p className="flex text-[#808080] justify-between">Income Type: <span className="text-black font-medium">{application.incomeType}</span></p>
//         </div>
//       </div>
//       <div className="mt-4">
//         {renderActionButtons()}
//       </div>
//     </div>
//   );
// };


// // --- Main Page Component ---
// const Page = () => {
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   const filterStatuses = ["All", "Pending", "Review", "Accepted", "Declined"];

//   const filteredApplications = loanApplicationsData.filter(app => 
//     selectedStatus === "All" || app.status === selectedStatus
//   );

//   return (
//     <div className="p-4 md:p-8">
//       {/* Header and Filters */}
//       <div className="flex flex-col justify-between items-start mb-8 gap-4">
//         <div className="flex flex-col">
//           <h1 className="text-2xl xs:flex-col xs:items-start   flex items-center font-medium text-black">
//              <Link href="/dashboard/application/lender">
//               <IoMdArrowRoundBack />
//             </Link>
//             Loan Applications</h1>
//           <p className="text-gray-500">View and manage all loan applications.</p>
//         </div>
//         <div className="flex items-center flex-wrap gap-4 p-1 rounded-lg">
//           {filterStatuses.map(status => (
//             <button 
//               key={status} 
//               onClick={() => setSelectedStatus(status)}
//               className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedStatus === status ? 'bg-white text-blue-700 shadow' : 'text-gray-600 hover:bg-gray-200'}`}
//             >
//               {status}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Applications Grid */}
//       <div className="min-w-full">
//         {filteredApplications.length > 0 ? (
//           <div className="grid xs:grid-cols-1  grid-cols-3 gap-6">
//             {filteredApplications.map((app) => (
//               <ApplicationCard key={app.id} application={app} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-gray-50 rounded-lg">
//             <h3 className="text-xl font-medium text-gray-700">No Applications Found</h3>
//             <p className="text-gray-500 mt-2">There are no applications with the status "{selectedStatus}".</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;