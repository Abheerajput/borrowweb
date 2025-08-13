"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, FormEvent } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const totalSteps = 7;

// 1. Define a NEW, CORRECT interface for the referral form data
interface IReferralFormData {
  wasRecommended: boolean;
  
  // These fields are optional because they only exist if wasRecommended is true
  referrerFirstName?: string;
  referrerLastName?: string;
  referrerCompany?: string;
  referrerEmail?: string;
  referrerPhone?: string;
  referralType?: "Builder" | "Realtor" | "Client" | "Other";
}

const ReferralDetails = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // 2. Use a state object based on the NEW interface with correct defaults
  const [formData, setFormData] = useState<IReferralFormData>({
    wasRecommended: false,
    referrerFirstName: "",
    referrerLastName: "",
    referrerCompany: "",
    referrerEmail: "",
    referrerPhone: "",
    referralType: "Realtor", // A sensible default
  });

  const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 3. Unified handler for text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 4. Custom handler for radio buttons
  const handleFieldChange = (fieldName: keyof IReferralFormData, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  
  // 5. Handle form submission with corrected logic
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let submissionData: Partial<IReferralFormData> = {
        wasRecommended: formData.wasRecommended,
    };

    // Only include referrer details if one was provided
    if (formData.wasRecommended) {
        submissionData = { ...submissionData, ...formData };
    }
    
    console.log("Submitting Referral Data to API:", submissionData);

    try {
        /*
        const response = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });

        if (!response.ok) { throw new Error('API submission failed'); }
        
        router.push('/dashboard/application/step7'); // Navigate to next step
        */
       alert("Referral data logged to console. Check the console for the API payload.");

    } catch (error) {
        console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col p-4">
      {/* Header and Progress Bar */}



      
      <div className="flex justify-between items-center">
        <Link href="/dashboard/application/step6" className="flex gap-2 items-center text-gray-700 hover:text-black">
          <IoMdArrowRoundBack className="text-xl" />
          <span className="font-semibold">Referral Information</span>
        </Link>

        {isClient && (
          <span className="flex flex-col-reverse items-end gap-2">
            <div className="flex  gap-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className={`h-1.5 w-5 rounded-full ${index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"}`}></div>
              ))}
            </div>
            <h1 className="text-sm text-black font-medium">{currentStep} of {totalSteps}</h1>
          </span>
        )}
      </div>

      <div className="bg-white mt-8 shadow-md rounded-xl p-6 w-full max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="font-semibold text-[#111827] text-xl">Add Referral</h1>
        
          <div className="my-6">
            <label className="block mb-2 font-semibold text-[#111827] text-[18px]">
              Did anyone recommend us to you?
            </label>
            <div className="flex gap-6 text-[#111827]">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  {/* Converted to radio for single selection */}
                  <input type="radio" name="wasRecommended" checked={formData.wasRecommended === (option === "Yes")} onChange={() => handleFieldChange("wasRecommended", option === "Yes")} className="accent-blue-600 w-4 h-4"/>
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* 6. Conditional rendering: This entire block only shows if "Yes" is selected */}
          {formData.wasRecommended && (
            <div className="space-y-6 
             rounded-r-lg">
                <div className="mb-6">
                    <label htmlFor="referrerFirstName" className="block font-semibold text-[#111827] text-[18px] mb-2">First name</label>
                    <input id="referrerFirstName" name="referrerFirstName" placeholder="Referrer’s first name" value={formData.referrerFirstName || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="referrerLastName" className="block font-semibold text-[#111827] text-[18px] mb-2">Last name</label>
                    <input id="referrerLastName" name="referrerLastName" placeholder="Referrer’s last name" value={formData.referrerLastName || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="referrerCompany" className="block font-semibold text-[#111827] text-[18px] mb-2">Company name (Optional)</label>
                    <input id="referrerCompany" name="referrerCompany" placeholder="Referrer’s company name" value={formData.referrerCompany || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" />
                </div>
                <div className="mb-6">
                    <label htmlFor="referrerEmail" className="block font-semibold text-[#111827] text-[18px] mb-2">Email address</label>
                    <input id="referrerEmail" name="referrerEmail" type="email" placeholder="Referrer’s email" value={formData.referrerEmail || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="referrerPhone" className="block font-semibold text-[#111827] text-[18px] mb-2">Phone number</label>
                    <input id="referrerPhone" name="referrerPhone" type="tel" placeholder="Referrer's phone number" value={formData.referrerPhone || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" required/>
                </div>
                <div className="my-6">
                    <label className="block mb-2 font-semibold text-[#111827] text-[18px]">Referral Type</label>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#111827]">
                    {(["Builder", "Realtor", "Client", "Other"] as const).map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="referralType" checked={formData.referralType === option} onChange={() => handleFieldChange("referralType", option)} className="accent-blue-600 w-4 h-4"/>
                        {option}
                        </label>
                    ))}
                    </div>
                </div>
            </div>
          )}

          <hr className="text-black my-6" />
          
          <div className="flex w-full justify-end mt-6">
            <Link href="/dashboard/application/submit">
            <button  className="bg-[#013E8C] min-w-[200px] text-white px-6 py-3 rounded-full hover:bg-[#002e6b] transition-colors">
              Continue
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReferralDetails;










// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { PiCompassRoseFill } from "react-icons/pi";
// const totalSteps = 7;

// const ReferralDetails = () => {
 
//   const pathname = usePathname();
//   const [isClient, setIsClient] = useState(false);
//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
//   useEffect(() => {
//     setIsClient(true);
//   }, []);
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen min-w-full flex flex-col ">
//       <div className="flex justify-between">
//         <span className="flex gap-2 ">
//           <span className="flex justify-center gap-2 items-center">
//             <Link href="/dashboard/application/step1">
//               <IoMdArrowRoundBack />
//             </Link>
//             Properties
//           </span>
//         </span>

//         {isClient && (
//           <span className="flex items-center gap-2">
//             {/* Dots */}
//             <div className="flex gap-1">
//               {Array.from({ length: totalSteps }).map((_, index) => (
//                 <div
//                   key={index}
//                   className={`h-1.5 w-5 rounded-full ${
//                     index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"
//                   }`}
//                 ></div>
//               ))}
//             </div>

//             {/* Text */}
//             <h1 className="text-sm font-medium">
//               {currentStep} of {totalSteps}
//             </h1>
//           </span>
//         )}
//       </div>

//       <div className="bg-white mt-8 shadow-md rounded-xl p-6 w-full ">
//         <label
//           htmlFor=""
//           className="block font-semibold text-[#111827] text-[18px] "
//         >
//           What is the property's address?
//         </label>
//         <div className="grid grid-cols-1 gap-4 mb-4">
//           <input
//             name="Property’s address"
//             placeholder="Property’s address"
//             className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>
//         <hr className="my-4" />
//         <div className="mb-4">
//           <div className="relative">
//             <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
//             <input
//               id="companyAddress"
//               name="companyAddress"
//               type="text"
//               // value={data.companyAddress}
//               onChange={handleChange}
//               className="w-full border rounded-full pl-9 text-black border-gray-300 px-4 py-2"
//               placeholder="Start typing the address"
//             />
//           </div>
//           <span className="flex text-[16px] text-black font-normal justify-between my-4">
//             <p>Can’t find the address</p>
//             <p className="text-[#013E8C]  border-b-2 border-b-[#013E8C] font-semibold cursor-pointer">
//               Typing Manually?
//             </p>
//           </span>
//         </div>
//         <div className="mb-4 mt-4 flex flex-col">
//           <label
//             htmlFor=""
//             className="block font-semibold text-[#111827] text-[18px] mb-2"
//           >
//             Roughly how much is this property worth?
//           </label>
//           <input
//             name="propertyWorth"
//             placeholder="$ e.g 80000.00"
//             className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="my-6">
//           <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
//             Do you plan on selling this property?
//           </label>
//           <div className="flex gap-6 text-[#111827]">
//             {["Yes", "No"].map((option) => (
//               <label
//                 key={option}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   name="receivesBonus"
//                   // checked={data.receivesBonus === (option === "Yes")}
//                   // onChange={() =>
//                   //   handleRadioChange("receivesBonus", option === "Yes")
//                   // }
//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>
//         <div className="my-6">
//           <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
//             Does this property have a mortgage?
//           </label>
//           <div className="flex gap-6 text-[#111827]">
//             {["Yes", "No"].map((option) => (
//               <label
//                 key={option}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   name="receivesBonus"
//                   // checked={data.receivesBonus === (option === "Yes")}
//                   // onChange={() =>
//                   //   handleRadioChange("receivesBonus", option === "Yes")
//                   // }
//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         <h1 className="font-semibold text-[#111827] text-[18px]">
//           Mortgage Information
//         </h1>
//         <hr className="my-4" />
//         <div className="mb-4 mt-4 flex flex-col">
//           <label
//             htmlFor=""
//             className="block font-semibold text-[#111827] text-[18px] mb-2"
//           >
//             Who is the Lender?
//           </label>
//           <input
//             name="lender"
//             placeholder="eg. Scotibank"
//             className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-4 mt-4 flex flex-col">
//           <label
//             htmlFor=""
//             className="block font-semibold text-[#111827] text-[18px] mb-2"
//           >
//             What is the current rate for this mortgage?
//           </label>
//           <input
//             name="number"
//             placeholder="eg. 3.21%"
//             className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>

//         <hr />

//         <div className="my-6">
//           <label className="block mb-1 font-semibold text-[#111827] text-[18px]">
//             Mortgage Type
//           </label>
//           <div className="flex gap-6 text-[#111827]">
//             {["Fixed", "Variable"].map((option) => (
//               <label
//                 key={option}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   name="receivesBonus"
//                   // checked={data.receivesBonus === (option === "Yes")}
//                   // onChange={() =>
//                   //   handleRadioChange("receivesBonus", option === "Yes")
//                   // }
//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 {option}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mb-4 flex flex-col">
//           <label
//             htmlFor=""
//             className="block font-semibold text-[#111827] text-[18px]"
//           >
//             How often do you make payments?
//           </label>
//           <input
//             name="payments"
//             placeholder="Select"
//             className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4 mt-4 flex flex-col">
//           <label
//             htmlFor=""
//             className="block font-semibold text-[#111827] text-[18px] mb-2"
//           >
//             How much are these payments?
//           </label>
//           <input
//             name=""
//             placeholder="$ e.g 80000.00"
//             className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4 mt-4 flex flex-col">
//           <label
//             htmlFor=""
//             className="block font-semibold text-[#111827] text-[18px] mb-2"
//           >
//             What's the balance of the mortgage?
//           </label>
//           <input
//             name=""
//             placeholder="$ e.g 80000.00"
//             className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-4 mt-4 flex flex-col">
//           <label
//             htmlFor=""
//             className="block font-semibold text-[#111827] text-[18px] mb-2"
//           >
//             When is your mortgage due for renewal?{" "}
//           </label>
//           <input
//             name=""
//             placeholder="$ e.g 80000.00"
//             className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
//             onChange={handleChange}
//           />
//         </div>

//         <hr className="text-black my-4" />

        
   

//         <div className="flex  w-full justify-between mt-6">
//           <button className="text-[#F92C2C] border border-[#F92C2C] min-w-[48%] px-6 py-2 rounded-full hover:bg-red-100">
//             Delete
//           </button>
//           <button className="bg-[#013E8C] min-w-[48%] text-white px-6 py-2 rounded-full hover:bg-[#002e6b]">
//             Update
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ReferralDetails;
