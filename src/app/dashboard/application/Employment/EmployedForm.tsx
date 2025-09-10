"use client";

import React from "react";
import { IFormData } from "../step4/page"; 
import { FaDollarSign } from "react-icons/fa";
import { PiCompassRoseFill } from "react-icons/pi";

interface EmployedFormProps {
  data: Partial<IFormData>;
  onDataChange: (updatedData: Partial<IFormData>) => void;
}

const EmployedForm: React.FC<EmployedFormProps> = ({ data, onDataChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onDataChange({ [name]: value });
  };

 // Updated type to allow objects
const handleRadioChange = (
  name: keyof IFormData,
  value: boolean | string | { id: number; label: string }
) => {
  onDataChange({ [name]: value });
};

  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mt-6">Employment Details</h3>
      <hr className="text-gray-700 my-4" />

      {/* Current Employment */}
      <div className="mb-4">
        <label className="block mb-1 text-lg font-semibold text-gray-900">
          Is this your current employment?
        </label>
        <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className={`flex items-center cursor-pointer px-3 py-1 rounded-full ${
                (data.isCurrentIncomeSource === true && option === "Yes") ||
                (data.isCurrentIncomeSource === false && option === "No")
                  ? "bg-blue-100 border border-blue-600"
                  : "border border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="isCurrentIncomeSource"
                checked={
                  (data.isCurrentIncomeSource === true && option === "Yes") ||
                  (data.isCurrentIncomeSource === false && option === "No")
                }
                onChange={() =>
                  handleRadioChange("isCurrentIncomeSource", option === "Yes")
                }
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Company Name */}
      <div className="mb-4">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">Company Name</label>
        <input
          name="companyaddress"
          type="text"
          placeholder="Company Name"
          value={data.companyaddress || ""}
          onChange={handleChange}
          className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
          required
        />
      </div>

      {/* Company Address */}
      <div className="mb-4">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          Company Address
        </label>
        <div className="relative">
          <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            name="businessAddress"
            type="text"
            placeholder="Start typing the address"
            value={data.businessAddress || ""}
            onChange={handleChange}
            className="w-full border rounded-full pl-9 px-4 py-2 text-black border-gray-300"
          />
        </div>
      </div>

      {/* Job Title */}
      <div className="mb-4">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">Job Title</label>
        <input
          name="jobTitle"
          type="text"
          placeholder="Job Title"
          value={data.jobTitle || ""}
          onChange={handleChange}
          className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
        />
      </div>

      {/* Work Type */}
      <div className="mt-6">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">How often do you work?</label>
        <div className="flex gap-4">
          {(["Full Time", "Part Time", "Seasonal"] as const).map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
                data.workOftenData?.label === type
                  ? "bg-blue-100 border border-blue-600"
                  : "border border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="workOftenData"
                checked={data.workOftenData?.label === type}
                onChange={() =>
                  handleRadioChange("workOftenData", { id: 1, label: type })
                }
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Bonuses */}
      <div className="my-6">
        <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
          Do you receive bonuses, overtime or commissions?
        </label>
        <div className="flex gap-6">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
                data.bonusOvertime?.label === option
                  ? "bg-blue-100 border border-blue-600"
                  : "border border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="bonusOvertime"
                checked={data.bonusOvertime?.label === option}
                onChange={() =>
                  handleRadioChange("bonusOvertime", { id: 1, label: option })
                }
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
          Do you receive benefits?
        </label>
        <div className="flex gap-6">
          {["Yes", "No"].map((option) => (
            <label
              key={option}
              className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
                data.benifits?.label === option
                  ? "bg-blue-100 border border-blue-600"
                  : "border border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="benifits"
                checked={data.benifits?.label === option}
                onChange={() =>
                  handleRadioChange("benifits", { id: 1, label: option })
                }
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Annual Income */}
      <div className="relative mt-4">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          Annual Income
        </label>
        <div className="relative">
          <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
          <input
            name="annualIncome"
            type="number"
            value={data.annualIncome || ""}
            onChange={handleChange}
            className="w-full border rounded-full pl-8 px-4 py-2 text-[#111827] border-gray-300"
            placeholder="e.g. 50000"
            required
          />
        </div>
      </div>

      {/* Experience */}
      <div className="grid mt-4 grid-cols-2 gap-4">
        <input
          name="workedYear"
          type="number"
          value={data.workedYear || ""}
          onChange={handleChange}
          placeholder="Years"
          className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
        />
        <input
          name="workedMonth"
          type="number"
          value={data.workedMonth || ""}
          onChange={handleChange}
          placeholder="Months"
          className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
        />
      </div>

      {/* Start Date */}
      <div className="mt-4">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          Employment Start Date
        </label>
        <input
          name="startworking"
          type="date"
          value={data.startworking || ""}
          onChange={handleChange}
          className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
        />
      </div>

      {/* End Date */}
      {data.isCurrentIncomeSource === false && (
        <div className="mt-4">
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">
            Employment End Date
          </label>
          <input
            name="stopworking"
            type="date"
            value={data.stopworking || ""}
            onChange={handleChange}
            className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
          />
        </div>
      )}
    </>
  );
};

export default EmployedForm;

























// import React from "react";
// import { IFormData } from "../step4/page"; 
// import { FaDollarSign } from "react-icons/fa";
// import { PiCompassRoseFill } from "react-icons/pi";

// interface EmployedFormProps {
//   data: Partial<IFormData>;
//   onDataChange: (updatedData: Partial<IFormData>) => void;
// }

// const EmployedForm: React.FC<EmployedFormProps> = ({ data, onDataChange }) => {

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     onDataChange({ [name]: value });
//   };

//   const handleRadioChange = (name: keyof IFormData, value: boolean | string) => {
//     onDataChange({ [name]: value });
//   };

//   return (
//     <>
//       <h3 className="text-lg font-semibold text-gray-900 mt-6">Employment Details</h3>
//       <hr className="text-gray-700 my-4" />

//       {/* Current Employment */}
//       <div className="mb-4">
//         <label className="block mb-1 text-lg font-semibold text-gray-900">
//           Is this your current employment?
//         </label>
//         <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
//           {["Yes", "No"].map((option) => (
//             <label
//               key={option}
//               className={`flex items-center cursor-pointer px-3 py-1 rounded-full ${
//                 (data.isCurrentEmployment === true && option === "Yes") ||
//                 (data.isCurrentEmployment === false && option === "No")
//                   ? "bg-blue-100 border border-blue-600"
//                   : "border border-gray-300"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="isCurrentEmployment"
//                 checked={
//                   (data.isCurrentEmployment === true && option === "Yes") ||
//                   (data.isCurrentEmployment === false && option === "No")
//                 }
//                 onChange={() =>
//                   handleRadioChange("isCurrentEmployment", option === "Yes")
//                 }
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Company Name */}
//       <div className="mb-4">
//         <label className="block font-semibold text-[#111827] text-[18px] mb-2">Company Name</label>
//         <input
//           name="companyName"
//           type="text"
//           placeholder="Company Name"
//           value={data.companyName || ""}
//           onChange={handleChange}
//           className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
//           required
//         />
//       </div>

//       {/* Company Address */}
//       <div className="mb-4">
//         <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//           Company Address
//         </label>
//         <div className="relative">
//           <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
//           <input
//             name="companyAddress"
//             type="text"
//             placeholder="Start typing the address"
//             value={data.companyAddress || ""}
//             onChange={handleChange}
//             className="w-full border rounded-full pl-9 px-4 py-2 text-black border-gray-300"
//           />
//         </div>
//       </div>

//       {/* Job Title */}
//       <div className="mb-4">
//         <label className="block font-semibold text-[#111827] text-[18px] mb-2">Job Title</label>
//         <input
//           name="jobTitle"
//           type="text"
//           placeholder="Job Title"
//           value={data.jobTitle || ""}
//           onChange={handleChange}
//           className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
//         />
//       </div>

//       {/* Work Type */}
//       <div className="mt-6">
//         <label className="block font-semibold text-[#111827] text-[18px] mb-2">How often do you work?</label>
//         <div className="flex gap-4">
//           {(["Full Time", "Part Time", "Seasonal"] as const).map((type) => (
//             <label
//               key={type}
//               className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
//                 data.workType === type
//                   ? "bg-blue-100 border border-blue-600"
//                   : "border border-gray-300"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="workType"
//                 checked={data.workType === type}
//                 onChange={() => handleRadioChange("workType", type)}
//               />
//               {type}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Bonuses */}
//       <div className="my-6">
//         <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
//           Do you receive bonuses, overtime or commissions?
//         </label>
//         <div className="flex gap-6">
//           {["Yes", "No"].map((option) => (
//             <label
//               key={option}
//               className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
//                 data.receivesBonus === (option === "Yes")
//                   ? "bg-blue-100 border border-blue-600"
//                   : "border border-gray-300"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="receivesBonus"
//                 checked={data.receivesBonus === (option === "Yes")}
//                 onChange={() => handleRadioChange("receivesBonus", option === "Yes")}
//               />
//               {option}
//             </label>
//           ))}
//         </div>
       
//       </div>

//       {/* Benefits */}
//       <div className="mb-6">
//         <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
//           Do you receive benefits?
//         </label>
//         <div className="flex gap-6">
//           {["Yes", "No"].map((option) => (
//             <label
//               key={option}
//               className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
//                 data.receivesBenefits === (option === "Yes")
//                   ? "bg-blue-100 border border-blue-600"
//                   : "border border-gray-300"
//               }`}
//             >
//               <input
//                 type="radio"
//                 name="receivesBenefits"
//                 checked={data.receivesBenefits === (option === "Yes")}
//                 onChange={() => handleRadioChange("receivesBenefits", option === "Yes")}
//               />
//               {option}
//             </label>
//           ))}
//         </div>
       
//       </div>

//       {/* Annual Income */}
//       <div className="relative mt-4">
//         <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//           Annual Income
//         </label>
//         <div className="relative">
//           <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
//           <input
//             name="annualIncome"
//             type="number"
//             value={data.annualIncome || ""}
//             onChange={handleChange}
//             className="w-full border rounded-full pl-8 px-4 py-2 text-[#111827] border-gray-300"
//             placeholder="e.g. 50000"
//             required
//           />
//         </div>
//       </div>

//       {/* Industry Experience */}
//       <div className="grid mt-4 grid-cols-2 gap-4">
//         <input
//           name="industryExperienceYears"
//           type="number"
//           value={data.industryExperienceYears || ""}
//           onChange={handleChange}
//           placeholder="Years"
//           className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
//           required
//         />
//         <input
//           name="industryExperienceMonths"
//           type="number"
//           value={data.industryExperienceMonths || ""}
//           onChange={handleChange}
//           placeholder="Months"
//           className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
//           required
//         />
//       </div>

//       {/* Start Date */}
//       <div className="mt-4">
//         <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//           Employment Start Date
//         </label>
//         <input
//           name="employmentStartDate"
//           type="date"
//           value={data.employmentStartDate || ""}
//           onChange={handleChange}
//           className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
//           required
//         />
//       </div>

//       {/* End Date - only if not current */}
//       {data.isCurrentEmployment === false && (
//         <div className="mt-4">
//           <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//             Employment End Date
//           </label>
//           <input
//             name="employmentEndDate"
//             type="date"
//             value={data.employmentEndDate || ""}
//             onChange={handleChange}
//             className="w-full border rounded-full px-4 py-2 text-[#111827] border-gray-300"
//             required
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default EmployedForm;
















// // // src/app/dashboard/application/step4/EmployedForm.tsx

// // import React from "react";
// // import { IFormData } from "../step4/page"; // Import the shared interface
// // import { FaDollarSign } from "react-icons/fa";
// // import { PiCompassRoseFill } from "react-icons/pi";

// // interface EmployedFormProps {
// //   data: Partial<IFormData>;
// //   onDataChange: (updatedData: Partial<IFormData>) => void;
// // }

// // const EmployedForm: React.FC<EmployedFormProps> = ({ data, onDataChange }) => {
// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
// //   ) => {
// //     onDataChange({ [e.target.name]: e.target.value });
// //   };

// //   const handleRadioChange = (name: keyof IFormData, value: boolean | string) => {
// //     onDataChange({ [name]: value });
// //   };
   
  
// //   return (
// //     <>
// //       <h3 className="text-lg font-semibold text-gray-900 mt-6">Employment Details</h3>
// //       <hr className="text-gray-700 my-4" />

// //       {/* Is this your current employment? */}
// //     <div className="mb-4">
// //   <label className="block mb-1 text-lg font-semibold text-gray-900">
// //     Is this your current employment?
// //   </label>
// //   <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
// //     <label
// //       className={`flex items-center  cursor-pointer px-3 py-1 rounded-full ${
// //         data.isCurrentEmployment === true
// //           ? "bg-blue-100 border border-blue-600"
// //           : "border border-gray-300"
// //       }`}
// //     >
// //       <input
// //         type="radio"
// //         name="isCurrentEmployment"
// //         checked={data.isCurrentEmployment === true}
// //         onChange={() => handleRadioChange("isCurrentEmployment", true)}
        
// //       />
// //       Yes
// //     </label>
// //     <label
// //       className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
// //         data.isCurrentEmployment === false
// //           ? "bg-blue-100 border border-blue-600"
// //           : "border border-gray-300"
// //       }`}
// //     >
// //       <input
// //         type="radio"
// //         name="isCurrentEmployment"
// //         checked={data.isCurrentEmployment === false}
// //         onChange={() => handleRadioChange("isCurrentEmployment", false)}
        
// //       />
// //       No
// //     </label>
// //   </div>
// // </div>

// //       {/* Company Name */}
// //       <div className="mb-4">
// //         <label htmlFor="companyName" className="block font-semibold text-[#111827] text-[18px] mb-2">Company name</label>
// //         <input id="companyName" name="companyName" type="text" placeholder="What's the company name?" value={data.companyName || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" required />
// //       </div>

    
// //      <div className="mb-4">
// //             <label
// //               htmlFor="companyAddress"
// //               className="flex gap-1 items-center font-semibold text-[#111827] text-[18px] min-w-full mb-2"
// //             >
// //               What’s the Company address?
// //               <div className="max-w-[30px] min-w-[30px] flex justify-center items-center min-h-[30px] bg-[#EBF4FF] rounded-full text-sm">
// //                 i
// //               </div>
// //             </label>
// //             <div className="relative">
// //               <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
// //               <input
// //                 id="companyAddress"
// //                 name="companyAddress"
// //                 type="text"
// //                 value={data.companyAddress}
// //                 onChange={handleChange}
// //                 className="w-full border rounded-full pl-9 text-black border-gray-300 px-4 py-2"
// //                 placeholder="Start typing the address"
// //               />
// //             </div>
// //              <span className="flex text-[16px] text-black font-normal justify-between my-4">
// //                <p>Can’t find the address</p>
// //                <p className="text-[#013E8C]  border-b-2 border-b-[#013E8C] font-semibold cursor-pointer">
// //                  Typing Manually?
// //                </p>
// //              </span>
// //            </div>
// //           <div className="mb-4">
// //             <label
// //               htmlFor="jobTitle"
// //               className="block font-semibold text-[#111827] text-[18px] mb-2"
// //             >
// //               Job Title
// //             </label>
// //             <input
// //               id="jobTitle"
// //               name="jobTitle"
// //               type="text"
// //               placeholder="Job Title"
// //               value={data.jobTitle}
// //               onChange={handleChange}
// //               className="w-full border rounded-full text-black  border-gray-300  px-4 py-2"
// //             />
// //           </div>







// //           <div className="mt-6">
// //             <label className="block font-semibold text-[#111827] text-[18px] mb-2">
// //               How often do you work?
// //             </label>
// //             <div className="flex gap-4 text-[#111827]">
// //               {(["Full Time", "Part Time", "Seasonal"] as const).map((type) => (
// //                   <label
// //     key={type}
// //     className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded-full ${
// //       data.workType === type
// //         ? "bg-blue-100 border border-blue-600"
// //         : "border border-gray-300"
// //     }`}
// //   >
// //                   <input
// //                     type="checkbox"
// //                     name="workType"
// //                     checked={data.workType === type}
// //                     onChange={() => handleRadioChange("workType", type)}
                    
// //                   />
// //                   {type}
// //                 </label>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Bonuses */}
// //          <div className="my-6">
// //   <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
// //     Do you receive bonuses, overtime or commissions?
// //   </label>
// //   <div className="flex gap-6 text-[#111827]">
// //     {["Yes", "No"].map((option) => (
// //       <label
// //         key={option}
// //         className={`flex items-center  cursor-pointer px-3 py-1 rounded-full ${
// //           data.receivesBonus === (option === "Yes")
// //             ? "bg-blue-100 border border-blue-600"
// //             : "border border-gray-300"
// //         }`}
// //       >
// //         <input
// //           type="checkbox"
// //           name="receivesBonus"
// //           checked={data.receivesBonus === (option === "Yes")}
// //           onChange={() =>
// //             handleRadioChange("receivesBonus", option === "Yes")
// //           }
// //          />
// //         {option}
// //       </label>
// //     ))}
// //   </div>
// // </div>


// //           {/* Benefits */}
// //          <div className="mb-6">
// //   <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
// //     Do you receive benefits?
// //   </label>
// //   <div className="flex gap-6 text-[#111827]">
// //     {["Yes", "No"].map((option) => (
// //       <label
// //         key={option}
// //         className={`flex items-center cursor-pointer px-3 py-1 rounded-full ${
// //           data.receivesBenefits === (option === "Yes")
// //             ? "bg-blue-100 border border-blue-600"
// //             : "border border-gray-300"
// //         }`}
// //       >
// //         <input
// //           type="checkbox"
// //           name="receivesBenefits"
// //           checked={data.receivesBenefits === (option === "Yes")}
// //           onChange={() =>
// //             handleRadioChange("receivesBenefits", option === "Yes")
// //           }
         
// //         />
// //         {option}
// //       </label>
// //     ))}
// //   </div>
// // </div>






// //       {/* Annual Income */}
// //       <div className="relative mt-4 w-full">
// //         <label htmlFor="annualIncome" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
// //             What’s your annual income from this job?*
// //             <span className="font-light text-[13px]">(Please include all bonuses, overtime and commissions.)</span>
// //         </label>
// //         <div className="relative mt-2">
// //             <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
// //             <input id="annualIncome" name="annualIncome" type="number" value={data.annualIncome || ''} onChange={handleChange} className="w-full border rounded-full pl-8 text-[#111827] border-gray-300 px-4 py-2" placeholder="e.g. 50000" required />
// //         </div>
// //       </div>
      

      
// //           <div className="grid mt-4 grid-cols-1 gap-1">
// //             <label className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
// //               How long have you worked in this industry?
// //             </label>
// //             <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 ">
// //               <input
// //                 id="years"
// //                 name="years"
// //                 type="number"
// //                 value={data.industryExperienceYears}
// //                 onChange={handleChange}
// //                 className="w-full border rounded-full text-[#111827] text-end font-semibold border-gray-300 px-4 py-2"
// //                 placeholder="Yr"
// //                 required
// //               />
// //               <input
// //                 id="months"
// //                 name="months"
// //                 type="number"
// //                 value={data.industryExperienceMonths}
// //                 onChange={handleChange}
// //                 className="w-full border rounded-full text-[#111827] font-semibold text-end  border-gray-300 px-4 py-2"
// //                 placeholder="mo"
// //                 required
// //               />
// //             </div>
// //           </div>


// //       {/* Start Date */}
// //        <div className="relative mt-4 w-full">
// //         <label htmlFor="employmentStartDate" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
// //           When did you start working here?*
// //           <span className="font-light text-[13px]">(If you are not sure, just estimate)</span>
// //         </label>
// //         <input id="employmentStartDate" name="employmentStartDate" type="date" value={data.employmentStartDate || ''} onChange={handleChange} className="w-full border rounded-full text-[#111827] border-gray-300 px-4 py-2" required />
// //       </div>

// //       {/* End Date (Conditional) */}
// //       {data.isCurrentEmployment === false && (
// //         <div className="relative mt-4 w-full">
// //           <label htmlFor="employmentEndDate" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
// //             When did you stop working here?*
// //             <span className="font-light text-[13px]">(If you are not sure, just estimate)</span>
// //           </label>
// //           <input id="employmentEndDate" name="employmentEndDate" type="date" value={data.employmentEndDate || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
// //         </div>
// //       )}
// //     </>
// //   );
// // };

// // export default EmployedForm;