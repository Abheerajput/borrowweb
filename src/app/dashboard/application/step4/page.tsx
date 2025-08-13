// src/app/dashboard/application/step4/page.tsx (or your file path)

"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa";

// Import the new form components
import EmployedForm from "../Employment/EmployedForm";
import SelfEmployedForm from "../SelfEmployedForm/SelfEmployedForm";

// Assets
import img1 from "../../../../../public/assets/selfemployed.png";
import img2 from "../../../../../public/assets/other.png";
import OtherIncomeForm from "../OtherIncomeForm/OtherIncomeForm";

const totalSteps = 7;

// 1. Updated interface to include all possible fields from all forms.
//    Fields specific to one form type are now optional.
export interface IFormData {
  incomeType: "Employed" | "Self-Employed" | "Other";
  
  // Employed Fields
  isCurrentEmployment?: boolean;
  companyName?: string;
  industryExperienceYears?: string;
  industryExperienceMonths?: string;
  companyAddress?: string;
  jobTitle?: string;
  workType?: "Full Time" | "Part Time" | "Seasonal";
  receivesBonus?: boolean;
  receivesBenefits?: boolean;
  annualIncome?: string;
  employmentStartDate?: string;
  employmentEndDate?: string;
  // Self-Employed Fields
  businessName?: string;
  businessAddress?: string;
  businessType?: string; 
  businessStructure?: "Corporation" | "Sole Proprietor" | "Partnership"; 
  paymentMethod?: "T4" | "Business Income" | "Dividends" | "Commission"; 
  selfEmployedStartDate?: string;
  selfEmployedEndDate?: string; // Added for past businesses
  netAnnualIncome?: string;
isCurrentIncomeSource?:boolean;
  otherIncomeType?: "Canadian Pension Plan(CPP)" | "Old Age Security" | "Survivor Benefit Pension" | "Other";
  otherIncomeName?: string;
  otherAnnualIncome?: string;
  otherIncomeStartDate?: string;

}

