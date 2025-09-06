"use client";

import { Dispatch, SetStateAction } from "react";

type RealtorDetailsProps = {
  hasRealtor: boolean | null;
  setHasRealtor: Dispatch<SetStateAction<boolean | null>>;
  referredByRealtor: boolean | null;
  setReferredByRealtor: Dispatch<SetStateAction<boolean | null>>;
  realtorInfo: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
  };
  setRealtorInfo: Dispatch<
    SetStateAction<{
      firstName: string;
      lastName: string;
      company: string;
      email: string;
      phone: string;
    }>
  >;
};

export default function RealtorDetails({
  hasRealtor,
  setHasRealtor,
  referredByRealtor,
  setReferredByRealtor,
  realtorInfo,
  setRealtorInfo,
}: RealtorDetailsProps) {
  return (
    <div className="">
      {/* Question 1 */}
      <div>
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          Do you have a realtor?
        </label>
       <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
  {["Yes", "No"].map((option) => (
    <label
      key={option}
      className={`flex items-center cursor-pointer px-3 py-1 rounded-full ${
        (hasRealtor === true && option === "Yes") ||
        (hasRealtor === false && option === "No")
          ? "bg-blue-100 border border-blue-600"
          : "border border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="hasRealtor"
        className="hidden"
        checked={
          (hasRealtor === true && option === "Yes") ||
          (hasRealtor === false && option === "No")
        }
        onChange={() => {
          setHasRealtor(option === "Yes");
          setReferredByRealtor(null); // reset next step
        }}
      />
      {option}
    </label>
  ))}
</div>

      </div>

      {/* Question 2 */}
      {hasRealtor && (
        <div className="mt-4">
          <label className="block font-semibold text-[18px] mb-2">
            Did your realtor refer you to us?
          </label>
         <div className="flex gap-6 text-[16px] text-[#111827] font-medium">
  {["Yes", "No"].map((option) => (
    <label
      key={option}
      className={`flex items-center cursor-pointer px-3 py-1 rounded-full ${
        (referredByRealtor === true && option === "Yes") ||
        (referredByRealtor === false && option === "No")
          ? "bg-blue-100 border border-blue-600"
          : "border border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="referredByRealtor"
        className="hidden"
        checked={
          (referredByRealtor === true && option === "Yes") ||
          (referredByRealtor === false && option === "No")
        }
        onChange={() => setReferredByRealtor(option === "Yes")}
      />
      {option}
    </label>
  ))}
</div>

        </div>
      )}

      {/* Realtor Information */}
      {hasRealtor && referredByRealtor === true && (
        <div className="mt-6 space-y-4">
          <label className="block font-semibold text-[18px] mb-2">
            Who is your realtor?
          </label>

          <div className="flex gap-2 justify-between">
            <div className="w-1/2">
              <label className="text-[16px] font-medium">Realtor's first name</label>
              <input
                type="text"
                value={realtorInfo.firstName}
                onChange={(e) =>
                  setRealtorInfo({ ...realtorInfo, firstName: e.target.value })
                }
                className="w-full border rounded-full mt-1 px-4 py-2 border-gray-300"
                placeholder="Realtor’s first name"
              />
            </div>
            <div className="w-1/2">
              <label className="text-[16px] font-medium">Realtor's last name</label>
              <input
                type="text"
                value={realtorInfo.lastName}
                onChange={(e) =>
                  setRealtorInfo({ ...realtorInfo, lastName: e.target.value })
                }
                className="w-full border rounded-full mt-1 px-4 py-2 border-gray-300"
                placeholder="Realtor’s last name"
              />
            </div>
          </div>

          <div>
            <label className="text-[16px] font-medium">Realtor's company name</label>
            <input
              type="text"
              value={realtorInfo.company}
              onChange={(e) =>
                setRealtorInfo({ ...realtorInfo, company: e.target.value })
              }
              className="w-full border rounded-full mt-1 px-4 py-2 border-gray-300"
              placeholder="Realtor’s company name"
            />
          </div>

          <div className="flex gap-2 justify-between">
            <div className="w-1/2">
              <label className="text-[16px] font-medium">Realtor's email</label>
              <input
                type="email"
                value={realtorInfo.email}
                onChange={(e) =>
                  setRealtorInfo({ ...realtorInfo, email: e.target.value })
                }
                className="w-full border rounded-full mt-1 px-4 py-2 border-gray-300"
                placeholder="Realtor’s email"
              />
            </div>
            <div className="w-1/2">
              <label className="text-[16px] font-medium">Realtor's phone number</label>
              <input
                type="tel"
                value={realtorInfo.phone}
                onChange={(e) =>
                  setRealtorInfo({ ...realtorInfo, phone: e.target.value })
                }
                className="w-full border rounded-full mt-1 px-4 py-2 border-gray-300"
                placeholder="Realtor’s phone number"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
