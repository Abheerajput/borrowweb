"use client";

import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";

type LookingToDoProps = {
  selected: string;
  setSelected: (value: string) => void;
  formData: {
    propertyValue: string;
    mortgageBalance: string;
    renewalDate: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      propertyValue: string;
      mortgageBalance: string;
      renewalDate: string;
    }>
  >;
  enabledFields: {
    propertyValue: boolean;
    mortgageBalance: boolean;
    renewalDate: boolean;
  };
  setEnabledFields: React.Dispatch<
    React.SetStateAction<{
      propertyValue: boolean;
      mortgageBalance: boolean;
      renewalDate: boolean;
    }>
  >;
};


export default function LookingToDo({ selected, setSelected }: LookingToDoProps) {
  const [formData, setFormData] = useState({
    propertyValue: "",
    mortgageBalance: "",
    renewalDate: "",
  });

  const [enabledFields, setEnabledFields] = useState({
    propertyValue: false,
    mortgageBalance: false,
    renewalDate: false,
  });

  const options = [
    { value: "Buy a Property", label: "Buy a Property" },
    { value: "Refinance a Property", label: "Refinance a Property" },
    { value: "Renew a Mortgage", label: "Renew a Mortgage" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleField = (field: keyof typeof enabledFields) => {
    setEnabledFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      <label className="block font-semibold text-[#111827] text-[18px] mb-2">
        What are you looking to do?*
      </label>

      {/* Main Selection */}
      <div className="flex items-center xs:flex-wrap justify-between py-2 gap-4">
        {options.map((item) => (
           <label
      key={item.value}
      className={`flex text-[16px] items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition
        ${
          selected === item.value
            ? "border border-blue-600 bg-blue-50 font-semibold"
            : " border-gray-300 hover:border-blue-400 font-normal"
        }`}
    >
            <input
              type="radio"
              name="purpose"
              value={item.value}
              checked={selected === item.value}
              onChange={() => setSelected(item.value)}
              
            />
            {item.label}
          </label>
        ))}
      </div>

      <hr className="text-black mt-2" />

      {/* Refinance Fields */}
      {selected === "refinance" && (
        <div className="flex flex-col gap-4 mt-4">
          {/* Property Value */}
          <div className="relative w-full">
            <label className="flex items-center gap-2 text-[#111827] text-[18px] mb-2 font-semibold">
              <input
                type="checkbox"
                checked={enabledFields.propertyValue}
                onChange={() => toggleField("propertyValue")}
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              What's the value of your property?
            </label>
            <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
            <input
              type="number"
              value={formData.propertyValue}
              onChange={(e) => handleInputChange("propertyValue", e.target.value)}
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2 disabled:bg-gray-100"
              placeholder="e.g 540,000.00"
              disabled={!enabledFields.propertyValue}
            />
          </div>

          {/* Mortgage Balance */}
          <div className="relative w-full">
            <label className="flex items-center gap-2 text-[#111827] text-[18px] mb-2 font-semibold">
              <input
                type="checkbox"
                checked={enabledFields.mortgageBalance}
                onChange={() => toggleField("mortgageBalance")}
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              What's your mortgage balance?
            </label>
            <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
            <input
              type="number"
              value={formData.mortgageBalance}
              onChange={(e) => handleInputChange("mortgageBalance", e.target.value)}
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2 disabled:bg-gray-100"
              placeholder="e.g 540,000.00"
              disabled={!enabledFields.mortgageBalance}
            />
          </div>
        </div>
      )}

      {/* Renew Fields */}
      {selected === "renew" && (
        <div className="flex flex-col gap-4 mt-4">
          {/* Renewal Date */}
          <div className="w-full">
            <label className="flex items-center gap-2 text-[#111827] text-[18px] mb-2 font-semibold">
              <input
                type="checkbox"
                checked={enabledFields.renewalDate}
                onChange={() => toggleField("renewalDate")}
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              What is your renewal date?
            </label>
            <input
              type="date"
              value={formData.renewalDate}
              onChange={(e) => handleInputChange("renewalDate", e.target.value)}
              className="w-full border rounded-full border-gray-300 mt-2 px-4 py-2 disabled:bg-gray-100"
              disabled={!enabledFields.renewalDate}
            />
          </div>

          {/* Property Value */}
          <div className="relative w-full">
            <label className="flex items-center gap-2 text-[#111827] text-[18px] mb-2 font-semibold">
              <input
                type="checkbox"
                checked={enabledFields.propertyValue}
                onChange={() => toggleField("propertyValue")}
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              What's the value of your property?
            </label>
            <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
            <input
              type="number"
              value={formData.propertyValue}
              onChange={(e) => handleInputChange("propertyValue", e.target.value)}
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2 disabled:bg-gray-100"
              placeholder="e.g 540,000.00"
              disabled={!enabledFields.propertyValue}
            />
          </div>

          {/* Mortgage Balance */}
          <div className="relative w-full">
            <label className="flex items-center gap-2 text-[#111827] text-[18px] mb-2 font-semibold">
              <input
                type="checkbox"
                checked={enabledFields.mortgageBalance}
                onChange={() => toggleField("mortgageBalance")}
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              What's your mortgage balance?
            </label>
            <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
            <input
              type="number"
              value={formData.mortgageBalance}
              onChange={(e) => handleInputChange("mortgageBalance", e.target.value)}
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2 disabled:bg-gray-100"
              placeholder="e.g 540,000.00"
              disabled={!enabledFields.mortgageBalance}
            />
          </div>
        </div>
      )}
    </div>
  );
}
