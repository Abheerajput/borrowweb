"use client";

import { FaDollarSign } from "react-icons/fa";

type FoundPropertyProps = {
  hasFoundProperty: boolean | null;
  setHasFoundProperty: (value: boolean) => void;
  firstTimeBuyer: boolean | null;
  setFirstTimeBuyer: (value: boolean) => void;
  purchasePrice: string;
  setPurchasePrice: (value: string) => void;
};

export default function FoundProperty({
  hasFoundProperty,
  setHasFoundProperty,
  firstTimeBuyer,
  setFirstTimeBuyer,
  purchasePrice,
  setPurchasePrice,
}: FoundPropertyProps) {
  return (
    <div>
      {/* Question 1 */}
      <label className="block font-semibold text-[#111827] text-[18px] mb-2">
        Have you already found a property?*
      </label>
      <div className="flex xs:flex-wrap gap-4 py-3">
        {/* Yes Option */}
        <label
          className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
            hasFoundProperty === true
              ? "border-blue-600 bg-blue-50 font-semibold"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="radio"
            name="hasFoundProperty"
            value="yes"
            className="hidden"
            checked={hasFoundProperty === true}
            onChange={() => setHasFoundProperty(true)}
          />
          Yes, I’ve found a property
        </label>

        {/* No Option */}
        <label
          className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
            hasFoundProperty === false
              ? "border-blue-600 bg-blue-50 font-semibold"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input
            type="radio"
            name="hasFoundProperty"
            value="no"
            className="hidden"
            checked={hasFoundProperty === false}
            onChange={() => setHasFoundProperty(false)}
          />
          No, I’m still looking
        </label>
      </div>

      {/* Conditional Section for YES */}
      {hasFoundProperty === true && (
        <>
          <hr className="text-black my-4" />

          {/* First-time buyer */}
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">
            Great! Is this the first property you've purchased?*
          </label>
          <div className="flex gap-4 py-2">
            <label
              className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
                firstTimeBuyer === true
                  ? "border-blue-600 bg-blue-50 font-semibold"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <input
                type="radio"
                name="firstTimeBuyer"
                value="yes"
                className="hidden"
                checked={firstTimeBuyer === true}
                onChange={() => setFirstTimeBuyer(true)}
              />
              Yes
            </label>

            <label
              className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
                firstTimeBuyer === false
                  ? "border-blue-600 bg-blue-50 font-semibold"
                  : "border-gray-300 hover:border-blue-400"
              }`}
            >
              <input
                type="radio"
                name="firstTimeBuyer"
                value="no"
                className="hidden"
                checked={firstTimeBuyer === false}
                onChange={() => setFirstTimeBuyer(false)}
              />
              No
            </label>
          </div>

          {/* Purchase Price */}
          <div className="mt-4">
            <label className="block font-semibold text-[#111827] text-[18px] mb-2">
              What's the purchase price?
            </label>
            <div className="relative">
              <FaDollarSign className="absolute top-[21.5px] left-[8px]" />
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
                placeholder="e.g 540,000.00"
              />
            </div>
          </div>
        </>
      )}

      {/* Conditional Section for NO */}
      {hasFoundProperty === false && (
        <>
          <hr className="text-black my-4" />
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">
            What's the purchase price you're considering?
          </label>
          <div className="relative">
            <FaDollarSign className="absolute top-[22px] left-[12px] text-gray-500" />
            <input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
              placeholder="e.g 540,000.00"
            />
          </div>
        </>
      )}
    </div>
  );
}
