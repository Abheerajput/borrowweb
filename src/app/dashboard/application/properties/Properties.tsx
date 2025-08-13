"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, FormEvent } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PiCompassRoseFill } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa";

const totalSteps = 7;

// 1. Define an interface for the form data for type safety
interface IPropertyFormData {
  propertyAddress: string;
  propertyValue: string;
  planToSell: boolean;
  hasMortgage: boolean;
  
  // Mortgage fields (optional, will only be present if hasMortgage is true)
  lender?: string;
  currentRate?: string;
  mortgageType?: "Fixed" | "Variable";
  paymentFrequency?: "Monthly" | "Bi-weekly" | "Weekly";
  paymentAmount?: string;
  mortgageBalance?: string;
  renewalDate?: string;
}

const PropertiesDetails = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // 2. Use a single state object to manage all form data
  const [formData, setFormData] = useState<IPropertyFormData>({
    propertyAddress: "",
    propertyValue: "",
    planToSell: false,
    hasMortgage: false,
    
    lender: "",
    currentRate: "",
    mortgageType: "Fixed",
    paymentFrequency: "Monthly",
    paymentAmount: "",
    mortgageBalance: "",
    renewalDate: "",
  });

  const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 3. Unified handler for text, number, and select inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 4. Custom handler for radio buttons to manage boolean state
  const handleFieldChange = (fieldName: keyof IPropertyFormData, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  
  // 5. Handle the form submission to the API
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prepare data for API: remove mortgage info if not applicable
    const submissionData: Partial<IPropertyFormData> = { ...formData };
    if (!formData.hasMortgage) {
      delete submissionData.lender;
      delete submissionData.currentRate;
      delete submissionData.mortgageType;
      delete submissionData.paymentFrequency;
      delete submissionData.paymentAmount;
      delete submissionData.mortgageBalance;
      delete submissionData.renewalDate;
    }
    
    console.log("Submitting to API:", submissionData);

    try {
        /*
        const response = await fetch('/api/properties', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
        });

        if (!response.ok) {
            throw new Error('API submission failed');
        }
        
        const result = await response.json();
        console.log('API Success:', result);
        router.push('/dashboard/application/step3'); // Navigate to next step on success
        */
       alert("Form data logged to console. Check the console for the API payload.");

    } catch (error) {
        console.error("API Error:", error);
    }
  };


  return (
    <div className="min-h-screen min-w-full flex flex-col p-4">
      {/* Header and Progress Bar */}
      <div className="flex justify-between items-center">
        <Link href="/dashboard/application/step5" className="flex gap-2 items-center text-gray-700 hover:text-black">
          <IoMdArrowRoundBack className="text-xl" />
          <span className="font-semibold">Properties</span>
        </Link>

        {isClient && (
          <span className="flex flex-col-reverse items-end gap-2">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className={`h-1.5 w-5 rounded-full ${index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"}`}></div>
              ))}
            </div>
            <h1 className="text-sm text-black font-medium">{currentStep} of {totalSteps}</h1>
          </span>
        )}
      </div>

      <div className="bg-white mt-8 shadow-md rounded-xl p-6 w-full max-w-3xl mx-auto">
        {/* 6. Wrap content in a form with an onSubmit handler */}
        <form onSubmit={handleSubmit}>
          
          <label htmlFor="propertyAddress" className="block font-semibold text-[#111827] text-[18px]">
            What is the property's address?
          </label>
          <div className="relative mt-2 mb-4">
            <PiCompassRoseFill className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
            <input
              id="propertyAddress"
              name="propertyAddress"
              type="text"
              value={formData.propertyAddress}
              onChange={handleChange}
              className="w-full border rounded-full pl-11 text-black border-gray-300 px-4 py-2"
              placeholder="Start typing the address"
              required
            />
          </div>
          <span className="flex text-sm text-black font-normal justify-between my-4">
            <p>Can’t find the address?</p>
            <p className="text-[#013E8C] border-b-2 border-b-[#013E8C] font-semibold cursor-pointer">
              Type Manually
            </p>
          </span>

          <hr className="my-6"/>
          
          <div className="mb-6">
            <label htmlFor="propertyValue" className="block font-semibold text-[#111827] text-[18px] mb-2">
              Roughly how much is this property worth?
            </label>
             <div className="relative">
                <FaDollarSign className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" />
                <input
                    id="propertyValue"
                    name="propertyValue"
                    type="number"
                    placeholder="e.g. 800000"
                    value={formData.propertyValue}
                    onChange={handleChange}
                    className="w-full border rounded-full pl-10 text-black border-gray-300 px-4 py-2"
                    required
                />
            </div>
          </div>

          <div className="my-6">
            <label className="block mb-2 font-semibold text-[#111827] text-[18px]">
              Do you plan on selling this property?
            </label>
            <div className="flex gap-6 text-[#111827]">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="planToSell" checked={formData.planToSell === (option === "Yes")} onChange={() => handleFieldChange("planToSell", option === "Yes")} className="accent-blue-600 w-[15px] h-[15px]"/>
                  {option}
                </label>
              ))}
            </div>
          </div>
          
          <div className="my-6">
            <label className="block mb-2 font-semibold text-[#111827] text-[18px]">
              Does this property have a mortgage?
            </label>
            <div className="flex gap-6 text-[#111827]">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="hasMortgage" checked={formData.hasMortgage === (option === "Yes")} onChange={() => handleFieldChange("hasMortgage", option === "Yes")} className="accent-blue-600 w-[15px] h-[15px]"/>
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* 7. Conditional Rendering for Mortgage Info */}
          {formData.hasMortgage && (
            <>
              <h2 className="font-semibold text-[#111827] text-xl mt-8">Mortgage Information</h2>
              <hr className="my-4" />
              
              <div className="mb-6">
                <label htmlFor="lender" className="block font-semibold text-[#111827] text-[18px] mb-2">Who is the Lender?</label>
                <input id="lender" name="lender" placeholder="e.g. Scotiabank" value={formData.lender || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" />
              </div>

              <div className="mb-6">
                <label htmlFor="currentRate" className="block font-semibold text-[#111827] text-[18px] mb-2">What is the current rate for this mortgage?</label>
                <input id="currentRate" name="currentRate" type="number" step="0.01" placeholder="e.g. 3.21" value={formData.currentRate || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" />
              </div>
              
              <div className="my-6">
                <label className="block mb-2 font-semibold text-[#111827] text-[18px]">Mortgage Type</label>
                <div className="flex gap-6 text-[#111827]">
                  {(["Fixed", "Variable"] as const).map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="mortgageType" checked={formData.mortgageType === option} onChange={() => handleFieldChange("mortgageType", option)} className="accent-blue-600 w-[15px] h-[15px]" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="paymentFrequency" className="block font-semibold text-[#111827] text-[18px] mb-2">How often do you make payments?</label>
                <select id="paymentFrequency" name="paymentFrequency" value={formData.paymentFrequency} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2">
                  <option>Monthly</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="paymentAmount" className="block font-semibold text-[#111827] text-[18px] mb-2">How much are these payments?</label>
                <input id="paymentAmount" name="paymentAmount" type="number" placeholder="$ e.g. 1500.00" value={formData.paymentAmount || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" />
              </div>
              
              <div className="mb-6">
                <label htmlFor="mortgageBalance" className="block font-semibold text-[#111827] text-[18px] mb-2">What's the balance of the mortgage?</label>
                <input id="mortgageBalance" name="mortgageBalance" type="number" placeholder="$ e.g. 450000.00" value={formData.mortgageBalance || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" />
              </div>

              <div className="mb-6">
                <label htmlFor="renewalDate" className="block font-semibold text-[#111827] text-[18px] mb-2">When is your mortgage due for renewal?</label>
                <input id="renewalDate" name="renewalDate" type="date" value={formData.renewalDate || ''} onChange={handleChange} className="w-full border rounded-full text-black border-gray-300 px-4 py-2" />
              </div>
            </>
          )}

          <hr className="text-black my-4" />
          
         <div className="mt-8 w-full flex gap-6 justify-between">
                      <Link href="/dashboard/application/step5" className="w-1/2">
            <button
              className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors"
              >
              Back
            </button>
              </Link>
            <Link href="/dashboard/application/step7" className="w-1/2">
            <button
              // type="submit"
              className="bg-[#013E8C] w-full text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
              >
              Continue
            </button>
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertiesDetails;
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { PiCompassRoseFill } from "react-icons/pi";
// const totalSteps = 7;

// const PropertiesDetails = () => {
 
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

// export default PropertiesDetails;
