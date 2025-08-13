"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaDollarSign } from "react-icons/fa";
import { PiCompassRoseFill } from "react-icons/pi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname } from "next/navigation";
const totalSteps = 7;

const page = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [hasFoundProperty, setHasFoundProperty] = useState(false);
  const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
   const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
    const [referredByRealtor, setReferredByRealtor] = useState<null | boolean>(null);
  const [hasRealtor, setHasRealtor] = useState<null | boolean>(null);
  const handleRealtorSelection = (value: boolean) => {
    setHasRealtor(value);
  };
  
   const [selectedUsage, setSelectedUsage] = useState("");

  const handleCheckboxChange = (value:any) => {
    setSelectedUsage(value);
  };

  
 const handlePropertyCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    // Only update if checked; avoid toggling both
    if (value === "buy" && isChecked) {
      setHasFoundProperty(true);
    } else if (value === "refinance" && isChecked) {
      setHasFoundProperty(false);
    }
  };
 
   useEffect(() => {
    setIsClient(true);
}, []);
  return (
    <div>
      {/* header */}
      <div className='flex justify-between xs:flex-col xs:items-center items-center'>
        
        <span className='flex gap-2 '>
          <span className='flex justify-center xs:justify-start xs:items-start items-center'>
            <Link href="/dashboard/application">
            <IoMdArrowRoundBack className='xs:mt-1 dark:text-black '/>
            </Link>
          </span>
          <span className='flex flex-col'>
            
          <h1 className='text-[16px] text-[#111827] dark:text-black font-semibold'>Let’s get started with your application!</h1>
          <p className='text-[14px] flex flex-wrap dark:text-black  max-w-[91%]'>Track your current mortgage applications or start a  new one—everything you need in one place.</p>
          </span>


        </span>
<span>
 {isClient && (
          <span className="flex flex-col-reverse dark:text-black  sm:flex-col-reverse items-end gap-2">
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
</span>
    
      </div>
      {/* main section */}

      <div className='w-full min-w-full flex justify-center py-4'>
        <form className="space-y-6  max-w-3xl bg-white rounded-[20px] py-8 px-6">

        <div>
      <label className="block font-semibold text-[#111827] text-[18px] mb-2">What are looking to do?*</label>
     <div className="flex items-center xs:flex-wrap justify-between py-2 gap-4">
  <label
    className={`flex text-[16px] text-[#111827] items-center gap-2 ${
      selected === "buy" ? "font-semibold" : "font-normal"
    }`}
  >
    <input
      type="checkbox"
      name="purpose"
      value="buy"
      checked={selected === "buy"}
      onChange={() => handleCheckboxChange("buy")}
      className="accent-blue-600 w-[15px] h-[15px]"
    />
    Buy a Property
  </label>

  <label
    className={`flex text-[16px] text-[#111827] items-center gap-2 ${
      selected === "refinance" ? "font-semibold" : "font-normal"
    }`}
  >
    <input
      type="checkbox"
      name="purpose"
      value="refinance"
      checked={selected === "refinance"}
      onChange={() => handleCheckboxChange("refinance")}
      className="accent-blue-600 w-[15px] h-[15px]"
    />
    Refinance a Property
  </label>

  <label
    className={`flex text-[16px] text-[#111827] items-center gap-2 ${
      selected === "renew" ? "font-semibold" : "font-normal"
    }`}
  >
    <input
      type="checkbox"
      name="purpose"
      value="renew"
      checked={selected === "renew"}
      onChange={() => handleCheckboxChange("renew")}
      className="accent-blue-600 w-[15px] h-[15px]"
    />
    Renew a Mortgage
  </label>
</div>

    </div>
           <hr className='text-black' />
{selected === "refinance" && (
  <div className="flex gap-1 flex-col justify-between mt-4">
    {/* Property Value */}
    <div className="relative w-full">
      <label
        className={`block text-[#111827] text-[18px] mb-2 ${
          selected === "refinance" ? "font-semibold" : "font-normal"
        }`}
      >
        What's the value of your property?
      </label>
      <span>
        <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
      </span>
      <input
        type="number"
        className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
        placeholder="e.g 540,000.00"
      />
    </div>

    {/* Mortgage Balance */}
    <div className="relative mt-4 w-full">
      <label
        className={`block text-[#111827] text-[18px] mb-2 ${
          selected === "refinance" ? "font-semibold" : "font-normal"
        }`}
      >
        What's your mortgage balance?
      </label>
      <span>
        <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
      </span>
      <input
        type="number"
        className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
        placeholder="e.g 540,000.00"
      />
    </div>
  </div>
)}

{selected === "renew" && (
  <div className="flex gap-1 flex-col justify-between mt-4">
    {/* Renewal Date */}
    <div>
      <label
        className={`block text-[#111827] text-[18px] mb-2 ${
          selected === "renew" ? "font-semibold" : "font-normal"
        }`}
      >
        What is your renewal date?
      </label>
      <input
        type="date"
        className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
        placeholder="2025-07-26"
      />
    </div>

    {/* Property Value */}
    <div className="relative mt-4 w-full">
      <label
        className={`block text-[#111827] text-[18px] mb-2 ${
          selected === "renew" ? "font-semibold" : "font-normal"
        }`}
      >
        What's the value of your property?
      </label>
      <span>
        <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
      </span>
      <input
        type="number"
        className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
        placeholder="e.g 540,000.00"
      />
    </div>

    {/* Mortgage Balance */}
    <div className="relative mt-4 w-full">
      <label
        className={`block text-[#111827] text-[18px] mb-2 ${
          selected === "renew" ? "font-semibold" : "font-normal"
        }`}
      >
        What's your mortgage balance?
      </label>
      <span>
        <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
      </span>
      <input
        type="number"
        className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
        placeholder="e.g 540,000.00"
      />
    </div>
  </div>
)}

        {/* 2. How many children in your group? */}
         <div className="">
     
      <div>
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          Have you already found a property?*
        </label>
        <div className="flex xs:flex-wrap xs:gap-2 gap-12 xs:py-1 py-3">
          <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="buy"
              className="accent-blue-600 w-[15px] h-[15px]"
              onChange={handlePropertyCheckbox}
              checked={hasFoundProperty}
            />
            Yes, I’ve found a property
            
          </label>

          <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
            <input
              type="checkbox"
              name="purpose"
              value="refinance"
              className="accent-blue-600 w-[15px] h-[15px]"
              onChange={() => setHasFoundProperty(false)}
              checked={!hasFoundProperty}
            />
            No, I’m still looking
          </label>
        </div>
      </div>

     

      {/* Conditional Question 2 */}
      {hasFoundProperty && (









<>







        <div>
           <hr className="text-black my-4" />
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">
            Great! Is this the first property you've purchased?*
          </label>
          <div className="flex items-center py-2 gap-4">
            <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
              <input
                type="checkbox"
                name="firstTime"
                value="yes"
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              Yes
            </label>
            <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
              <input
                type="checkbox"
                name="firstTime"
                value="no"
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              No
            </label>
          </div>
        </div>









  <div className='mt-4'>
          <label className="block font-semibold text-[#111827] text-[18px]  mb-2">What's the purchase price?</label>
          <div className='relative'>

<span> 
<FaDollarSign className='absolute top-[21.5px] left-[8px]'/>
</span>
          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='e.g 540,000.00'/>
          </div>
        </div>





</>


      )}
    </div>
           <hr className='text-black my-4' />



{hasFoundProperty === false && (
        <div>
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">
            What's the purchase price you're considering?
          </label>
          <div className="relative">
            <FaDollarSign className="absolute top-[22px] left-[12px] text-gray-500" />
            <input
              type="number"
              className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
              placeholder="e.g 540,000.00"
            />
          </div>
        </div>
      )}








        {/* 4. Where is the trip going? */}
      

 <div>
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">How much down payment do you have?</label>
          <div className='flex xs:flex-col gap-1 justify-between'>
 <div className='relative min-w-[49%] xs:min-w-[100%] max-w-[50%]'>

<span> 
<FaDollarSign className='absolute top-[21.5px] left-[8px]'/>
</span>
          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='e.g 540,000.00 '/>
          </div>
           <div className='relative xs:min-w-[100%] min-w-[49%] max-w-[50%]'>

<span> 
<FaDollarSign className='absolute top-[21.5px] left-[8px]'/>
</span>
          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='e.g 540,000.00'/>
          </div>
          </div>
         
        </div>


 <div>
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">When's the closing date?</label>
         

          <input type="date" 
          className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"  
          placeholder='2025-007-26'/>
          </div>
        










<hr  className='text-black my-4'/>
        <div>
      <label className="block font-semibold text-[18px] text-[#111827] mb-2">
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
            name="usage"
            value="live"
            checked={selectedUsage === "live"}
            onChange={() => handleCheckboxChange("live")}
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
            name="usage"
            value="liveRent"
            checked={selectedUsage === "liveRent"}
            onChange={() => handleCheckboxChange("liveRent")}
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
            name="usage"
            value="rent"
            checked={selectedUsage === "rent"}
            onChange={() => handleCheckboxChange("rent")}
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
            name="usage"
            value="secondHome"
            checked={selectedUsage === "secondHome"}
            onChange={() => handleCheckboxChange("secondHome")}
            className="accent-blue-600 w-[15px] h-[15px]"
          />
          It’s going to be my second home
        </label>
      </div>
    </div>
        <hr  className='text-black my-8'/>

        {/* 6. What is the outing date? */}
        <div>
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">What’s the property address?</label>
          <div className='relative'>

<span> 
<PiCompassRoseFill className='absolute top-[22px] left-[11px]'/>
</span>
          <input type="number" 
          className="w-full border rounded-full pl-8 text-black dark:text-black  border-gray-300 mt-2 px-4 py-2"  
          placeholder='Start typing the address'/>
          </div>
          <span className='flex xs:flex-col text-[16px] text-black font-normal  justify-between my-4'>
            <p>Can’t find the address</p>

            <p className='text-[#013E8C] xs:mt-2 xs:border-0 border-b-2 border-b-[#013E8C] font-semibold'>Typing Manually?</p>
          </span>
        </div>
<hr  className='text-black '/>
       <div className="">
      {/* Question 1 */}
      <div>
        <label className="block font-semibold text-[#111827] text-[18px] mb-2">
          Do you have a realtor?
        </label>
        <div className="flex gap-4">
          <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
            <input
              type="checkbox"
              name="hasRealtor"
              className="accent-blue-600 w-[15px] h-[15px]"
              checked={hasRealtor === true}
               onChange={() => {
                setHasRealtor(true);
                setReferredByRealtor(null); // reset next step
              }}
            />
            Yes
          </label>
          <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
            <input
              type="checkbox"
              name="hasRealtor"
              className="accent-blue-600 w-[15px] h-[15px]"
              checked={hasRealtor === false}
             onChange={() => {
                setHasRealtor(false);
                setReferredByRealtor(null); // reset next step
              }}
            />
            No
          </label>
        </div>
      </div>

      {/* Conditional Question 2 */}
      {hasRealtor && (
        <div className='mt-4'>
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">
            Did your realtor refer you to us?
          </label>
          <div className="flex gap-4">
            <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
              <input
                type="checkbox"
                name="realtorReferral"
                className="accent-blue-600 w-[15px] h-[15px]"
                 checked={referredByRealtor === true}
                onChange={() => setReferredByRealtor(true)}
              
                
              />
              Yes
            </label>
            <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
              <input
                type="checkbox"
                name="realtorReferral"
                className="accent-blue-600 w-[15px] h-[15px]"
                 onChange={() => setReferredByRealtor(false)}
              />
              No
            </label>
          </div>
        </div>
      )}
    </div>
      
      {hasRealtor && referredByRealtor === true && (
 <div>
          <label className="block font-semibold text-[#111827] text-[18px] mb-2">Who is your realtor?</label>
          <div className='flex gap-1 mt-4 justify-between'>
 <div className='relative  min-w-[49%] max-w-[50%]'>
<label htmlFor="" className='text-[16px] text-[#111827] font-medium'>Realtor's first name</label>

          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='Realtor’s first name'/>
          </div>
           <div className='relative min-w-[49%] max-w-[50%]'>
<label htmlFor="" className='text-[16px] text-[#111827] font-medium'>Realtor's last name</label>
          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='Realtor’s Last name'/>
          </div>
          </div>
          <div className='relative w-full mt-4'>
<label htmlFor="" className='text-[16px] text-[#111827] font-medium'>Realtor's Company name</label>

          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='Realtor’s Company name'/>
          </div>



          <div className='flex gap-1 mt-4 justify-between'>
 <div className='relative min-w-[49%] max-w-[50%]'>
<label htmlFor="" className='text-[16px] text-[#111827] font-medium'>Realtor's email</label>

          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='Realtor’s email'/>
          </div>
           <div className='relative min-w-[49%] max-w-[50%]'>
<label htmlFor="" className='text-[16px] text-[#111827] font-medium'>Realtor's phone number</label>
          <input type="number" 
          className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"  
          placeholder='Realtor’s phone number'/>
          </div>
          </div>

        </div>

      )}



        {/* 11. Submit Button */}
        <div className="text-right w-full">
          <Link href="/dashboard/application/step2">
          <button type="submit" className="bg-[#013E8C] text-white font-semibold min-w-full py-3 rounded-full">
            Continue
          </button>
          </Link>
        </div>
      </form>
      </div>
    </div>
  ) 
}

export default page