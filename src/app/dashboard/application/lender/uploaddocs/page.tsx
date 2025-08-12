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
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg  w-full h-72 hover:border-[#013E8C] transition cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="min-w-full min-h-full object-cover rounded-lg"
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

const page: React.FC<{ DocumentName: string }> = ({
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
          <span className='flex justify-center text-[#111827] font-semibold gap-2 items-center'>
            <Link href="/dashboard/application/step2">
            <IoMdArrowRoundBack/>
            </Link>
            Documents
          </span>
         
        </span>

   
      </div>
      <div className="min-w-full flex justify-center items-center">
 <div className="bg-white mt-8   shadow-md rounded-xl p-6 min-w-full">
      <h2 className="text-xl text-[#111827] font-semibold mb-6  pb-1">
        Upload Documents
      </h2>


<hr  className="border-b-2 border-[#013E8C] max-w-[100px] my-3"/>
      

      {/* Primary ID */}
      <div className="text-[#111827] font-semibold mb-3">
Attach Document 1
      </div>
      <div className=" min-h-[300px] flex  flex-col justify-between  gap-4 mb-6">
        <div className=" grid xs:grid-cols-1 gap-4 w-full grid-cols-2">

        <UploadBox
          label="Upload Documents"
          description="Upload Front Image of your ID"
        />
        <UploadBox
          label="Upload Documents"
          description="Upload Back Image of your ID"
        />
          </div>

         <div className="flex w-full justify-between mt-6">
      
        <button className="bg-[#013E8C] w-full text-white px-6 py-2 rounded-full hover:bg-[#002e6b]">
         Save & Upload Document
        </button>
      </div>
      </div>

    
     
    </div>
      </div>
   
    </div>
  );
};

export default page;