const IncomePage: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 2. The single state object now holds all possible fields.
  const [formData, setFormData] = useState<IFormData>({
    incomeType: "Employed",
    // Set initial defaults for the 'Employed' form
    isCurrentEmployment: true,
    companyName: "",
    companyAddress: "",
    jobTitle: "",
    workType: "Full Time",
    receivesBonus: false,
    receivesBenefits: false,
    annualIncome: "",
    employmentStartDate: "",
    employmentEndDate: "",
  });

  const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 3. A single handler to update state, passed down to child components.
  const handleDataChange = (updatedData: Partial<IFormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

   const handleIncomeTypeChange = (type: IFormData['incomeType']) => {
    const baseData = { incomeType: type, isCurrentIncomeSource: true };
    let newFormData: Partial<IFormData> = {};

    if (type === 'Employed') {
        newFormData = { ...baseData, workType: "Full Time" };
    } else if (type === 'Self-Employed') {
        newFormData = { ...baseData, businessStructure: "Sole Proprietor" };
    } else if (type === 'Other') {
        newFormData = { ...baseData, otherIncomeType: "Canadian Pension Plan(CPP)" };
    }
    setFormData(newFormData as IFormData);
  }
  // 4. The main submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Final Form Data Submitted:", formData);
    
    try {
      // router.push("/dashboard/application/step5");
      alert("Check the console for the final form data object!");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  const renderForm = () => {
    switch (formData.incomeType) {
      case "Employed":
        return <EmployedForm data={formData} onDataChange={handleDataChange} />;
      case "Self-Employed":
        return <SelfEmployedForm data={formData} onDataChange={handleDataChange} />;
      case "Other":
               return <OtherIncomeForm data={formData} onDataChange={handleDataChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-w-full">
      {/* Header and Progress Bar (No changes) */}
      <div className="flex justify-between text-black">
        <Link href="/dashboard/application/step3" className="flex gap-2 items-center">
          <IoMdArrowRoundBack />
          Income
        </Link>
        {isClient && (
          <span className="flex flex-col-reverse items-end gap-2">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className={`h-1.5 w-5 rounded-full ${index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"}`}></div>
              ))}
            </div>
            <h1 className="text-sm  text-black font-medium">{currentStep} of {totalSteps}</h1>
          </span>
        )}
      </div>
      <div className="bg-white min-h-screen mt-8 p-6 rounded-xl shadow-md max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg text-black font-semibold mb-1">
            What Type of income do you have?
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            (You can add more after clicking ‘continue’ at the bottom of the page)
          </p>

          {/* Income Type Selection */}
          <div className="flex flex-wrap gap-4 my-4 mt-8 justify-start ">
             {([
                { type: "Employed", icon: <FaRegAddressCard className="w-[3rem] text-gray-600 h-[3rem]" /> },
                { type: "Self-Employed", icon: <Image src={img1} alt="Self-Employed" /> },
                { type: "Other", icon: <Image src={img2} alt="Other Income" /> },
              ] as const).map(({ type, icon }) => (
                <div
                  key={type}
                  onClick={() => handleIncomeTypeChange(type)}
                  className={`min-w-[180px] border flex p-2 justify-center items-center h-[90px] rounded-xl cursor-pointer transition-all ${
                    formData.incomeType === type ? "border-blue-600 border-2" : "border-[#E9E9E9]"
                  }`}
                >
                  {icon}
                </div>
              ))}
          </div>

          {/* 5. Conditionally render the correct form component */}
          {renderForm()}

          {/* Submit Button is part of the parent form */}
          <div className="mt-8 w-full flex gap-6 justify-between">
            <Link href="/dashboard/application/step3" className="w-1/2">
            <button
              className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors"
              >
              Back
            </button>
              </Link>
            <Link href="/dashboard/application/step5" className="w-1/2">
            <button
              // type="submit"
              className="bg-[#013E8C] w-full text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
              >
              Continue
            </button>
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncomePage;
// "use client";

// import React, { useEffect, useState, FormEvent } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// // Icons
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { FaDollarSign, FaRegAddressCard } from "react-icons/fa";
// import { PiCompassRoseFill } from "react-icons/pi";

// // Assets
// import img1 from "../../../../../public/assets/selfemployed.png";
// import img2 from "../../../../../public/assets/other.png";

// const totalSteps = 7;

// // 1. Define a TypeScript interface for your form data for type safety
// interface IFormData {
//   incomeType: "Employed" | "Self-Employed" | "Other";
//   isCurrentEmployment: boolean;
//   companyName: string;
//   companyAddress: string;
//   jobTitle: string;
//   years: string;
//   months: string;
//   workType: "Full Time" | "Part Time" | "Seasonal";
//   receivesBonus: boolean;
//   receivesBenefits: boolean;
//   annualIncome: string; // Use string to handle empty input, convert to number on submission
//   startDateMonth: string;
//   startDateYear: string;
//   startingdate: string;
//   endingdate: string;
// }

// const IncomePage: React.FC = () => {
//   const pathname = usePathname();
//   const router = useRouter(); // For programmatic navigation

//   // 2. Use a single state object to manage all form data
//   const [formData, setFormData] = useState<IFormData>({
//     incomeType: "Employed",
//     isCurrentEmployment: true,

//     companyName: "",
//     months: "",
//     years: "",
//     companyAddress: "",
//     jobTitle: "",
//     workType: "Full Time",
//     receivesBonus: true,
//     receivesBenefits: false,
//     annualIncome: "",
//     startDateMonth: "",
//     startDateYear: "",
//     startingdate: "",
//     endingdate: "",
//   });

//   const [isClient, setIsClient] = useState(false);
//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // 3. Unified handler for standard text, number, and select inputs
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // 4. Custom handler for fields that don't map directly to e.target.value (like custom checkboxes)
  // const handleFieldChange = (fieldName: keyof IFormData, value: any) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [fieldName]: value,
  //   }));
  // };

//   // 5. Handle form submission
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);

//     // --- API CALL EXAMPLE ---
//     // Here you would send the formData to your API
//     try {
//       /*
//       const response = await fetch('/api/your-endpoint', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           // Convert numeric fields from string to number before sending
//           annualIncome: parseFloat(formData.annualIncome) || 0,
//           startDateYear: parseInt(formData.startDateYear) || 0,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       const result = await response.json();
//       console.log('API Response:', result);

//       // Navigate to the next step on success
//       router.push('/dashboard/application/step5');
//       */

//       // For demonstration, we'll just navigate to the next step
//       router.push("/dashboard/application/step5");
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//       // Handle error state in UI, e.g., show a notification
//     }
//   };

//   // Helper to generate a list of past years
//   const pastYears = Array.from({ length: 50 }, (_, i) => {
//     return new Date().getFullYear() - i;
//   });

//   return (
//     <div className="min-w-full">
//       {/* Header and Progress Bar */}
//       <div className="flex justify-between">
//         <Link
//           href="/dashboard/application/step3"
//           className="flex gap-2 items-center"
//         >
//           <IoMdArrowRoundBack />
//         </Link>

//         {isClient && (
//           <span className="flex items-center gap-2">
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
//             <h1 className="text-sm font-medium">
//               {currentStep} of {totalSteps}
//             </h1>
//           </span>
//         )}
//       </div>

//       {/* Form Content */}
//       <div className="bg-white min-h-screen mt-8 p-6 rounded-xl shadow-md min-w-full mx-auto">
//         {/* 6. Wrap everything in a form tag with an onSubmit handler */}
//         <form onSubmit={handleSubmit}>
//           <h2 className="text-lg font-semibold mb-1">
//             What Type of income do you have?
//           </h2>
//           <p className="text-sm text-gray-500 mb-4">
//             (You can add more after clicking ‘continue’ at the bottom of the
//             page)
//           </p>

//           {/* Income Type Selection */}
//           <div className="flex flex-wrap gap-4 my-4 mt-8 justify-start ">
//             {[
//               {
//                 type: "Employed",
//                 icon: (
//                   <FaRegAddressCard className="w-[3rem] text-gray-600 h-[3rem]" />
//                 ),
//               },
//               {
//                 type: "Self-Employed",
//                 icon: <Image src={img1} alt="Self-Employed" />,
//               },
//               { type: "Other", icon: <Image src={img2} alt="Other Income" /> },
//             ].map(({ type, icon }) => (
//               <div
//                 key={type}
//                 onClick={() => handleFieldChange("incomeType", type)}
//                 className={`min-w-[180px] border flex p-2 justify-center items-center h-[90px] rounded-xl cursor-pointer transition-all ${
//                   formData.incomeType === type
//                     ? "border-blue-600 border-2"
//                     : "border-[#E9E9E9]"
//                 }`}
//               >
//                 {icon}
//               </div>
//             ))}
//           </div>

//           <h3 className="text-lg font-semibold text-gray-900 ">Employment</h3>
//           <hr className="text-gray-700 my-4" />

//           {/* Is this your current employment? */}
//           <div className="mb-4">
//             <label className="block mb-1 text-lg font-semibold text-gray-900">
//               Is this your current employment?
//             </label>
//             <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
//               {["Yes", "No"].map((option) => (
//                 <label
//                   key={option}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     name="isCurrentEmployment"
//                     checked={
//                       formData.isCurrentEmployment === (option === "Yes")
//                     }
//                     onChange={() =>
//                       handleFieldChange("isCurrentEmployment", option === "Yes")
//                     }
//                     className="accent-blue-600 w-[15px] h-[15px]"
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Company Name */}
//           <div className="mb-4">
//             <label
//               htmlFor="companyName"
//               className="block font-semibold text-[#111827] text-[18px] mb-2"
//             >
//               Company name
//             </label>
//             <input
//               id="companyName"
//               name="companyName"
//               type="text"
//               placeholder="What's the company name?"
//               value={formData.companyName}
//               onChange={handleChange}
//               className="w-full border rounded-full border-gray-300  px-4 py-2"
//               required
//             />
//           </div>

