import { FaDollarSign } from "react-icons/fa";

export default function RefinanceFields() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {["What's the value of your property?", "What's your mortgage balance?"].map((label, idx) => (
        <div key={idx} className="relative w-full">
          <label className="block text-[#111827] text-[18px] mb-2 font-semibold">{label}</label>
          <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
          <input
            type="number"
            className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
            placeholder="e.g 540,000.00"
          />
        </div>
      ))}
    </div>
  );
}
