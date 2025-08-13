// src/app/dashboard/application/step4/EmployedForm.tsx

import React from "react";
import { IFormData } from "../step4/step4/page"; // Import the shared interface
import { FaDollarSign } from "react-icons/fa";
import { PiCompassRoseFill } from "react-icons/pi";

interface EmployedFormProps {
  data: Partial<IFormData>;
  onDataChange: (updatedData: Partial<IFormData>) => void;
}

const EmployedForm: React.FC<EmployedFormProps> = ({ data, onDataChange }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onDataChange({ [e.target.name]: e.target.value });
  };

  const handleRadioChange = (name: keyof IFormData, value: boolean | string) => {
    onDataChange({ [name]: value });
  };
   
  
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mt-6">Employment Details</h3>
      <hr className="text-gray-700 my-4" />

      {/* Is this your current employment? */}
      <div className="mb-4">
        <label className="block mb-1 text-lg font-semibold text-gray-900">
          Is this your current employment?
        </label>
        <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="isCurrentEmployment" checked={data.isCurrentEmployment === true} onChange={() => handleRadioChange("isCurrentEmployment", true)} className="accent-blue-600 w-[15px] h-[15px]" />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="isCurrentEmployment" checked={data.isCurrentEmployment === false} onChange={() => handleRadioChange("isCurrentEmployment", false)} className="accent-blue-600 w-[15px] h-[15px]" />
            No
          </label>
        </div>
      </div>
      
      {/* Company Name */}
      <div className="mb-4">
        <label htmlFor="companyName" className="block font-semibold text-[#111827] text-[18px] mb-2">Company name</label>
        <input id="companyName" name="companyName" type="text" placeholder="What's the company name?" value={data.companyName || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" required />
      </div>

      {/* ... other fields like Company Address, Job Title, Work Frequency, Bonuses, Benefits ... */}
      {/* You can copy the exact JSX from your original file here */}
     <div className="mb-4">
            <label
              htmlFor="companyAddress"
              className="flex gap-1 items-center font-semibold text-[#111827] text-[18px] min-w-full mb-2"
            >
              What’s the Company address?
              <div className="max-w-[30px] min-w-[30px] flex justify-center items-center min-h-[30px] bg-[#EBF4FF] rounded-full text-sm">
                i
              </div>
            </label>
            <div className="relative">
              <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                id="companyAddress"
                name="companyAddress"
                type="text"
                value={data.companyAddress}
                onChange={handleChange}
                className="w-full border rounded-full pl-9 text-black border-gray-300 px-4 py-2"
                placeholder="Start typing the address"
              />
            </div>
             <span className="flex text-[16px] text-black font-normal justify-between my-4">
               <p>Can’t find the address</p>
               <p className="text-[#013E8C]  border-b-2 border-b-[#013E8C] font-semibold cursor-pointer">
                 Typing Manually?
               </p>
             </span>
           </div>




          <div className="mb-4">
            <label
              htmlFor="jobTitle"
              className="block font-semibold text-[#111827] text-[18px] mb-2"
            >
              Job Title
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              value={data.jobTitle}
              onChange={handleChange}
              className="w-full border rounded-full text-black  border-gray-300  px-4 py-2"
            />
          </div>







          <div className="mt-6">
            <label className="block font-semibold text-[#111827] text-[18px] mb-2">
              How often do you work?
            </label>
            <div className="flex gap-4 text-[#111827]">
              {(["Full Time", "Part Time", "Seasonal"] as const).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="workType"
                    checked={data.workType === type}
                    onChange={() => handleRadioChange("workType", type)}
                    className="accent-blue-600 w-[15px] h-[15px]"
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
            <div className="flex gap-6 text-[#111827]">
              {["Yes", "No"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="receivesBonus"
                    checked={data.receivesBonus === (option === "Yes")}
                    onChange={() =>
                      handleRadioChange("receivesBonus", option === "Yes")
                    }
                    className="accent-blue-600 w-[15px] h-[15px]"
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
            <div className="flex gap-6 text-[#111827]">
              {["Yes", "No"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="receivesBenefits"
                    checked={data.receivesBenefits === (option === "Yes")}
                    onChange={() =>
                      handleRadioChange("receivesBenefits", option === "Yes")
                    }
                    className="accent-blue-600 w-[15px] h-[15px]"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
























      {/* Annual Income */}
      <div className="relative mt-4 w-full">
        <label htmlFor="annualIncome" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
            What’s your annual income from this job?*
            <span className="font-light text-[13px]">(Please include all bonuses, overtime and commissions.)</span>
        </label>
        <div className="relative mt-2">
            <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
            <input id="annualIncome" name="annualIncome" type="number" value={data.annualIncome || ''} onChange={handleChange} className="w-full border rounded-full pl-8 text-[#111827] border-gray-300 px-4 py-2" placeholder="e.g. 50000" required />
        </div>
      </div>
      

      
          <div className="grid mt-4 grid-cols-1 gap-1">
            <label className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
              How long have you worked in this industry?
            </label>
            <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 ">
              <input
                id="years"
                name="years"
                type="number"
                value={data.industryExperienceYears}
                onChange={handleChange}
                className="w-full border rounded-full text-[#111827] text-end font-semibold border-gray-300 px-4 py-2"
                placeholder="Yr"
                required
              />
              <input
                id="months"
                name="months"
                type="number"
                value={data.industryExperienceMonths}
                onChange={handleChange}
                className="w-full border rounded-full text-[#111827] font-semibold text-end  border-gray-300 px-4 py-2"
                placeholder="mo"
                required
              />
            </div>
          </div>


      {/* Start Date */}
       <div className="relative mt-4 w-full">
        <label htmlFor="employmentStartDate" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
          When did you start working here?*
          <span className="font-light text-[13px]">(If you are not sure, just estimate)</span>
        </label>
        <input id="employmentStartDate" name="employmentStartDate" type="date" value={data.employmentStartDate || ''} onChange={handleChange} className="w-full border rounded-full text-[#111827] border-gray-300 px-4 py-2" required />
      </div>

      {/* End Date (Conditional) */}
      {data.isCurrentEmployment === false && (
        <div className="relative mt-4 w-full">
          <label htmlFor="employmentEndDate" className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2">
            When did you stop working here?*
            <span className="font-light text-[13px]">(If you are not sure, just estimate)</span>
          </label>
          <input id="employmentEndDate" name="employmentEndDate" type="date" value={data.employmentEndDate || ''} onChange={handleChange} className="w-full border rounded-full border-gray-300 px-4 py-2" required />
        </div>
      )}
    </>
  );
};

export default EmployedForm;