//           {/* Company Address */}
//           <div className="mb-4">
//             <label
//               htmlFor="companyAddress"
//               className="flex gap-1 items-center font-semibold text-[#111827] text-[18px] min-w-full mb-2"
//             >
//               What’s the Company address?
//               <div className="max-w-[30px] min-w-[30px] flex justify-center items-center min-h-[30px] bg-[#EBF4FF] rounded-full text-sm">
//                 i
//               </div>
//             </label>
//             <div className="relative">
//               <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
//               <input
//                 id="companyAddress"
//                 name="companyAddress"
//                 type="text"
//                 value={formData.companyAddress}
//                 onChange={handleChange}
//                 className="w-full border rounded-full pl-9 border-gray-300 px-4 py-2"
//                 placeholder="Start typing the address"
//               />
//             </div>
// //             <span className="flex text-[16px] text-black font-normal justify-between my-4">
// //               <p>Can’t find the address</p>
// //               <p className="text-[#013E8C]  border-b-2 border-b-[#013E8C] font-semibold cursor-pointer">
// //                 Typing Manually?
// //               </p>
// //             </span>
// //           </div>

//           {/* Job Title */}
          // <div className="mb-4">
          //   <label
          //     htmlFor="jobTitle"
          //     className="block font-semibold text-[#111827] text-[18px] mb-2"
          //   >
          //     Job Title
          //   </label>
          //   <input
          //     id="jobTitle"
          //     name="jobTitle"
          //     type="text"
          //     placeholder="Job Title"
          //     value={formData.jobTitle}
          //     onChange={handleChange}
          //     className="w-full border rounded-full  border-gray-300  px-4 py-2"
          //   />
          // </div>

