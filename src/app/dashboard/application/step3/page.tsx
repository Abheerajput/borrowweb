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
  const [activeBorrower, setActiveBorrower] = useState<string | null>(null)
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
  if (activeBorrower) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center ">
        <UploadDocuments DocumentName={activeBorrower}
        //  onBack={() => setActiveBorrower(null)}
          />
      </div>
    )
  }

  return (

    <div className="min-h-screen  min-w-full flex flex-col ">
     <div className='flex justify-between'>
        
        <span className='flex gap-2 '>
          <span className='flex justify-center text-black gap-2 items-center'>
            <Link href="/dashboard/application/step2">
            <IoMdArrowRoundBack/>
            </Link>
            Documents
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
              onClick={() => setActiveBorrower(document)}
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
