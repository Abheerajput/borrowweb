'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward, IoMdArrowRoundBack } from 'react-icons/io'
import BorrowerDetails from '../../../../Component/BorrowerDetails/BorrowerDetails'
import UploadDocuments from '../documents/UploadDocuments'
import { usePathname } from "next/navigation";
const totalSteps = 7;
const UpdatePage = () => {
  const [Documents, setDocuments] = useState<string[]>(['Document 1', 'Document 2', 'Document 3'])
  const [activeDocument, setActiveDocument] = useState<string | null>(null)
 const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
  const addBorrower = () => {
    setDocuments(prev => [...prev, `Document  ${prev.length + 1}`])
  }
 useEffect(() => {
    setIsClient(true);
}, []);

  
 const [open, setOpen] = useState(false);
   const steps = [
     { label: "Home", route: "/dashboard/application" },
     { label: "Basic Details", route: "/dashboard/application/step1" },
     { label: "Borrowers", route: "/dashboard/application/step2" },
  { label: "Documents", route: "/dashboard/application/step3" },
  { label: "Income", route: "/dashboard/application/step4" },
  { label: "Assets", route: "/dashboard/application/step5" },
  { label: "Properties", route: "/dashboard/application/step6" },
  { label: "Referral", route: "/dashboard/application/step7" },
];
const [selected, setSelected] = useState(steps[3]);

if (activeDocument) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center ">
        <UploadDocuments DocumentName={activeDocument}
        //  onBack={() => setactiveDocument(null)}
          />
      </div>
    )
  }
  return (

    <div className="min-h-screen  min-w-full flex flex-col ">
     <div className='flex justify-between'>
        
      <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <IoMdArrowRoundBack className="text-black" />
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {selected.label}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {steps.map((step) => (
              <Link
                key={step.route}
                href={step.route}
                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                  selected.route === step.route ? "font-semibold" : ""
                }`}
                onClick={() => {
                  setSelected(step);
                  setOpen(false);
                }}
              >
                {step.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>

     {isClient && (
          <span className="flex flex-col-reverse  items-end  gap-2">
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
            <h1 className="text-sm text-black font-medium">
              {currentStep} of {totalSteps}
            </h1>
          </span>
        )}
      </div>
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md  w-[768px] p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b-2 border-[#013E8C] inline-block">
        Upload Documents
        </h2>

        <div className="space-y-4">
          {Documents.map((document, index) => (
            <div
              key={index}
              onClick={() => setActiveDocument(document)}
              className="flex justify-between items-center border border-gray-300 rounded-md px-4 py-[11.5px] text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              {document}
              <IoIosArrowForward className="text-gray-400" />
            </div>
          ))}
        </div>

        <button
          onClick={addBorrower}
          className="text-[#013E8C] text-sm font-semibold mt-4 hover:underline"
        >
          + Add Another Document
        </button>

        <div className="mt-8 w-full flex gap-6 justify-between">
          <Link href="/dashboard/application/step2" className="w-1/2">
            <button
              type="submit"
              className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors"
              >
              Back
            </button>
              </Link>
            <Link href="/dashboard/application/step4" className="w-1/2">
            <button
              // type="submit"
              className="bg-[#013E8C] w-full text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
              >
              Continue
            </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdatePage
