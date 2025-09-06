// src/app/dashboard/application/step4/SelfEmployedForm/SelfEmployedForm.tsx

import React from "react";
import { IFormData } from "../step4/page"; // Adjust path if necessary
import Image from "next/image";
import { FaDollarSign } from "react-icons/fa";
import { PiCompassRoseFill } from "react-icons/pi";

// Assets
import img1 from "../../../../../public/assets/t4.png"
import img2 from "../../../../../public/assets/Business Income.png"
import img3 from "../../../../../public/assets/Dividends.png"
import img4 from "../../../../../public/assets/Commision.png"

interface SelfEmployedFormProps {
  data: Partial<IFormData>;
  onDataChange: (updatedData: Partial<IFormData>) => void;
}

const SelfEmployedForm: React.FC<SelfEmployedFormProps> = ({ data, onDataChange }) => {
  // Generic handler for standard inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onDataChange({ [e.target.name]: e.target.value });
  };
  
  // Custom handler for radio buttons, checkboxes, and custom selectors
  const handleFieldChange = (fieldName: keyof IFormData, value: any) => {
    onDataChange({ [fieldName]: value });
  };

  const paymentOptions = [
    { name: "T4", icon: img1 },
    { name: "Business Income", icon: img2 },
    { name: "Dividends", icon: img3 },
    { name: "Commission", icon: img4 },
  ] as const;
  
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mt-6">Self-Employment</h3>
      <hr className="text-gray-700 my-4" />

      <div className="mb-4">
        <label className="block mb-1 text-lg font-semibold text-gray-900">
          Is this your current employment?
        </label>
         <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
          {["Yes", "No"].map((option) => {
            const value = option === "Yes";
            return (
              <label
                key={option}
                className={`flex items-center cursor-pointer px-3 py-1 rounded-full border ${
                  data.isCurrentIncomeSource === value
                    ? "bg-blue-100 border-blue-600"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="isCurrentIncomeSource"
                  checked={data.isCurrentIncomeSource === value}
                  onChange={() => handleFieldChange("isCurrentIncomeSource", value)}
                 
                />
                {option}
              </label>
            );
          })}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="businessName" className="block font-semibold text-[#111827] text-[18px] mb-2">What’s your business name?</label>
        <input id="businessName" name="businessName" type="text" placeholder="Business name?" value={data.businessName || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
      </div>

      <div className="mb-4">
        <label htmlFor="businessAddress" className="flex gap-1 items-center font-semibold text-[#111827] text-[18px] min-w-full mb-2">
          What’s the business address?
          <div className="max-w-[30px] min-w-[30px] flex justify-center items-center min-h-[30px] bg-[#EBF4FF] rounded-full text-sm">i</div>
        </label>
        <div className="relative">
          <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input id="businessAddress" name="businessAddress" type="text" value={data.businessAddress || ''} onChange={handleChange} className="w-full border rounded-full pl-9 border-gray-300 px-4 py-2" placeholder="Start typing the address" />
        </div>
        <span className="flex text-[16px] text-black font-normal justify-between my-4">
          <p>Can’t find the address</p>
          <p className="text-[#013E8C] border-b-2 border-b-[#013E8C] font-semibold cursor-pointer">Typing Manually?</p>
        </span>
      </div>

      <div className="mb-4">
        <label htmlFor="businessType" className="block font-semibold text-[#111827] text-[18px] mb-2">What is your profession or industry?</label>
        <input id="businessType" name="businessType" type="text" placeholder="e.g., Web Developer, Landscaper, Consultant" value={data.businessType || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
      </div>
      
      <div className="mt-6">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">What type of business is it?</label>
        <div className="flex gap-4 flex-wrap">
          {(["Corporation", "Sole Proprietor", "Partnership"] as const).map((type) => (
            <div
              key={type}
              onClick={() => handleFieldChange("businessStructure", type)}
              className={`px-4 py-2 cursor-pointer rounded-full border transition-all ${
                data.businessStructure === type
                  ? "bg-blue-100 border-blue-600 font-semibold"
                  : "border-gray-300 hover:border-gray-500"
              }`}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

  <div className="relative mt-6 w-full">
        <label htmlFor="netAnnualIncome" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
            What’s your annual income from this business?**
            <span className="font-light text-[13px]">(This is your income after business expenses)</span>
        </label>
        <div className="relative mt-2">
            <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
            <input id="netAnnualIncome" name="netAnnualIncome" type="number" value={data.netAnnualIncome || ''} onChange={handleChange} className="w-full border rounded-full pl-8 border-gray-300 px-4 py-2" placeholder="e.g. 75000" required />
        </div>
      </div>
      <div className="relative mt-6 w-full">
        <label className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
           How do you pay yourself?
        </label>
         <div className="flex flex-wrap gap-4 w-full mt-2">
          {paymentOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => handleFieldChange("paymentMethod", option.name)}
              className={`min-w-[160px] flex-1 border rounded-xl flex flex-col h-[90px] justify-center items-center cursor-pointer transition-all ${
                data.paymentMethod === option.name
                  ? "border-blue-600 border-2 bg-blue-50"
                  : "border-gray-300 hover:border-gray-500"
              }`}
            >
              <Image src={option.icon} alt={option.name} className="object-contain w-[50px]" />
              <p className="text-sm font-medium mt-1">{option.name}</p>
            </div>
          ))}
        </div>
      </div>

    

       <div className="relative mt-6 w-full">
        <label htmlFor="selfEmployedStartDate" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
         When did you start this business?*
          <span className="font-light text-[13px]">(If you are not sure, just estimate)</span>
        </label>
        <input id="selfEmployedStartDate" name="selfEmployedStartDate" type="date" value={data.selfEmployedStartDate || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
      </div>

      {data.isCurrentIncomeSource === false && (
         <div className="relative mt-6 w-full">
            <label htmlFor="selfEmployedEndDate" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
              When did this business end?*
              <span className="font-light text-[13px]">(If you are not sure, just estimate)</span>
            </label>
            <input id="selfEmployedEndDate" name="selfEmployedEndDate" type="date" value={data.selfEmployedEndDate || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
        </div>
      )}
    </>
  );
};

export default SelfEmployedForm;














// // src/app/dashboard/application/step4/SelfEmployedForm.tsx

// import React from "react";
// import { IFormData } from "../step4/page"; // Import the shared interface
// import { FaDollarSign } from "react-icons/fa";
// import { PiCompassRoseFill } from "react-icons/pi";
// import Image from "next/image";
// import img1 from "../../../../../public/assets/t4.png"
// import img2 from "../../../../../public/assets/Business Income.png"
// import img3 from "../../../../../public/assets/Dividends.png"
// import img4 from "../../../../../public/assets/Commision.png"
// interface SelfEmployedFormProps {
//   data: Partial<IFormData>;
//   onDataChange: (updatedData: Partial<IFormData>) => void;
// }

// const SelfEmployedForm: React.FC<SelfEmployedFormProps> = ({ data, onDataChange }) => {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     onDataChange({ [e.target.name]: e.target.value });
//   };
  
//   return (
//     <>
//       <h3 className="text-lg font-semibold text-gray-900 mt-6">Self-Employment </h3>
//       <hr className="text-gray-700 my-4" />

//   <div className="mb-4">
//         <label className="block mb-1 text-lg font-semibold text-gray-900">
//           Is this your current employment?
//         </label>
//         <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input type="radio" name="isCurrentEmployment" checked={data.isCurrentEmployment === true} onChange={() => handleChange("isCurrentEmployment", true)} className="accent-blue-600 w-[15px] h-[15px]" />
//             Yes
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input type="radio" name="isCurrentEmployment" checked={data.isCurrentEmployment === false} onChange={() => handleChange("isCurrentEmployment", false)} className="accent-blue-600 w-[15px] h-[15px]" />
//             No
//           </label>
//         </div>
//       </div>
//       {/* Business Name */}
//       <div className="mb-4">
//         <label htmlFor="businessName" className="block font-semibold text-[#111827] text-[18px] mb-2">What’s your business name?</label>
//         <input id="businessName" name="businessName" type="text" placeholder="Business name?" value={data.businessName || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
//       </div>

//  <div className="mb-4">
//             <label
//               htmlFor="companyAddress"
//               className="flex gap-1 items-center font-semibold text-[#111827] text-[18px] min-w-full mb-2"
//             >
//               What’s the Business address?
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
//                 value={data.companyAddress}
//                 onChange={handleChange}
//                 className="w-full border rounded-full pl-9 border-gray-300 px-4 py-2"
//                 placeholder="Start typing the address"
//               />
//             </div>
//              <span className="flex text-[16px] text-black font-normal justify-between my-4">
//                <p>Can’t find the address</p>
//                <p className="text-[#013E8C]  border-b-2 border-b-[#013E8C] font-semibold cursor-pointer">
//                  Typing Manually?
//                </p>
//              </span>
//            </div>

//       {/* Type of Business */}
//       <div className="mb-4">
//         <label htmlFor="businessType" className="block font-semibold text-[#111827] text-[18px] mb-2">What type of business is it?</label>
//         <input id="businessType" name="businessType" type="text" placeholder="e.g., Web Developer, Landscaper, Consultant" value={data.businessType || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
//       </div>
      

//  <div className="mt-6">
//             <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//               What type of business is it?
//             </label>
//             <div className="flex gap-4">
//               {(["Corporation", "Sole Proprietor", "Partnership"] as const).map((type) => (
//                 <label
//                   key={type}
//                   className="flex items-center gap-2 cursor-pointer"
//                 >
//                   <input
//                     type="checkbox"
//                     name="workType"
//                     checked={data.workType === type}
//                     onChange={() => handleChange("workType", type)}
//                     className="accent-blue-600 w-[15px] h-[15px]"
//                   />
//                   {type}
//                 </label>
//               ))}
//             </div>
//           </div>


//        {/* Start Date */}
      

//       {/* Net Annual Income */}
//       <div className="relative mt-4 w-full">
//         <label htmlFor="netAnnualIncome" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
//             What’s your annual income from this business?*
//         </label>
//         <div className="relative mt-2">
//             <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
//             <input id="netAnnualIncome" name="netAnnualIncome" type="number" value={data.netAnnualIncome || ''} onChange={handleChange} className="w-full border rounded-full pl-8 border-gray-300 px-4 py-2" placeholder="e.g. 75000" required />
//         </div>
//       </div>

// <div className="relative mt-4 w-full">
//         <label htmlFor="netAnnualIncome" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
//            How do you pay yourself?
//         </label>
//         <div className="flex gap-4 w-full mt-2">
//             {/* select one  */}
//             <span className="w-[180px]   hover:border-blue-400 hover:text-blue-500  border border-gray-400 rounded-xl flex flex-col h-[90px]  justify-center items-center">
//                 <Image src={img1} alt="" className="object-contain w-[50px] hover:text-blue-600"/>
//                 <p>T4</p>
//             </span>
//             <span className="w-[180px]   hover:border-blue-400 hover:text-blue-500  border border-gray-400 rounded-xl flex flex-col h-[90px]  justify-center items-center">
//                 <Image src={img2} alt="" className="object-contain w-[50px]"/>
//                 <p>Business Income</p>
//             </span>
//             <span className="w-[180px]   hover:border-blue-400 hover:text-blue-500  border border-gray-400 rounded-xl flex flex-col h-[90px]  justify-center items-center">
//                 <Image src={img3} alt="" className="object-contain w-[50px]"/>
//                 <p>Dividends</p>
//             </span>
//             <span className="w-[180px]   hover:border-blue-400 hover:text-blue-500  border border-gray-400 rounded-xl flex flex-col h-[90px]  justify-center items-center">
//                 <Image src={img4} alt="" className="object-contain w-[50px]"/>
//                 <p>Commision</p>
//             </span>
//         </div>
//       </div>




//        <div className="relative mt-4 w-full">
//         <label htmlFor="selfEmployedStartDate" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
//          When did you start working here?*
//           <span className="font-light text-[13px]">(If you are not sure, just estimate)</span>
//         </label>
//         <input id="selfEmployedStartDate" name="selfEmployedStartDate" type="date" value={data.selfEmployedStartDate || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
//       </div>
//     </>
//   );
// };

// export default SelfEmployedForm;