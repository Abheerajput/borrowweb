// src/app/dashboard/application/step4/OtherIncomeForm.tsx

import React from "react";
import { IFormData } from "../step4/page"; // Adjust path if necessary
import { FaDollarSign } from "react-icons/fa";

interface OtherIncomeFormProps {
  data: Partial<IFormData>;
  onDataChange: (updatedData: Partial<IFormData>) => void;
}

const OtherIncomeForm: React.FC<OtherIncomeFormProps> = ({ data, onDataChange }) => {
  // Generic handler for standard inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ [e.target.name]: e.target.value });
  };
  
  // Custom handler for radio buttons
  const handleFieldChange = (fieldName: keyof IFormData, value: any) => {
    onDataChange({ [fieldName]: value });
  };

  const incomeOptions = [
    "Canadian Pension Plan(CPP)",
    "Old Age Security",
    "Survivor Benefit Pension",
    "Other",
  ] as const;
  
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mt-6">Other Income</h3>
      <hr className="text-gray-700 my-4" />

      {/* What type of income do you have? */}
      <div className="p-4 border rounded-lg">
        <label className="block font-semibold text-[#111827] text-lg mb-3">
          What type of income do you have?*
        </label>
        <div className="space-y-2">
          {incomeOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="otherIncomeType"
                value={option}
                checked={data.otherIncomeType === option}
                onChange={() => handleFieldChange("otherIncomeType", option)}
                className="accent-blue-600 w-5 h-5"
              />
              <span className="text-base text-gray-800">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Please name the type of income (Conditional) */}
      {data.otherIncomeType === "Other" && (
        <div className="mt-6">
          <label htmlFor="otherIncomeName" className="block font-semibold text-[#111827] text-lg mb-2">
            Please name the type of income
          </label>
          <input
            id="otherIncomeName"
            name="otherIncomeName"
            type="text"
            value={data.otherIncomeName || ''}
            onChange={handleChange}
            placeholder="Type of income"
            className="w-full border rounded-full border-gray-300 px-4 py-3"
            required
          />
        </div>
      )}

      {/* What's your annual income from this source? */}
      <div className="relative mt-6 w-full">
        <label htmlFor="otherAnnualIncome" className="block font-semibold text-[#111827] text-lg mb-2">
          What’s your annual income from this source?*
        </label>
        <div className="relative mt-1">
            <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              id="otherAnnualIncome"
              name="otherAnnualIncome"
              type="number"
              value={data.otherAnnualIncome || ''}
              onChange={handleChange}
              className="w-full border rounded-full pl-10 pr-4 py-3 border-gray-300"
              placeholder="e.g. 80,000"
              required
            />
        </div>
      </div>

      {/* When did you start receive it? */}
      <div className="relative mt-6 w-full">
        <label htmlFor="otherIncomeStartDate" className="flex flex-col font-semibold text-[#111827] text-lg mb-2">
          When did you start receive it?
          <span className="font-normal text-sm text-gray-500">(If you are not sure, just estimate)</span>
        </label>
        <input
          id="otherIncomeStartDate"
          name="otherIncomeStartDate"
          type="date"
          value={data.otherIncomeStartDate || ''}
          onChange={handleChange}
          className="w-full border rounded-full border-gray-300 px-4 py-3"
          required
        />
      </div>
    </>
  );
};

export default OtherIncomeForm;