//           {/* Work Frequency */}
          // <div className="mt-6">
          //   <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          //     How often do you work?
          //   </label>
          //   <div className="flex gap-4">
          //     {(["Full Time", "Part Time", "Seasonal"] as const).map((type) => (
          //       <label
          //         key={type}
          //         className="flex items-center gap-2 cursor-pointer"
          //       >
          //         <input
          //           type="checkbox"
          //           name="workType"
          //           checked={formData.workType === type}
          //           onChange={() => handleFieldChange("workType", type)}
          //           className="accent-blue-600 w-[15px] h-[15px]"
          //         />
          //         {type}
          //       </label>
          //     ))}
          //   </div>
          // </div>

          // {/* Bonuses */}
          // <div className="my-6">
          //   <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
          //     Do you receive bonuses, overtime or commissions?
          //   </label>
          //   <div className="flex gap-6">
          //     {["Yes", "No"].map((option) => (
          //       <label
          //         key={option}
          //         className="flex items-center gap-2 cursor-pointer"
          //       >
          //         <input
          //           type="checkbox"
          //           name="receivesBonus"
          //           checked={formData.receivesBonus === (option === "Yes")}
          //           onChange={() =>
          //             handleFieldChange("receivesBonus", option === "Yes")
          //           }
          //           className="accent-blue-600 w-[15px] h-[15px]"
          //         />
          //         {option}
          //       </label>
          //     ))}
          //   </div>
          // </div>

          // {/* Benefits */}
          // <div className="mb-6">
          //   <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
          //     Do you receive benefits?
          //   </label>
          //   <div className="flex gap-6">
          //     {["Yes", "No"].map((option) => (
          //       <label
          //         key={option}
          //         className="flex items-center gap-2 cursor-pointer"
          //       >
          //         <input
          //           type="checkbox"
          //           name="receivesBenefits"
          //           checked={formData.receivesBenefits === (option === "Yes")}
          //           onChange={() =>
          //             handleFieldChange("receivesBenefits", option === "Yes")
          //           }
          //           className="accent-blue-600 w-[15px] h-[15px]"
          //         />
          //         {option}
          //       </label>
          //     ))}
          //   </div>
          // </div>

//           {/* Annual Income */}
//           <div className="relative mt-4 w-full">
//             <label
//               htmlFor="annualIncome"
//               className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2"
//             >
//               What’s your annual income from this job?*
//               <span className="font-light text-[13px]">
//                 (Please include all bonuses, overtime and commissions.)
//               </span>
//             </label>
//             <div className="relative mt-2">
//               <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
//               <input
//                 id="annualIncome"
//                 name="annualIncome"
//                 type="number"
//                 value={formData.annualIncome}
//                 onChange={handleChange}
//                 className="w-full border rounded-full pl-8 border-gray-300 px-4 py-2"
//                 placeholder="e.g. 50000"
//                 required
//               />
//             </div>
//           </div>

//           {/* Start Date */}
          // <div className="grid mt-4 grid-cols-1 gap-1">
          //   <label className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
          //     How long have you worked in this industry?
          //   </label>
          //   <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 ">
          //     <input
          //       id="years"
          //       name="years"
          //       type="number"
          //       value={formData.years}
          //       onChange={handleChange}
          //       className="w-full border rounded-full text-end font-semibold border-gray-300 px-4 py-2"
          //       placeholder="Yr"
          //       required
          //     />
          //     <input
          //       id="months"
          //       name="months"
          //       type="number"
          //       value={formData.months}
          //       onChange={handleChange}
          //       className="w-full border rounded-full font-semibold text-end  border-gray-300 px-4 py-2"
          //       placeholder="mo"
          //       required
          //     />
          //   </div>
          // </div>

//           <div className="relative mt-4 w-full">
//             <label
//               htmlFor="annualIncome"
//               className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2"
//             >
//               When did you start working here?*
//               <span className="font-light text-[13px]">
//                 (If you are not sure, just estimate)
//               </span>
//             </label>
//             <div className="relative mt-2">
//               <input
//                 id="startingdate"
//                 name="startingdate"
//                 type="date"
//                 value={formData.startingdate}
//                 onChange={handleChange}
//                 className="w-full border rounded-full  border-gray-300 px-4 py-2"
//                 placeholder="e.g. 50000"
//                 required
//               />
//             </div>
//           </div>

//  <div className="relative mt-4 w-full">
//             <label
//               htmlFor="annualIncome"
//               className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2"
//             >
//               When did you stop working here?*
//               <span className="font-light text-[13px]">
//               (If you are not sure, just estimate)
//               </span>
//             </label>
//             <div className="relative mt-2">
//               <input
//                 id="endingdate"
//                 name="endingdate"
//                 type="date"
//                 value={formData.endingdate}
//                 onChange={handleChange}
//                 className="w-full border rounded-full  border-gray-300 px-4 py-2"
//                 placeholder="e.g. 50000"
//                 required
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-8 flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#013E8C] text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
//             >
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default IncomePage;
