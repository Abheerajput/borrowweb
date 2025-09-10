"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";
import home from "../../../../../public/assets/lendercommonimg.png";
import noapplication from "../../../../../public/assets/noapplication.png";
import axios from "axios";
import { useRouter } from "next/navigation";

interface InnerApplication {
  _id: string;
  userId: string;
  basicDetails: {
    downpayment: string;
    closingDate: string;
    propertyAddress: string;
    [key: string]: any; // fallback for extra fields
  }[];
  borrowers: {
    BorrowersData: Record<string, any>;
  }[];
  documents: any[];
  income: any[];
  assets: any[];
  properties: any[];
  referral: any[];
  currentState: number;
  requestCounts: number;
  isAccepted: string;
  isCompleted: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApplicationDoc {
  _id: string;                
  applicationId: string;     
  lenderId: string;
  status: string;
  title: string;
  description: string;
  link: string;
  icon: string;
  image: any[];
  declineReason: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  application: {
    _id: string;             
    userId: string;
    [key: string]: any;
  };
}



const Page = () => {
  const router = useRouter();
  const [applications, setApplications] = useState<ApplicationDoc[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [declineReason, setDeclineReason] = useState<string>("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<ApplicationDoc | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
const [previewUrls, setPreviewUrls] = useState<string[]>([]);
const fileInputRef = useRef<HTMLInputElement | null>(null);
   const openDeclineModal = (app: ApplicationDoc) => {
    setSelectedApp(app);
    setDeclineReason(""); // reset reason
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApp(null);
    setDeclineReason("");
  };


  const openAcceptModal = (app: ApplicationDoc) => {
    setSelectedApp(app);
    setSelectedImage(null);
    setPreviewUrl("");
    setIsAcceptModalOpen(true);
  };

  // Close modal
  const closeAcceptModal = () => {
    setSelectedApp(null);
    setSelectedImage(null);
    setPreviewUrl("");
    setIsAcceptModalOpen(false);
  };
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) return;

  const filesArray = Array.from(e.target.files);

  // Check total images (already selected + new)
  if (selectedImages.length + filesArray.length > 10) {
    alert("You can only upload up to 10 images.");
    return;
  }

  // Update selected images and preview URLs
  setSelectedImages((prev) => [...prev, ...filesArray]);
  setPreviewUrls((prev) => [
    ...prev,
    ...filesArray.map((file) => URL.createObjectURL(file)),
  ]);
};



const handleAccept = async () => {
  if (!selectedApp || selectedImages.length === 0) {
    alert("Please select at least one image before accepting.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not authorized");
      return;
    }

    const formData = new FormData();
    formData.append("id", selectedApp._id);
    formData.append("applicationId", selectedApp.applicationId);
    selectedImages.forEach((img) => formData.append("images", img)); // send all images

    await axios.post(
      "https://bdapi.testenvapp.com/api/v1/accept_applications",
      formData,
      { headers: { Authorization: `${token}`, "Content-Type": "multipart/form-data" } }
    );

    setApplications((prev) =>
      prev.map((a) =>
        a._id === selectedApp._id
          ? { ...a, status: "accepted", image: [...(a.image || []), ...previewUrls] } 
          : a
      )
    );

    alert("Application accepted successfully!");
    closeAcceptModal();
  } catch (err: any) {
    alert(err.response?.data?.message || "Failed to accept application");
  }
};




   const handleDecline = async () => {
    if (!declineReason || !selectedApp) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authorized");
        return;
      }

      // Send decline request
      await axios.post(
        "https://bdapi.testenvapp.com/api/v1/decline",
        { id: selectedApp._id, declineReason },
        { headers: { Authorization: `${token}` } }
      );

      // Update local state
      setApplications((prev) =>
        prev.map((a) =>
          a._id === selectedApp._id
            ? { ...a, status: "decline", declineReason }
            : a
        )
      );

      alert("Application declined successfully");
      closeModal();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to decline application");
    }
  };



// const handleDecline = async (app: ApplicationDoc) => {
//   const reason = prompt("Enter reason for declining this application:");
//   if (!reason) return;

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You are not authorized");
//       return;
//     }

//     // ✅ Send the document _id (item._id) to backend
//     console.log("Sending this _id for decline:", app._id);

//     await axios.post(
//       "https://bdapi.testenvapp.com/api/v1/decline",
//       { id: app._id, declineReason: reason },
//       { headers: { Authorization: `${token}` } }
//     );

//     alert("Application declined successfully");

