"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoMdArrowRoundBack } from "react-icons/io";
import BorrowerDetails from "../borrow/page";
import { usePathname } from "next/navigation";
const totalSteps = 7;
const BorrowersPage = () => {
  const [borrowers, setBorrowers] = useState<string[]>([
    "Borrower 1",
    "Borrower 2",
    "Borrower 3",
  ]);
  const [activeBorrower, setActiveBorrower] = useState<string | null>(null);
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
  const addBorrower = () => {
    setBorrowers((prev) => [...prev, `Borrower ${prev.length + 1}`]);
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (activeBorrower) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <BorrowerDetails
          borrowerName={activeBorrower}
          onBack={() => setActiveBorrower(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-full flex flex-col ">
      <div className="flex justify-between">
        <span className="flex gap-2 ">
          <span className="flex justify-center text-black gap-2 items-center">
            <Link href="/dashboard/application/step1">
              <IoMdArrowRoundBack />
            </Link>
            Borrowers
          </span>
        </span>

        {isClient && (
          <span className="flex items-center gap-2">
            {/* Dots */}
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-5 rounded-full ${
                    index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>

            {/* Text */}
            <h1 className="text-sm  text-black font-medium">
              {currentStep} of {totalSteps}
            </h1>
          </span>
        )}
      </div>

      <div className=" flex min-h-screen  xs:mt-[-25%] justify-center items-center">
        <div className="bg-white rounded-xl shadow-md  w-[768px] p-6">
          <h2 className="text-[20px] font-semibold text-gray-900 mb-6 border-b-2 border-[#013E8C] inline-block">
            Tell us about the borrowers
          </h2>

          <div className="space-y-4">
            {borrowers.map((borrower, index) => (
              <div
                key={index}
                onClick={() => setActiveBorrower(borrower)}
                className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-[11.5px] text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                {borrower}
                <IoIosArrowForward className="text-gray-400" />
              </div>
            ))}
          </div>

          <button
            onClick={addBorrower}
            className="text-[#013E8C] text-sm font-semibold mt-4 hover:underline"
          >
            + Add Another Borrower
          </button>

          <div className="flex justify-between items-center mt-8 gap-6">
            <Link href="/dashboard/application/step1" className="w-1/2">
              <button className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors">
                Back
              </button>
            </Link>

            <Link href="/dashboard/application/step3" className="w-1/2">
              <button
              className="bg-[#013E8C] w-full text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
>                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowersPage;
