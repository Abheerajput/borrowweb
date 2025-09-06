"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, FormEvent } from "react";
import { FaGift, FaCouch, FaCarAlt, FaUmbrella, FaDollarSign, FaLightbulb } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";

const totalSteps = 7;

interface AssetData {
  value: string;
  description: string;
}

type AssetType = "Gift from Family" | "Household Goods" | "Vehicle" | "Life Insurance";

type AllAssetsData = {
  [key in AssetType]: AssetData;
};

const assetTypes: { name: AssetType; icon: React.ReactNode }[] = [
  { name: "Gift from Family", icon: <FaGift className="h-6 w-6" /> },
  { name: "Household Goods", icon: <FaCouch className="h-6 w-6" /> },
  { name: "Vehicle", icon: <FaCarAlt className="h-6 w-6" /> },
  { name: "Life Insurance", icon: <FaUmbrella className="h-6 w-6" /> },
];

const createInitialState = (): AllAssetsData => {
  const initialState = {} as AllAssetsData;
  assetTypes.forEach((asset) => {
    initialState[asset.name] = { value: "", description: "" };
  });
  return initialState;
};

const AssetsPage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<AssetType>("Gift from Family");
  const [assetsData, setAssetsData] = useState<AllAssetsData>(createInitialState());
  const [hasLifeInsurance, setHasLifeInsurance] = useState(false);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

  // ✅ Load saved data from localStorage
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "null");
      if (storedApp?.assets) {
        const restoredAssets = createInitialState();
        storedApp.assets.forEach((asset: any) => {
          restoredAssets[asset.name as AssetType] = {
            value: asset.value || "",
            description: asset.description || "",
          };
          if (asset.name === "Life Insurance") {
            setHasLifeInsurance(true);
          }
        });
        setAssetsData(restoredAssets);
      }
    }
  }, []);

  // ✅ Handle field change & update localStorage
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const updatedData = {
      ...assetsData,
      [selectedAsset]: {
        ...assetsData[selectedAsset],
        [name]: value,
      },
    };

    setAssetsData(updatedData);

    // Save to localStorage
    const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");
    const assetsArray = Object.entries(updatedData).map(([key, val]) => ({
      name: key,
      value: val.value,
      description: val.description,
    }));

    if (!hasLifeInsurance) {
      // remove Life Insurance entry if user selected "No"
      const filtered = assetsArray.filter((a) => a.name !== "Life Insurance");
      storedApp.assets = filtered;
    } else {
      storedApp.assets = assetsArray;
    }

    storedApp.currentState = currentStep;
    localStorage.setItem("selectedApplication", JSON.stringify(storedApp));
  };

  // ✅ Submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const applicationId = localStorage.getItem("applicationId");

      if (!applicationId) {
        alert("❌ Application ID not found in localStorage!");
        return;
      }

      // Build assets array
      let assetsArray = Object.entries(assetsData).map(([key, val]) => ({
        name: key,
        value: val.value,
        description: val.description,
      }));

      if (!hasLifeInsurance) {
        assetsArray = assetsArray.filter((a) => a.name !== "Life Insurance");
      }

      const payload = {
        applicationId,
        currentState: currentStep,
        assets: assetsArray,
      };

      console.log("📦 Final Payload:", payload);

      // Update localStorage also
      const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");
      storedApp.assets = assetsArray;
      storedApp.currentState = currentStep;
      localStorage.setItem("selectedApplication", JSON.stringify(storedApp));

      const response = await axios.put(
        "https://bdapi.testenvapp.com/api/v1/user-applications/update",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `${token}` } : {}),
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("✅ Assets data updated successfully!");
        router.push("/dashboard/application/step6");
      } else {
        alert(`❌ Update failed! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Failed to update assets:", error);
      alert("Failed to update assets. Check console for details.");
    }
  };

  const [open, setOpen] = useState(false);
       const steps = [
         { label: "Home", route: "/dashboard/application" },
         { label: "Basic Details", route: "/dashboard/application/step1" },
         { label: "Borrowers", route: "/dashboard/application/step2" },
      { label: "Documents", route: "/dashboard/application/step3" },
      { label: "Income", route: "/dashboard/application/step4" },
      { label: "Assets", route: "/dashboard/application/step5" },
      { label: "Properties", route: "/dashboard/application/step6" },
      { label: "Referral", route: "/dashboard/application/step7" },
    ];
    const [selected, setSelected] = useState(steps[5]);
  return (
    <div className="min-w-full">
      <div className="flex justify-between text-black my-4">
        <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <IoMdArrowRoundBack className="text-black" />
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {selected.label}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {steps.map((step) => (
              <Link
                key={step.route}
                href={step.route}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  selected.route === step.route ? "font-semibold" : ""
                }`}
                onClick={() => {
                  setSelected(step);
                  setOpen(false);
                }}
              >
                {step.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
        {isClient && (
          <span className="flex flex-col-reverse items-end gap-2">
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

      <div className="min-h-screen font-sans">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="w-16 h-1 bg-blue-600 mt-2 mb-8"></div>

            {/* Asset Type Selector */}
            <div className="grid sm:grid-cols-2 xs:grid-cols-1 grid-cols-4 gap-4 mb-8">
              {assetTypes.map((asset) => (
                <button
                  key={asset.name}
                  type="button"
                  onClick={() => setSelectedAsset(asset.name)}
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ${
                    selectedAsset === asset.name
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {asset.icon}
                  <span className="text-sm font-semibold mt-2">{asset.name}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Form Section */}
            <div className="space-y-6">
              <h2 className="font-semibold text-[#111827] text-[18px]">{selectedAsset}</h2>

              <div>
                <label
                  htmlFor="value"
                  className="block font-semibold text-[#111827] text-[18px] mb-1"
                >
                  What is the value of this asset?
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="value"
                    id="value"
                    value={assetsData[selectedAsset].value}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 pl-10 pr-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g. 80,000"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block font-semibold text-[#111827] text-[18px] mb-1"
                >
                  Assets Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={assetsData[selectedAsset].description}
                  onChange={handleInputChange}
                  className="block w-full rounded-md p-4 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe this asset"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 flex items-center space-x-3 rounded-lg bg-[#EBF2FC] p-4">
              <FaLightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-black text-[18px]">Did you Know?...</h3>
                <p className="text-sm text-black italic mt-1">
                  Some types of Life Insurance can be used as Assets towards your Mortgage
                  Qualification.
                </p>
              </div>
            </div>

            {/* Life Insurance Checkbox */}
            <div className="mt-6">
              <p className="font-semibold text-black text-[18px] mb-2">
                Do you have Life Insurance?
              </p>
              <div className="flex items-center space-x-4">
                {["Yes", "No"].map((option) => {
                  const isSelected =
                    (option === "Yes" && hasLifeInsurance) ||
                    (option === "No" && !hasLifeInsurance);
                  return (
                    <div
                      key={option}
                      onClick={() => setHasLifeInsurance(option === "Yes")}
                      className={`cursor-pointer px-4 py-2 border rounded-full font-medium text-[16px] ${
                        isSelected
                          ? "bg-blue-50 border-blue-600 text-blue-600"
                          : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-8 w-full flex gap-6 justify-between">
              <Link href="/dashboard/application/step4" className="w-1/2">
                <button
                  type="button"
                  className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors"
                >
                  Back
                </button>
              </Link>
              <button
                type="submit"
                className="bg-[#013E8C] w-1/2 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetsPage;

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect, useState, FormEvent } from "react";
// import { FaGift, FaCouch, FaCarAlt, FaUmbrella, FaDollarSign, FaLightbulb } from 'react-icons/fa';
// import { IoMdArrowRoundBack } from "react-icons/io";
// import axios from "axios";

// const totalSteps = 7;

// interface AssetData {
//   value: string;
//   description: string;
// }

// type AssetType = "Gift from Family" | "Household Goods" | "Vehicle" | "Life Insurance";

// type AllAssetsData = {
//   [key in AssetType]: AssetData;
// };

// const assetTypes: { name: AssetType; icon: React.ReactNode }[] = [
//   { name: "Gift from Family", icon: <FaGift className="h-6 w-6" /> },
//   { name: "Household Goods", icon: <FaCouch className="h-6 w-6" /> },
//   { name: "Vehicle", icon: <FaCarAlt className="h-6 w-6" /> },
//   { name: "Life Insurance", icon: <FaUmbrella className="h-6 w-6" /> },
// ];

// const createInitialState = (): AllAssetsData => {
//   const initialState = {} as AllAssetsData;
//   assetTypes.forEach(asset => {
//     initialState[asset.name] = { value: "", description: "" };
//   });
//   return initialState;
// };

// const AssetsPage: React.FC = () => {
//   const [selectedAsset, setSelectedAsset] = useState<AssetType>("Gift from Family");
//   const [assetsData, setAssetsData] = useState<AllAssetsData>(createInitialState());
//   const [hasLifeInsurance, setHasLifeInsurance] = useState(false);
//   const pathname = usePathname();
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();
//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setAssetsData(prevData => ({
//       ...prevData,
//       [selectedAsset]: {
//         ...prevData[selectedAsset],
//         [name]: value,
//       },
//     }));
//   };

//  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   try {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     const applicationId = typeof window !== "undefined" ? localStorage.getItem("applicationId") : null;

//     // Convert assetsData to array
//     const assetsArray = Object.entries(assetsData).map(([key, value]) => ({
//       name: key,
//       value: value.value,
//       description: value.description,
//     }));

//     // Add Life Insurance if selected
//     if (hasLifeInsurance) {
//       assetsArray.push({
//         name: "Life Insurance",
//         value: assetsData["Life Insurance"].value || "",
//         description: assetsData["Life Insurance"].description || "",
//       });
//     }

//     const payload = {
//       applicationId,
//       currentState: currentStep,
//       assets: assetsArray,
//     };

//     const response = await axios.put(
//       "https://bdapi.testenvapp.com/api/v1/user-applications/update",
//       payload,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `${token}` } : {}),
//         },
//       }
//     );

//     console.log("✅ API Response:", response.data);
//     if (response.status === 200 || response.status === 201) {
//       alert("Assets data updated successfully!");
//       router.push("/dashboard/application/step6");
//     } else {
//       alert(`Update failed! Status: ${response.status}`);
//     }
//   } catch (error) {
//     console.error("❌ Failed to update assets:", error);
//     alert("Failed to update assets. Check console for details.");
//   }
// };


//   return (
//     <div className="min-w-full">
//       <div className="flex justify-between text-black my-4">
//         <Link href="/dashboard/application/step3" className="flex gap-2 items-center">
//           <IoMdArrowRoundBack />
//           Assets
//         </Link>
//         {isClient && (
//           <span className="flex flex-col-reverse items-end gap-2">
//             <div className="flex gap-1">
//               {Array.from({ length: totalSteps }).map((_, index) => (
//                 <div key={index} className={`h-1.5 w-5 rounded-full ${index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"}`}></div>
//               ))}
//             </div>
//             <h1 className="text-sm text-black font-medium">{currentStep} of {totalSteps}</h1>
//           </span>
//         )}
//       </div>

//       <div className="min-h-screen font-sans">
//         <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
//           <form onSubmit={handleSubmit}>
//             <div className="w-16 h-1 bg-blue-600 mt-2 mb-8"></div>

//             {/* Asset Type Selector */}
//             <div className="grid sm:grid-cols-2 xs:grid-cols-1 grid-cols-4 gap-4 mb-8">
//               {assetTypes.map((asset) => (
//                 <button
//                   key={asset.name}
//                   type="button"
//                   onClick={() => setSelectedAsset(asset.name)}
//                   className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ${
//                     selectedAsset === asset.name
//                       ? 'border-blue-600 bg-blue-50 text-blue-600'
//                       : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400'
//                   }`}
//                 >
//                   {asset.icon}
//                   <span className="text-sm font-semibold mt-2">{asset.name}</span>
//                 </button>
//               ))}
//             </div>

//             {/* Dynamic Form Section */}
//             <div className="space-y-6">
//               <h2 className="font-semibold text-[#111827] text-[18px]">{selectedAsset}</h2>

//               <div>
//                 <label htmlFor="value" className="block font-semibold text-[#111827] text-[18px] mb-1">
//                   What is the value of this asset?
//                 </label>
//                 <div className="relative">
//                   <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                     <FaDollarSign className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="number"
//                     name="value"
//                     id="value"
//                     value={assetsData[selectedAsset].value}
//                     onChange={handleInputChange}
//                     className="block w-full rounded-md border-gray-300 pl-10 pr-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                     placeholder="e.g. 80,000"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="description" className="block font-semibold text-[#111827] text-[18px] mb-1">
//                   Assets Description
//                 </label>
//                 <textarea
//                   name="description"
//                   id="description"
//                   rows={4}
//                   value={assetsData[selectedAsset].description}
//                   onChange={handleInputChange}
//                   className="block w-full rounded-md p-4 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                   placeholder="Describe this asset"
//                 />
//               </div>
//             </div>

//             {/* Info Box */}
//             <div className="mt-8 flex items-center space-x-3 rounded-lg bg-[#EBF2FC] p-4">
//               <FaLightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
//               <div>
//                 <h3 className="font-semibold text-black text-[18px]">Did you Know?...</h3>
//                 <p className="text-sm text-black italic mt-1">
//                   Some types of Life Insurance can be used as Assets towards your Mortgage Qualification.
//                 </p>
//               </div>
//             </div>

//             {/* Life Insurance Checkbox */}
//            <div className="mt-6">
//   <p className="font-semibold text-black text-[18px] mb-2">Do you have Life Insurance?</p>
//   <div className="flex items-center space-x-4">
//     {["Yes", "No"].map((option) => {
//       const isSelected = (option === "Yes" && hasLifeInsurance) || (option === "No" && !hasLifeInsurance);
//       return (
//         <div
//           key={option}
//           onClick={() => setHasLifeInsurance(option === "Yes")}
//           className={`cursor-pointer px-4 py-2 border rounded-full font-medium text-[16px] ${
//             isSelected
//               ? "bg-blue-50 border-blue-600 text-blue-600"
//               : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
//           }`}
//         >
//           {option}
//         </div>
//       );
//     })}
//   </div>
// </div>

//             {/* Navigation Buttons */}
//             <div className="mt-8 w-full flex gap-6 justify-between">
//               <Link href="/dashboard/application/step4" className="w-1/2">
//                 <button
//                   type="button"
//                   className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors"
//                 >
//                   Back
//                 </button>
//               </Link>
//               <button
//                 type="submit"
//                 className="bg-[#013E8C] w-1/2 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
//               >
//                 Continue
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetsPage;
























// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { FaGift, FaCouch, FaCarAlt, FaUmbrella, FaDollarSign, FaLightbulb } from 'react-icons/fa';
// import { IoMdArrowRoundBack } from "react-icons/io";
// const totalSteps = 7;
// // 1. Define the structure for each asset's data
// interface AssetData {
//   value: string;
//   description: string;
// }

// // 2. Define the types for our state
// type AssetType = "Gift from Family" | "Household Goods" | "Vehicle" | "Life Insurance";

// type AllAssetsData = {
//   [key in AssetType]: AssetData;
// };

// // 3. Create a constant for our asset types to keep the code clean (Don't Repeat Yourself)
// const assetTypes: { name: AssetType; icon: React.ReactNode }[] = [
//   { name: "Gift from Family", icon: <FaGift className="h-6 w-6" /> },
//   { name: "Household Goods", icon: <FaCouch className="h-6 w-6" /> },
//   { name: "Vehicle", icon: <FaCarAlt className="h-6 w-6" /> },
//   { name: "Life Insurance", icon: <FaUmbrella className="h-6 w-6" /> },
// ];

// // Helper function to create the initial state dynamically
// const createInitialState = (): AllAssetsData => {
//   const initialState = {} as AllAssetsData;
//   assetTypes.forEach(asset => {
//     initialState[asset.name] = { value: "", description: "" };
//   });
//   return initialState;
// };

// const AssetsPage: React.FC = () => {
//   // 4. Set up our state
//   const [selectedAsset, setSelectedAsset] = useState<AssetType>("Gift from Family");
//   const [assetsData, setAssetsData] = useState<AllAssetsData>(createInitialState());
//   const [hasLifeInsurance, setHasLifeInsurance] = useState(false);
//   const pathname = usePathname();
//  const [isClient, setIsClient] = useState(false);
//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
//   const router = useRouter();
//   useEffect(() => {
//     setIsClient(true);
//   }, []);
//   // 5. Create a handler for input changes that updates the correct asset's data
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
    
//     setAssetsData(prevData => ({
//       ...prevData,
//       [selectedAsset]: {
//         ...prevData[selectedAsset],
//         [name]: value,
//       },
//     }));
//   };

//   // 6. Handle form submission
//   const handleSubmit = () => {
//     console.log("Submitting the following data:");
//     console.log({
//       assets: assetsData,
//       hasLifeInsurance: hasLifeInsurance,
//     });
//     // Here you would typically make an API call with the structured data
//     // e.g., await api.post('/application/assets', { assetsData, hasLifeInsurance });
//     alert("Form data has been logged to the console!");
//   };

//   return (

//     <div className="min-w-full">
//      <div className="flex justify-between text-black my-4">
//         <Link href="/dashboard/application/step3" className="flex gap-2 items-center">
//           <IoMdArrowRoundBack />
//          Assets
//         </Link>
//         {isClient && (
//           <span className="flex flex-col-reverse items-end gap-2">
//             <div className="flex gap-1">
//               {Array.from({ length: totalSteps }).map((_, index) => (
//                 <div key={index} className={`h-1.5 w-5 rounded-full ${index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"}`}></div>
//               ))}
//             </div>
//             <h1 className="text-sm text-black font-medium">{currentStep} of {totalSteps}</h1>
//           </span>
//         )}
//       </div>
//     <div className=" min-h-screen font-sans">

//       <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      
//         <div className="w-16 h-1 bg-blue-600 mt-2 mb-8"></div>
        
//         {/* Asset Type Selector */}
//         <div className="grid sm:grid-cols-2 xs:grid-cols-1 grid-cols-4 gap-4 mb-8">
//           {assetTypes.map((asset) => (
//             <button
//               key={asset.name}
//               onClick={() => setSelectedAsset(asset.name)}
//               className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ${
//                 selectedAsset === asset.name
//                   ? 'border-blue-600 bg-blue-50 text-blue-600'
//                   : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400'
//               }`}
//             >
//               {asset.icon}
//               <span className="text-sm font-semibold mt-2">{asset.name}</span>
//             </button>
//           ))}
//         </div>

//         {/* Dynamic Form Section */}
//         <div className="space-y-6">
//           <h2 className="font-semibold text-[#111827] text-[18px]">{selectedAsset}</h2>
          
//           <div>
//             <label htmlFor="value" className="block font-semibold text-[#111827] text-[18px] mb-1">
//               What is the value of this asset?
//             </label>
//             <div className="relative">
//               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                 <FaDollarSign className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="number"
//                 name="value"
//                 id="value"
//                 value={assetsData[selectedAsset].value}
//                 onChange={handleInputChange}
//                 className="block w-full rounded-md border-gray-300 pl-10 pr-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 placeholder="e.g. 80,000"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="description" className="block font-semibold text-[#111827] text-[18px] mb-1">
//               Assets Description
//             </label>
//             <textarea
//               name="description"
//               id="description"
//               rows={4}
//               value={assetsData[selectedAsset].description}
//               onChange={handleInputChange}
//               className="block w-full rounded-md p-4  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//               placeholder="Describe this asset"
//             />
//           </div>
//         </div>

//         {/* Info Box */}
//         <div className="mt-8 flex items-center space-x-3 rounded-lg bg-[#EBF2FC] p-4">
//           <FaLightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
//           <div>
//             <h3 className="font-semibold text-black text-[18px]">Did you Know?...</h3>
//             <p className="text-sm text-black italic mt-1">
//               Some types of Life Insurance can be used as Assets towards your Mortgage Qualification.
//             </p>
//           </div>
//         </div>

//         {/* Life Insurance Checkbox */}
//         <div className="mt-6">
//           <p className="font-semibold text-black text-[18px] mb-2">Do you have Life Insurance?</p>
//           <div className="flex items-center space-x-6">
//             <label className="flex  items-center space-x-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={hasLifeInsurance === true}
//                 onChange={() => setHasLifeInsurance(true)}
//                 className="accent-blue-600 w-[15px] h-[15px]"
//               />
//               <span className="text-[16px] text-[#111827] font-medium">Yes</span>
//             </label>
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={hasLifeInsurance === false}
//                 onChange={() => setHasLifeInsurance(false)}
//                 className="accent-blue-600 w-[15px] h-[15px]"
//               />
//               <span className="text-[16px] text-[#111827] font-medium">No</span>
//             </label>
//           </div>
//         </div>
        
//         {/* Navigation Buttons */}
//          <div className="mt-8 w-full flex gap-6 justify-between">
//                       <Link href="/dashboard/application/step4" className="w-1/2">
//             <button
//               className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors"
//               >
//               Back
//             </button>
//               </Link>
//             <Link href="/dashboard/application/step6" className="w-1/2">
//             <button
//               // type="submit"
//               className="bg-[#013E8C] w-full text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
//               >
//               Continue
//             </button>
//               </Link>
//           </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AssetsPage;