"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

const totalSteps = 7;

interface UploadBoxProps {
  label: string;
  description: string;
  onFileSelect: (file: File, type: string) => void;
  initialPreview?: string | null;
}

const UploadBox: React.FC<UploadBoxProps> = ({
  label,
  description,
  onFileSelect,
  initialPreview = null,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialPreview);

  useEffect(() => {
    setPreview(initialPreview);
  }, [initialPreview]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onFileSelect(file, description);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full h-40 hover:border-[#013E8C] transition cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <FaRegImage className="text-3xl text-gray-400 mb-2" />
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

const DocumentsDetails: React.FC<{ DocumentName: string }> = ({
  DocumentName,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // State to hold selected files (File objects) or their URLs (strings)
  // We'll map the descriptions to specific image types for the payload
  const [documentImages, setDocumentImages] = useState<{
    primaryImageFront: File | string | null;
    primaryImageBack: File | string | null;
    secondaryImageFront: File | string | null;
    secondaryImageBack: File | string | null;
  }>({
    primaryImageFront: null,
    primaryImageBack: null,
    secondaryImageFront: null,
    secondaryImageBack: null,
  });

  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

useEffect(() => {
  setIsClient(true);
  if (typeof window !== "undefined") {
    const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");

    if (
      storedApp.documents &&
      Array.isArray(storedApp.documents) &&
      storedApp.documents.length > 0
    ) {
      const uploadedData = storedApp.documents[0].uploadedData || {};
      setDocumentImages({
        primaryImageFront: uploadedData.primaryImageFront || null,
        primaryImageBack: uploadedData.primaryImageBack || null,
        secondaryImageFront: uploadedData.secondaryImageFront || null,
        secondaryImageBack: uploadedData.secondaryImageBack || null,
      });
    }
  }
}, []);


  const handleFileSelect = (file: File, description: string) => {
    setDocumentImages((prev) => {
      switch (description) {
        case "Front Image of Primary ID":
          return { ...prev, primaryImageFront: file };
        case "Back Image of Primary ID":
          return { ...prev, primaryImageBack: file };
        case "Front Image of Secondary ID":
          return { ...prev, secondaryImageFront: file };
        case "Back Image of Secondary ID":
          return { ...prev, secondaryImageBack: file };
        default:
          return prev;
      }
    });
  };

  const getInitialPreview = (key: keyof typeof documentImages) => {
    const fileOrUrl = documentImages[key];
    if (fileOrUrl) {
      if (typeof fileOrUrl !== "string" && fileOrUrl instanceof File) {
        return URL.createObjectURL(fileOrUrl);
      } else if (typeof fileOrUrl === "string" && fileOrUrl !== "") {
        return fileOrUrl;
      }
    }
    return null;
  };



const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    const applicationId = localStorage.getItem("applicationId") || "";

    if (!token || !applicationId) {
      alert("⚠️ Token or Application ID missing");
      return;
    }

    // Initialize an object to hold all uploaded URLs
    let uploadedUrls: Record<string, string> = {};

    // --- STEP 1: Upload Primary Images ---
    const primaryFormData = new FormData();
    const primaryMapping: Record<string, string> = {
      primaryImageFront: "front1",
      primaryImageBack: "back1",
    };

    let primaryFilesToUpload = false;
    for (const key in primaryMapping) {
      const fileOrUrl = documentImages[key as keyof typeof documentImages];
      const backendKey = primaryMapping[key];
      if (fileOrUrl instanceof File) {
        primaryFormData.append(backendKey, fileOrUrl);
        primaryFilesToUpload = true;
      }
    }

    if (primaryFilesToUpload) {
      primaryFormData.append("applicationId", applicationId); // Ensure applicationId is sent
      primaryFormData.append("currentState", String(currentStep)); // Ensure currentState is sent

      const primaryUploadRes = await axios.post(
        "https://bdapi.testenvapp.com/api/v1/user-applications/upload",
        primaryFormData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(" Primary Upload API Response:", primaryUploadRes.data);
      if (primaryUploadRes.data.documents && primaryUploadRes.data.documents.length > 0) {
        uploadedUrls.primaryImageFront = primaryUploadRes.data.documents[0]?.image1?.url || "";
        uploadedUrls.primaryImageBack = primaryUploadRes.data.documents[0]?.image2?.url || "";
      }
    } else {
      // If no new primary files were uploaded, retain existing URLs from localStorage
      const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");
      const prevUploaded = storedApp.documents?.[0]?.uploadedData || {};
      uploadedUrls.primaryImageFront = prevUploaded.primaryImageFront || "";
      uploadedUrls.primaryImageBack = prevUploaded.primaryImageBack || "";
    }


    // --- STEP 2: Upload Secondary Images ---
    const secondaryFormData = new FormData();
    const secondaryMapping: Record<string, string> = {
      secondaryImageFront: "front2",
      secondaryImageBack: "back2",
    };

    let secondaryFilesToUpload = false;
    for (const key in secondaryMapping) {
      const fileOrUrl = documentImages[key as keyof typeof documentImages];
      const backendKey = secondaryMapping[key];
      if (fileOrUrl instanceof File) {
        secondaryFormData.append(backendKey, fileOrUrl);
        secondaryFilesToUpload = true;
      }
    }

    if (secondaryFilesToUpload) {
      secondaryFormData.append("applicationId", applicationId); // Ensure applicationId is sent
      secondaryFormData.append("currentState", String(currentStep)); // Ensure currentState is sent

      const secondaryUploadRes = await axios.post(
        "https://bdapi.testenvapp.com/api/v1/user-applications/upload",
        secondaryFormData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Secondary Upload API Response:", secondaryUploadRes.data);
      if (secondaryUploadRes.data.documents && secondaryUploadRes.data.documents.length > 0) {
        uploadedUrls.secondaryImageFront = secondaryUploadRes.data.documents[0]?.image1?.url || "";
        uploadedUrls.secondaryImageBack = secondaryUploadRes.data.documents[0]?.image2?.url || "";
      }
    } else {
      // If no new secondary files were uploaded, retain existing URLs from localStorage
      const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");
      const prevUploaded = storedApp.documents?.[0]?.uploadedData || {};
      uploadedUrls.secondaryImageFront = prevUploaded.secondaryImageFront || "";
      uploadedUrls.secondaryImageBack = prevUploaded.secondaryImageBack || "";
    }

    // --- STEP 3: Prepare documents for PUT using combined uploadedUrls ---
    const documents: any[] = [
      {
        id: 1, // Assuming fixed ID for this document type
        name: "Document 1",
        uploadedData: {
          primaryImageFront: uploadedUrls.primaryImageFront,
          primaryImageBack: uploadedUrls.primaryImageBack,
          secondaryImageFront: uploadedUrls.secondaryImageFront,
          secondaryImageBack: uploadedUrls.secondaryImageBack,
        },
      },
    ];

    const updatePayload = {
      applicationId,
      currentState: currentStep,
      documents,
    };

    const updateRes = await axios.put(
      "https://bdapi.testenvapp.com/api/v1/user-applications/update",
      updatePayload,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Update API Response:", updateRes.data);

    // Update localStorage
    const updatedApp = {
      ...updateRes.data.data,
    };
    localStorage.setItem("selectedApplication", JSON.stringify(updatedApp));

    toast.success("Documents uploaded & saved successfully!");
    router.push("/dashboard/application/step4");
  } catch (err) {
    console.error("❌ API Error:", err);
    alert("Failed to upload documents");
  }
};
  





 
  return (
    <div className="min-h-screen min-w-full flex flex-col">
      <div className="flex justify-between">
        <span className="flex gap-2">
          <span className="flex justify-center text-black gap-2 items-center">
            <Link
              href="/dashboard/application/step2"
              className="cursor-pointer flex gap-2 items-center"
            >
              <IoMdArrowRoundBack />
              Documents
            </Link>
          </span>
        </span>

        {isClient && (
          <span className="flex items-end flex-col-reverse gap-2">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-5 rounded-full ${
                    index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
            <h1 className="text-sm text-black font-medium">
              {currentStep} of {totalSteps}
            </h1>
          </span>
        )}
      </div>

      <div className="min-w-full flex justify-center items-center">
        <div className="bg-white mt-8 shadow-md rounded-xl p-6 max-w-3xl">
          <h2 className="text-xl text-black font-semibold mb-6 pb-1">
            Upload Documents
          </h2>

          <div className="mb-4 text-sm text-[#595959]">
            <span className="min-w-[90px] text-black font-medium">
              List of IDs:
            </span>{" "}
            Only 2 required — DL, Passport, PR Card, Provincial ID Card with
            photo, Citizenship Card. Only one copy needed for Passport, rest F&B
            required for all IDs.
          </div>

          <hr className="border-b-2 border-[#013E8C] max-w-[100px] my-3" />

          <div className="mb-4">
            <input
              type="text"
              value={DocumentName}
              disabled
              className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-700"
            />
          </div>

          {/* Primary ID */}
          <div className="text-[#111827] font-semibold mb-3">
            Attach Primary Government approved Photo ID
          </div>
          <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 mb-6">
            <UploadBox
              label="Upload Documents"
              description="Front Image of Primary ID"
              onFileSelect={handleFileSelect}
              initialPreview={getInitialPreview("primaryImageFront")}
            />
            <UploadBox
              label="Upload Documents"
              description="Back Image of Primary ID"
              onFileSelect={handleFileSelect}
              initialPreview={getInitialPreview("primaryImageBack")}
            />
          </div>

          {/* Secondary ID */}
          <div className="text-[#111827] font-semibold mb-3">
            Attach Secondary Government approved Photo ID
          </div>
          <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 mb-6">
            <UploadBox
              label="Upload Documents"
              description="Front Image of Secondary ID"
              onFileSelect={handleFileSelect}
              initialPreview={getInitialPreview("secondaryImageFront")}
            />
            <UploadBox
              label="Upload Documents"
              description="Back Image of Secondary ID"
              onFileSelect={handleFileSelect}
              initialPreview={getInitialPreview("secondaryImageBack")}
            />
          </div>

          {/* Buttons */}
          <div className="flex w-full justify-between mt-6">
            <button className="text-[#F92C2C] border border-[#F92C2C] min-w-[48%] px-6 py-2 rounded-full hover:bg-red-100">
              Delete
            </button>
            <button
              onClick={handleSave}
              className="bg-[#013E8C] min-w-[48%] text-white px-6 py-2 rounded-full hover:bg-[#002e6b]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsDetails;




































































 // const handleSave = async () => {
  //   try {
  //     console.log("🚀 Step 1: Starting handleSave...");

  //     const token = localStorage.getItem("token");
  //     const applicationId =
  //       typeof window !== "undefined"
  //         ? localStorage.getItem("applicationId")
  //         : null;

  //     if (!token || !applicationId) {
  //       alert("⚠️ Token or Application ID missing");
  //       return;
  //     }

  //     // Prepare uploadedData object for the payload
  //     const uploadedDataPayload: { [key: string]: string } = {};

  //     for (const key in documentImages) {
  //       const imageKey = key as keyof typeof documentImages;
  //       const fileOrUrl = documentImages[imageKey];

  //       if (fileOrUrl) {
  //         if (typeof fileOrUrl !== "string" && fileOrUrl instanceof File) {
  //           // Convert new File objects to base64
  //           uploadedDataPayload[imageKey] = await fileToBase64(fileOrUrl);
  //         } else if (typeof fileOrUrl === "string" && fileOrUrl !== "") {
  //           // Use existing URLs directly
  //           uploadedDataPayload[imageKey] = fileOrUrl;
  //         }
  //       }
  //     }

  //     // Construct the documents array in the desired MongoDB format
  //     const documentsPayload = [
  //       {
  //         id: 1, // Assuming a fixed ID for this document entry, adjust if dynamic
  //         name: DocumentName || "Uploaded Documents", // Use DocumentName prop or a default
  //         uploadedData: uploadedDataPayload,
  //       },
  //     ];

  //     const payload = {
  //       applicationId,
  //       currentState: currentStep,
  //       documents: documentsPayload,
  //     };

  //     console.log("📦 Final Payload for API:", payload);

  //     const res = await axios.put(
  //       "https://bdapi.testenvapp.com/api/v1/user-applications/update",
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (res.status === 200 || res.status === 201) {
  //       console.log("✅ API Response:", res.data);
  //       alert("Documents uploaded successfully!");

  //       // Update localStorage after successful API call
  //       const storedApp = JSON.parse(
  //         localStorage.getItem("selectedApplication") || "{}"
  //       );

  //       // Assuming API response returns the updated document structure
  //       // We'll take the first document entry's uploadedData
  //       const apiDocuments = res.data.application.documents;
  //       const updatedUploadedData = apiDocuments && apiDocuments.length > 0
  //         ? apiDocuments[0].uploadedData
  //         : {};

  //       const updatedApp = {
  //         ...storedApp,
  //         documents: [{
  //           id: 1, // Keep consistent with what we sent
  //           name: DocumentName || "Uploaded Documents",
  //           uploadedData: updatedUploadedData,
  //         }],
  //         currentState: currentStep,
  //       };

  //       localStorage.setItem("selectedApplication", JSON.stringify(updatedApp));

  //       // Navigate to next step
  //       router.push("/dashboard/application/step4");
  //     } else {
  //       alert(`❌ Update failed! Status: ${res.status}`);
  //       console.error("❌ Error Response:", res.data);
  //     }
  //   } catch (err) {
  //     console.error("❌ API Error:", err);
  //     alert("Failed to upload documents");
  //   }
  // };

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import { FaRegImage } from "react-icons/fa";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import axios from "axios";

// const totalSteps = 7;

// interface UploadBoxProps {
//   label: string;
//   description: string;
//   onFileSelect: (file: File, type: string) => void;
// }

// const UploadBox: React.FC<UploadBoxProps> = ({
//   label,
//   description,
//   onFileSelect,
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const imageUrl = URL.createObjectURL(file);
//       setPreview(imageUrl);
//       onFileSelect(file, description);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full h-40 hover:border-[#013E8C] transition cursor-pointer overflow-hidden"
//       onClick={handleClick}
//     >
//       {preview ? (
//         <img
//           src={preview}
//           alt="Preview"
//           className="w-full h-full object-cover rounded-lg"
//         />
//       ) : (
//         <>
//           <FaRegImage className="text-3xl text-gray-400 mb-2" />
//           <p className="font-medium text-gray-700">{label}</p>
//           <p className="text-xs text-gray-500">{description}</p>
//         </>
//       )}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//       />
//     </div>
//   );
// };

// const DocumentsDetails: React.FC<{ DocumentName: string }> = ({
//   DocumentName,
// }) => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);

//   const [files, setFiles] = useState<{ file: File; type: string }[]>([]);

//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleFileSelect = (file: File, type: string) => {
//     setFiles((prev) => {
//       const other = prev.filter((f) => f.type !== type);
//       return [...other, { file, type }];
//     });
//   };
// const handleSave = async () => {
//   try {
//     console.log("🚀 Step 1: Starting handleSave...");

//     const token = localStorage.getItem("token");
//     const applicationId =
//       typeof window !== "undefined"
//         ? localStorage.getItem("applicationId")
//         : null;

//     if (!token || !applicationId) {
//       alert("⚠️ Token or Application ID missing");
//       return;
//     }

//     // Prepare payload
    // const payload = {
    //   applicationId,
    //   currentState: currentStep,
    //   documents: files.map((f) => ({
    //     file: f.file,
    //     type: f.type,
    //   })),
    // };

//     console.log("📦 Final Payload for API:", payload);

//     // Send API request first
//     const res = await axios.put(
//       "https://bdapi.testenvapp.com/api/v1/user-applications/update",
//       payload,
//       {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (res.status === 200 || res.status === 201) {
//       console.log("✅ API Response:", res.data);
//       alert("Documents uploaded successfully!");

//       // Update localStorage after successful API call
//       const storedApp = JSON.parse(
//         localStorage.getItem("selectedApplication") || "{}"
//       );

//       const updatedApp = {
//         ...storedApp,
//         documents: files,
//         currentState: currentStep,
//       };

//       localStorage.setItem(
//         "selectedApplication",
//         JSON.stringify(updatedApp)
//       );

//       // Navigate to next step
//       router.push("/dashboard/application/step4");
//     } else {
//       alert(`❌ Update failed! Status: ${res.status}`);
//       console.error("❌ Error Response:", res.data);
//     }
//   } catch (err) {
//     console.error("❌ API Error:", err);
//     alert("Failed to upload documents");
//   }
// };





//   return (
//     <div className="min-h-screen min-w-full flex flex-col">
//       <div className="flex justify-between">
//         <span className="flex gap-2">
//           <span className="flex justify-center text-black gap-2 items-center">
//             <Link
//               href="/dashboard/application/step2"
//               className="cursor-pointer flex gap-2 items-center"
//             >
//               <IoMdArrowRoundBack />
//               Documents
//             </Link>
//           </span>
//         </span>

//         {isClient && (
//           <span className="flex items-end flex-col-reverse gap-2">
//             <div className="flex gap-1">
//               {Array.from({ length: totalSteps }).map((_, index) => (
//                 <div
//                   key={index}
//                   className={`h-1.5 w-5 rounded-full ${
//                     index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"
//                   }`}
//                 ></div>
//               ))}
//             </div>
//             <h1 className="text-sm text-black font-medium">
//               {currentStep} of {totalSteps}
//             </h1>
//           </span>
//         )}
//       </div>

//       <div className="min-w-full flex justify-center items-center">
//         <div className="bg-white mt-8 shadow-md rounded-xl p-6 max-w-3xl">
//           <h2 className="text-xl text-black font-semibold mb-6 pb-1">
//             Upload Documents
//           </h2>

//           <div className="mb-4 text-sm text-[#595959]">
//             <span className="min-w-[90px] text-black font-medium">
//               List of IDs:
//             </span>{" "}
//             Only 2 required — DL, Passport, PR Card, Provincial ID Card with
//             photo, Citizenship Card. Only one copy needed for Passport, rest F&B
//             required for all IDs.
//           </div>

//           <hr className="border-b-2 border-[#013E8C] max-w-[100px] my-3" />

//           <div className="mb-4">
//             <input
//               type="text"
//               value={DocumentName}
//               disabled
//               className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-700"
//             />
//           </div>

//           {/* Primary ID */}
//           <div className="text-[#111827] font-semibold mb-3">
//             Attach Primary Government approved Photo ID
//           </div>
//           <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 mb-6">
//             <UploadBox
//               label="Upload Documents"
//               description="Front Image of Primary ID"
//               onFileSelect={handleFileSelect}
//             />
//             <UploadBox
//               label="Upload Documents"
//               description="Back Image of Primary ID"
//               onFileSelect={handleFileSelect}
//             />
//           </div>

//           {/* Secondary ID */}
//           <div className="text-[#111827] font-semibold mb-3">
//             Attach Secondary Government approved Photo ID
//           </div>
//           <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 mb-6">
//             <UploadBox
//               label="Upload Documents"
//               description="Front Image of Secondary ID"
//               onFileSelect={handleFileSelect}
//             />
//             <UploadBox
//               label="Upload Documents"
//               description="Back Image of Secondary ID"
//               onFileSelect={handleFileSelect}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex w-full justify-between mt-6">
//             <button className="text-[#F92C2C] border border-[#F92C2C] min-w-[48%] px-6 py-2 rounded-full hover:bg-red-100">
//               Delete
//             </button>
//             <button
//               onClick={handleSave}
//               className="bg-[#013E8C] min-w-[48%] text-white px-6 py-2 rounded-full hover:bg-[#002e6b]"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentsDetails;



















































//   const handleSave = async () => {
//   try {
//     console.log("🚀 Step 1: Starting handleSave...");

//     const token = localStorage.getItem("token");
//     const applicationId =
//       typeof window !== "undefined"
//         ? localStorage.getItem("applicationId")
//         : null;

//     if (!token || !applicationId) {
//       alert("⚠️ Token or Application ID missing");
//       return;
//     }

//    const formData = new FormData();

// const payload = {
//   applicationId,
//   currentState: currentStep,
// };

// formData.append("meta", JSON.stringify(payload));

// files.forEach((f, index) => {
//   formData.append(`documents[${index}][file]`, f.file);
//   formData.append(`documents[${index}][type]`, f.type);
// });



   
//     console.log("📦 Final JSON payload:", payload);

//     const res = await axios.put(
//       "https://bdapi.testenvapp.com/api/v1/user-applications/update",
//       payload,
//       {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ API Response:", res.data);
//     alert("Documents uploaded successfully!");
//     router.push("/dashboard/application/step4");
//   } catch (err: any) {
//     console.error("❌ API Error:", err);
//     alert("Failed to upload documents");
//   }
// };