//     // Update local state immediately
//     setApplications((prev) =>
//       prev.map((a) =>
//         a._id === app._id
//           ? { ...a, status: "decline", declineReason: reason }
//           : a
//       )
//     );
//   } catch (err: any) {
//     alert(err.response?.data?.message || "Failed to decline application");
//   }
// };


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
          const apps: ApplicationDoc[] = [];
          Object.keys(data).forEach((type) => {
            data[type].forEach((group: any) => {
              group.data.forEach((item: any) => {
                // Ensure all properties of ApplicationDoc are set
                apps.push({
                  _id: item._id, // This is the document _id from your API response
                  applicationId: item.applicationId, // From item
                  lenderId: item.lenderId, // From item
                  status: item.status || "pending", // From item
                  title: item.application.basicDetails?.[0]?.lookingToData?.label || type,
                  description: item.application.basicDetails?.[0]?.alreadyPropertydata?.label || "",
                  link: `/dashboard/application/lender/details/${item.application._id}`,
                  icon: home.src, // Or a dynamic icon if available in item
                  image: item.image || [], // From item, ensure it's an array
                  declineReason: item.declineReason || null, // From item
                  createdAt: item.createdAt, // From item
                  updatedAt: item.updatedAt, // From item
                  __v: item.__v, // From item
                  application: item.application, // The entire inner application object from item
                });

              
          

      // ✅ alert the _id being pushed
      console.log(`Adding document _id: ${item._id}`);
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
      case "decline":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  const handleCardClick = (app: ApplicationDoc) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedApplication", JSON.stringify(app));
    localStorage.setItem("applicationId", app._id); // use app._id directly
  }
  router.push(`/dashboard/application/lender/details/${app._id}`);
};


  return (
    <>
  
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
     
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4"  onClick={() => handleCardClick(app)}>
          <span>
            <Image
              src={home}
              alt="Application Icon"
              className="w-[50px] h-[50px]"
            />
          </span>
          <span>
            <p className="text-[16px] text-[#111827] font-semibold">{app.title}</p>
            <p className="text-[13px] text-[#7C7C7C] font-normal">{app.description}</p>
          </span>
        </div>
        <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => handleCardClick(app)}>
          <IoChevronForwardSharp className="text-gray-500 w-6 h-6" />
        </div>
      </div>

      <div>
        {["review", "pending"].includes(app.status.toLowerCase()) && (
          <div className="min-w-full gap-4 flex flex-col xs:flex-row justify-center my-4 items-center">
            <button
              className="text-white bg-[#013E8C] py-2 rounded-full w-1/2 hover:bg-opacity-90 transition-colors"
               onClick={() => openAcceptModal(app)}
            >
              Accept
            </button>
            <button
              className="border text-[#808080] py-2 rounded-full w-1/2  hover:bg-gray-50 transition-colors"
             onClick={() => openDeclineModal(app)}
            >
              Decline
            </button>
          </div>
        )}

        {/* ✅ Show decline reason if it exists */}
        {app.declineReason && (
          <p className="text-red-500 xs:mb-2 text-sm mt-2">
            Decline Reason: {app.declineReason}
          </p>
        )}
         {app.status.toLowerCase() === "accepted" && app.image && app.image.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {app.image.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`Application Image ${idx + 1}`}
              className="w-full h-auto rounded-md border"
            />
          ))}
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

       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-semibold mb-4 text-black">Decline Reason</h2>
            <textarea
              className="w-full border border-gray-300 p-2 rounded mb-4"
              rows={4}
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Enter reason for declining"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-black bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDecline}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

{isAcceptModalOpen && (
  <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white xs:mx-[2%] p-6 rounded-md w-96 max-w-full">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Accept Application
      </h2>

      {/* Upload Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Upload Images
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-4 py-2 bg-[#013E8C] text-white font-medium rounded hover:bg-[#0250b3] transition-colors"
        >
          Select Images
        </button>
<p className="text-sm text-gray-500 my-2">
  You can upload up to 10 images. Remaining: {10 - selectedImages.length}
</p>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Previews Section */}
      {previewUrls.length > 0 && (
        <div className="mb-4">
          <p className="font-medium mb-2">Uploaded Images:</p>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative border rounded overflow-hidden">
                <img
                  src={url}
                  alt={`Selected ${idx + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
                  onClick={() => {
                    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx));
                    setSelectedImages((prev) => prev.filter((_, i) => i !== idx));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={closeAcceptModal}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
)}


      </>
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
