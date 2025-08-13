"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
const totalSteps = 7;

interface UploadBoxProps {
  label: string;
  description: string;
}

const UploadBox: React.FC<UploadBoxProps> = ({ label, description }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file); // create preview URL
      setPreview(imageUrl);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full h-40 hover:border-[#013E8C] transition cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <>
          <FaRegImage className="text-3xl text-gray-400 mb-2" />
          <p className="font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

const DocumentsDetails: React.FC<{ DocumentName: string }> = ({
  DocumentName,
}) => {
   const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
 
 useEffect(() => {
    setIsClient(true);
}, []);
  return (
        <div className="min-h-screen min-w-full   flex flex-col ">

     <div className='flex justify-between'>
        
        <span className='flex gap-2 '>
          <span className='flex justify-center text-black gap-2 items-center'>
            <Link href="/dashboard/application/step2" className="cursor-pointer flex gap-2 items-center">
            <IoMdArrowRoundBack/>
            Documents
            </Link>
          </span>
         
        </span>

     {isClient && (
          <span className="flex items-end flex-col-reverse gap-2">
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
      <div className="min-w-full flex justify-center items-center">
 <div className="bg-white mt-8   shadow-md rounded-xl p-6  max-w-3xl">
      <h2 className="text-xl text-black font-semibold mb-6  pb-1">
        Upload Documents
      </h2>

      <div className="mb-4 text-sm text-[#595959] ">
        <span className="min-w-[90px] text-black font-medium">List of IDs:</span>{" "}
        Only 2 required — DL, Passport, PR Card, Provincial ID Card with photo,
        Citizenship Card. Only one copy needed for Passport, rest F&B required
        for all IDs.
      </div>
<hr  className="border-b-2 border-[#013E8C] max-w-[100px] my-3"/>
      <div className="mb-4">
        <input
          type="text"
          value={DocumentName}
          disabled
          className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-700"
        />
      </div>

      {/* Primary ID */}
      <div className="text-[#111827] font-semibold mb-3">
        Attach Primary Government approved Photo ID
      </div>
      <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 mb-6">
        <UploadBox
          label="Upload Documents"
          description="Upload Front Image of your ID"
        />
        <UploadBox
          label="Upload Documents"
          description="Upload Back Image of your ID"
        />
      </div>

      {/* Secondary ID */}
      <div className="text-[#111827] font-semibold mb-3">
        Attach Secondary Government approved Photo ID
      </div>
      <div className="grid xs:grid-cols-1 grid-cols-2 gap-4 mb-6">
        <UploadBox
          label="Upload Documents"
          description="Upload Front Image of your ID"
        />
        <UploadBox
          label="Upload Documents"
          description="Upload Back Image of your ID"
        />
      </div>

      {/* Buttons */}
      <div className="flex w-full justify-between mt-6">
        <button className="text-[#F92C2C] border border-[#F92C2C] min-w-[48%] px-6 py-2 rounded-full hover:bg-red-100">
          Delete
        </button>
        <button className="bg-[#013E8C] min-w-[48%] text-white px-6 py-2 rounded-full hover:bg-[#002e6b]">
          Save
        </button>
      </div>
    </div>
      </div>
   
    </div>
  );
};

export default DocumentsDetails;
