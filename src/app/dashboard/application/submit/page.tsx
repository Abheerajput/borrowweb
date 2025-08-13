"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, ReactNode, useEffect } from "react";
import { FiUser, FiChevronDown, FiEdit2, FiGift } from "react-icons/fi";
import { IoMdArrowRoundBack } from "react-icons/io";
const totalSteps = 7;

// Edit Button Component
const EditButton = () => (
  <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium text-sm">
    <FiEdit2 size={16} />
    <span>Edit</span>
  </button>
);

// Accordion Section Component
interface AccordionSectionProps {
  number: number;
  title: string;
  children: ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ number, title, children }) => {
  const [isOpen, setIsOpen] = useState(true); // All sections are open by default as in the image

  return (
    <div className="border border-gray-200 rounded-lg">
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-md font-semibold text-gray-800">{`${number}. ${title}`}</h2>
        <FiChevronDown
          className={`transform transition-transform text-gray-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="px-4 pb-4">
          <div className="border-t border-gray-200 pt-4">{children}</div>
        </div>
      )}
    </div>
  );
};


// --- Main Page Component ---

const AddReferralPage = () => {
    const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="bg-gray-50 min-h-screen w-full flex-col flex justify-center py-10">
        <div className="flex justify-between">
        <span className="flex gap-2 ">
          <span className="flex justify-center gap-2 items-center">
            <Link href="/dashboard/application/step7">
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
            <h1 className="text-sm font-medium">
              {currentStep} of {totalSteps}
            </h1>
          </span>
        )}
      </div>
            <div className="min-w-full flex justify-center">
 <div className="max-w-2xl w-full bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl  text-black  font-semibold ">Add Referral</h1>
          <div className="w-20 h-1 bg-blue-700 mt-2 rounded"></div>
        </div>

        {/* --- Sections --- */}
        <div className="space-y-4">
          {/* 1. Getting Started */}
          <AccordionSection number={1} title="Getting Started">
            <p className="text-gray-600">You are looking to buy a property</p>
            <p className="mt-2 text-gray-600">
              Purchased Price: <span className="font-bold text-gray-800">$40,000</span>
            </p>
          </AccordionSection>

          {/* 2. Borrowers */}
          <AccordionSection number={2} title="Borrowers">
            <div className="space-y-5">
              {/* Jane Cooper */}
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-800" size={18} />
                  </span>
                  <div>
                    <p className=" text-black  font-semibold ">Jane Cooper</p>
                    <p className="text-sm text-gray-500">Cell Number : <span className="font-mediumtext-black">(123) 489-7895</span></p>
                    <p className="text-sm text-gray-500">Home Number : <span className="  text-black  font-semibold ">(909) 978-7458</span></p>
                  </div>
                </div>
                <EditButton />
              </div>
              {/* Darlene Robertson */}
              <div className="flex justify-between items-start pt-5 border-t border-gray-200">
                <div className="flex items-start gap-3">
                   <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-800" size={18} />
                  </span>
                  <div>
                    <p className="  text-black  font-semibold ">Darlene Robertson</p>
                    <p className="text-sm text-gray-500">Cell Number : <span className=" text-black  font-semibold ">(123) 489-7895</span></p>
                    <p className="text-sm text-gray-500">Home Number : <span className=" text-black  font-semibold ">(909) 978-7458</span></p>
                    <p className="text-sm text-gray-500">Email : <span className=" text-black  font-semibold ">darlenerobertson@gmail.com</span></p>
                  </div>
                </div>
                <EditButton />
              </div>
            </div>
          </AccordionSection>

          {/* 3. Income */}
          <AccordionSection number={3} title="Income">
             <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-800" size={18} />
                  </span>
                  <div>
                    <p className="  text-black  font-semibold ">Jane Cooper</p>
                    <p className="  text-black  font-semibold ">Apple Inc</p>
                    <p className="text-sm text-gray-500">UI & UX Designer</p>
                    <p className="text-sm text-gray-500 mt-2">Annual Income</p>
                  </div>
                </div>
                <div className="text-right">
                  <EditButton />
                  <p className="text-xs text-gray-500 mt-4">Apr 4, 2020 - Present</p>
                  <p className="font-bold text-lg text-gray-800 mt-1">$80,000</p>
                </div>
              </div>
          </AccordionSection>

          {/* 5. Assets */}
          <AccordionSection number={5} title="Assets">
            <div className="space-y-5">
              {/* First Asset Group */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                     <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                      <FiUser className="text-blue-800" size={18} />
                    </span>
                    <p className="  text-black  font-semibold ">Jane Cooper</p>
                  </div>
                  <EditButton />
                </div>
                <div className="space-y-2">
                  <div className="bg-blue-50/70 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                          <span className="bg-white p-2 rounded-lg shadow-sm">
                              <FiGift className="text-blue-700" />
                          </span>
                          <div>
                              <p className="font-semibold text-gray-800">Gift from Family</p>
                              <p className="text-sm text-gray-500">Home</p>
                          </div>
                      </div>
                      <p className="font-bold text-gray-800">$50,000</p>
                  </div>
                   <div className="bg-blue-50/70 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                           <span className="bg-white p-2 rounded-lg shadow-sm">
                              <FiGift className="text-blue-700" />
                          </span>
                          <div>
                              <p className="font-semibold text-gray-800">Gift from Family</p>
                              <p className="text-sm text-gray-500">Home</p>
                          </div>
                      </div>
                      <p className="font-bold text-gray-800">$50,000</p>
                  </div>
                </div>
              </div>
              {/* Second Asset Group (as per image) */}
               <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                     <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                      <FiUser className="text-blue-800" size={18} />
                    </span>
                    <p className="  text-black  font-semibold ">Jane Cooper</p>
                  </div>
                  <EditButton />
                </div>
                <div className="bg-blue-50/70 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                          <span className="bg-white p-2 rounded-lg shadow-sm">
                              <FiGift className="text-blue-700" />
                          </span>
                          <div>
                              <p className="font-semibold text-gray-800">Gift from Family</p>
                              <p className="text-sm text-gray-500">Home</p>
                          </div>
                      </div>
                      <p className="font-bold text-gray-800">$50,000</p>
                  </div>
              </div>
            </div>
          </AccordionSection>

          {/* 6. Properties */}
          <AccordionSection number={6} title="">
             <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                    <FiUser className="text-blue-800" size={18} />
                  </span>
                  <div>
                    <p className="  text-black  font-semibold ">Jane Cooper</p>
                    <p className=""></p>
                  </div>
                </div>
                <EditButton />
              </div>
          </AccordionSection>

<AccordionSection number={6} title="Properties">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-800" size={18} />
                </span>
                <div>
                  <p className="font-bold text-black">Jane Cooper</p>
                </div>
              </div>
              <EditButton />
            </div>
            <div className="space-y-1 font-semiold     text-black  text-sm  mt-1 max-w-md">
              <p>Sansin - 111 Mcnab Street, Strathroy,</p>
              <p> Ontario N7G4J6</p>
            </div>
          </AccordionSection>
          {/* 7. Referral */}
          <AccordionSection number={7} title="Referral">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2.5 rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-800" size={18} />
                </span>
                <div>
                  <p className="font-bold text-gray-900">Jane Cooper</p>
                </div>
              </div>
              <EditButton />
            </div>
              <p className ="text-black  font-semibold ">Realtor</p>
            <div className="space-y-1">
              <input type="text" placeholder="Company Name" className="w-full  rounded-md    focus:ring-blue-500 focus:border-blue-500"/>
              <input type="email" placeholder="Email" className="w-full rounded-md  focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </AccordionSection>
        </div>

        {/* Footer Button */}
        <div className="pt-4">
          <Link href="/dashboard/application">
          <button className="w-full bg-[#013E8C] text-white font-semibold py-3 px-4 rounded-full hover:bg-[#013E8C] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
            Go to dashboard
          </button>
          </Link>
        </div>
      </div>
</div>
     
    </div>
  );
};

export default AddReferralPage;