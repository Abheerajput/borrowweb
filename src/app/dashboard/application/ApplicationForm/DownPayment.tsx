"use client";

import { useState } from "react";
import { FaDollarSign } from "react-icons/fa";
import { PiCompassRoseFill } from "react-icons/pi";

type DownPaymentProps = {
  downPayment1: string;
  setDownPayment1: (value: string) => void;
  downPayment2: string;
  setDownPayment2: (value: string) => void;
  closingDate: string;
  setClosingDate: (value: string) => void;
  selectedUsage: string;
  setSelectedUsage: (value: string) => void;
  propertyAddress: string;
  setPropertyAddress: (value: string) => void;
  manualAddress: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  setManualAddress: (value: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  }) => void;
};

export default function DownPayment({
  downPayment1,
  setDownPayment1,
  downPayment2,
  setDownPayment2,
  closingDate,
  setClosingDate,
  selectedUsage,
  setSelectedUsage,
  propertyAddress,
  setPropertyAddress,
  manualAddress,
  setManualAddress,
}: DownPaymentProps) {
  const [isManualAddress, setIsManualAddress] = useState(false);

  return (
    <div>
      {/* Down Payment */}
      <div>
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          How much down payment do you have?
        </label>
        <div className="flex xs:flex-col gap-1 justify-between">
          <div className="relative min-w-[49%] xs:min-w-[100%] max-w-[50%]">
            <FaDollarSign className="absolute top-[21.5px] left-[8px]" />
            <input
              type="number"
              value={downPayment1}
              onChange={(e) => setDownPayment1(e.target.value)}
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
              placeholder="e.g 540,000.00 "
            />
          </div>
          <div className="relative xs:min-w-[100%] min-w-[49%] max-w-[50%]">
            <FaDollarSign className="absolute top-[21.5px] left-[8px]" />
            <input
              type="number"
              value={downPayment2}
              onChange={(e) => setDownPayment2(e.target.value)}
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
              placeholder="e.g 540,000.00"
            />
          </div>
        </div>
      </div>

      {/* Closing Date */}
      <div className="mt-4">
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          When's the closing date?
        </label>
        <input
          type="date"
          value={closingDate}
          onChange={(e) => setClosingDate(e.target.value)}
          className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
        />
      </div>

      <hr className="text-black my-4" />

      {/* Property Usage */}
      <div>
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          How is this Property used?
        </label>
        <div className="flex xs:flex-wrap gap-12 xs:gap-2 py-2">
          <label
            className={`flex text-[16px] text-[#111827] items-center gap-2 ${
              selectedUsage === "live" ? "font-semibold" : "font-normal"
            }`}
          >
            <input
              type="checkbox"
              value="live"
              checked={selectedUsage === "live"}
              onChange={() => setSelectedUsage("live")}
              className="accent-blue-600 w-[15px] h-[15px]"
            />
            I’m going to live in it
          </label>
          <label
            className={`flex text-[16px] text-[#111827] items-center gap-2 ${
              selectedUsage === "liveRent" ? "font-semibold" : "font-normal"
            }`}
          >
            <input
              type="checkbox"
              value="liveRent"
              checked={selectedUsage === "liveRent"}
              onChange={() => setSelectedUsage("liveRent")}
              className="accent-blue-600 w-[15px] h-[15px]"
            />
            I will live in it and also rent out some of it
          </label>
        </div>

        <div className="flex xs:flex-wrap xs:gap-2 gap-12 py-2">
          <label
            className={`flex text-[16px] text-[#111827] items-center gap-2 ${
              selectedUsage === "rent" ? "font-semibold" : "font-normal"
            }`}
          >
            <input
              type="checkbox"
              value="rent"
              checked={selectedUsage === "rent"}
              onChange={() => setSelectedUsage("rent")}
              className="accent-blue-600 w-[15px] h-[15px]"
            />
            I will rent it out exclusively
          </label>
          <label
            className={`flex text-[16px] text-[#111827] items-center gap-2 ${
              selectedUsage === "secondHome" ? "font-semibold" : "font-normal"
            }`}
          >
            <input
              type="checkbox"
              value="secondHome"
              checked={selectedUsage === "secondHome"}
              onChange={() => setSelectedUsage("secondHome")}
              className="accent-blue-600 w-[15px] h-[15px]"
            />
            It’s going to be my second home
          </label>
        </div>
      </div>

      <hr className="text-black my-8" />

      {/* Property Address */}
      <div>
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          What’s the property address?
        </label>

        {!isManualAddress ? (
          <>
            <div className="relative">
              <PiCompassRoseFill className="absolute top-[22px] left-[11px]" />
              <input
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                className="w-full border rounded-full pl-8 text-black border-gray-300 mt-2 px-4 py-2"
                placeholder="Start typing the address"
              />
            </div>
            <span className="flex xs:flex-col text-[16px] text-black font-normal justify-between my-4">
              <p>Can’t find the address</p>
              <button
                type="button"
                onClick={() => setIsManualAddress(true)}
                className="text-[#013E8C] xs:mt-2 xs:border-0 border-b-2 border-b-[#013E8C] font-semibold"
              >
                Typing Manually?
              </button>
            </span>
          </>
        ) : (
          <div className="space-y-3 mt-4">
            <input
              type="text"
              value={manualAddress.street}
              onChange={(e) =>
                setManualAddress({ ...manualAddress, street: e.target.value })
              }
              className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
              placeholder="Street Address"
            />
            <input
              type="text"
              value={manualAddress.city}
              onChange={(e) =>
                setManualAddress({ ...manualAddress, city: e.target.value })
              }
              className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
              placeholder="City"
            />
            <input
              type="text"
              value={manualAddress.province}
              onChange={(e) =>
                setManualAddress({ ...manualAddress, province: e.target.value })
              }
              className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
              placeholder="Province"
            />
            <input
              type="text"
              value={manualAddress.postalCode}
              onChange={(e) =>
                setManualAddress({
                  ...manualAddress,
                  postalCode: e.target.value,
                })
              }
              className="w-full border rounded-full px-4 py-2 text-black border-gray-300"
              placeholder="Postal Code"
            />
            <button
              type="button"
              onClick={() => setIsManualAddress(false)}
              className="text-sm text-gray-600 underline"
            >
              Back to Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
