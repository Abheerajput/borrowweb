import { FaDollarSign } from "react-icons/fa";

export default function RenewFields() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* Renewal Date */}
      <div className="w-full">
        <label className="block text-[#111827] text-[18px] mb-2 font-semibold">
          What is your renewal date?
        </label>
        <input
          type="date"
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
          placeholder="2025-07-26"
        />
      </div>

      {/* Property Value */}
      <div className="relative w-full">
        <label className="block text-[#111827] text-[18px] mb-2 font-semibold">
          What's the value of your property?
        </label>
        <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
        <input
          type="number"
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
          placeholder="e.g 540,000.00"
        />
      </div>

      {/* Mortgage Balance */}
      <div className="relative w-full">
        <label className="block text-[#111827] text-[18px] mb-2 font-semibold">
          What's your mortgage balance?
        </label>
        <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
        <input
          type="number"
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
          placeholder="e.g 540,000.00"
        />
      </div>
    </div>
  );
}
