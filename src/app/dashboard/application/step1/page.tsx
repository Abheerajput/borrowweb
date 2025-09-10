"use client";
import { useState, useEffect } from "react";
import LookingToDo from "../ApplicationForm/LookingToDo";
import DownPayment from "../ApplicationForm/DownPayment";
import FoundProperty from "../ApplicationForm/FoundProperty";
import RealtorDetails from "../ApplicationForm/RealtorDetails";
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
const totalSteps = 7;
import toast from "react-hot-toast";
export default function ApplicationForm() {
  const router = useRouter();
  const pathname = usePathname();
const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [selected, setSelected] = useState<string>("");
  const [formData, setFormData] = useState({
    propertyValue: "",
    mortgageBalance: "",
    renewalDate: "",
  });
  const [enabledFields, setEnabledFields] = useState({
    propertyValue: false,
    mortgageBalance: false,
    renewalDate: false,
  });
  const [hasFoundProperty, setHasFoundProperty] = useState<boolean>(false);
  const [firstTimeBuyer, setFirstTimeBuyer] = useState<null | boolean>(null);
  const [purchasePrice, setPurchasePrice] = useState<string>("");

  const [downPayment1, setDownPayment1] = useState("");
  const [downPayment2, setDownPayment2] = useState("");
  const [closingDate, setClosingDate] = useState("");
  const [selectedUsage, setSelectedUsage] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [manualAddress, setManualAddress] = useState({
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [hasRealtor, setHasRealtor] = useState<boolean | null>(null);
  const [referredByRealtor, setReferredByRealtor] = useState<boolean | null>(
    null
  );
  const [realtorInfo, setRealtorInfo] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
  });

  const [apiResponse, setApiResponse] = useState(null);

  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

  // ✅ Prefill data from localStorage if available
  useEffect(() => {
    setIsClient(true);
    const savedApp = localStorage.getItem("selectedApplication");
    if (savedApp) {
      const parsed = JSON.parse(savedApp);
      const details = parsed.basicDetails?.[0];

      if (details) {
        setSelected(details.lookingToData?.label || "");
        setHasFoundProperty(details.alreadyPropertydata?.id === 1);
        setPurchasePrice(details.purchasePrice || "");
        setDownPayment1(details.downpayment || "");
        setDownPayment2(details.downPayment || "");
        setClosingDate(details.closingDate || "");
        setSelectedUsage(details.propertyUsedData?.label || "");
        setPropertyAddress(details.propertyAddress || "");
        if (details.manualAdress) {
          const parts = details.manualAdress.split(",");
          setManualAddress({
            street: parts[0] || "",
            city: parts[1] || "",
            province: parts[2] || "",
            postalCode: parts[3] || "",
          });
        }
        setHasRealtor(details.realtorData?.id === 1);
        setReferredByRealtor(details.realtorReferData?.id === 1);
        setRealtorInfo({
          firstName: details.realtorFirstName || "",
          lastName: details.realtorLastName || "",
          company: details.realtorCompanyName || "",
          email: details.realtorEmail || "",
          phone: details.realtorPhoneNumber || "",
        });
        setFormData({
          propertyValue: details.propertyValue || "",
          mortgageBalance: details.mortgageBalance || "",
          renewalDate: details.renewalDate || "",
        });
      }
    }
  }, []);

  // ✅ Handle submit
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    const isNew = searchParams.get("new") === "true";
  const source = searchParams.get("source");
  let applicationId: string | null = null;
  if (!(isNew && source === "dashboard")) {
    applicationId = localStorage.getItem("applicationId");
    if (!applicationId) {
      toast.error("❌ Application ID not found in localStorage!");
      return;
    }
  }
 
  const payload: any = {
     ...(applicationId ? { applicationId } : {}),
    currentState: currentStep,
    basicDetails: [
      {
        lookingToData: selected ? { id: 1, label: selected } : null,
        alreadyPropertydata:
          hasFoundProperty !== null
            ? {
                id: hasFoundProperty ? 1 : 2,
                label: hasFoundProperty
                  ? "Yes, I’ve found a property"
                  : "No",
              }
            : null,
        downpayment: downPayment1 || null,
        closingDate: closingDate || null,
        propertyUsedData: selectedUsage
          ? { id: 1, label: selectedUsage }
          : null,
        propertyAddress: propertyAddress || null,
        manualAdress: manualAddress.street
          ? `${manualAddress.street}, ${manualAddress.city}, ${manualAddress.province}, ${manualAddress.postalCode}`
          : null,
        realtorData:
          hasRealtor !== null
            ? { id: hasRealtor ? 1 : 2, label: hasRealtor ? "Yes" : "No" }
            : null,
        propertyValue: enabledFields.propertyValue
          ? formData.propertyValue
          : null,
        mortgageBalance: enabledFields.mortgageBalance
          ? formData.mortgageBalance
          : null,
        firstPropertyData:
          firstTimeBuyer !== null
            ? {
                id: firstTimeBuyer ? 1 : 2,
                label: firstTimeBuyer ? "Yes" : "No",
              }
            : null,
        purchasePrice: purchasePrice || null,
        downPayment: downPayment2 || null,
        realtorReferData:
          referredByRealtor !== null
            ? {
                id: referredByRealtor ? 1 : 2,
                label: referredByRealtor ? "Yes" : "No",
              }
            : null,
        realtorFirstName: realtorInfo.firstName || null,
        realtorLastName: realtorInfo.lastName || null,
        realtorCompanyName: realtorInfo.company || null,
        realtorEmail: realtorInfo.email || null,
        realtorPhoneNumber: realtorInfo.phone || null,
      },
    ],
  };
 
  try {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const savedApp = localStorage.getItem("selectedApplication");
    let url = "https://bdapi.testenvapp.com/api/v1/user-applications";
    let method: "POST" | "PUT" = "POST";
const isNew = searchParams.get("new") === "true";
      const source = searchParams.get("source");

      if (isNew && source === "dashboard") {
        method = "POST"; // create
        url = "https://bdapi.testenvapp.com/api/v1/user-applications";

        // optional: clear old saved application
        localStorage.removeItem("selectedApplication");
      } else if (savedApp) {
        const parsed = JSON.parse(savedApp);
        if (parsed._id) {
          url = `${url}/update`;
          method = "PUT";
        }
      
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    let data: any = null;
    try {
      data = await res.json();
    } catch {}

   if (res.ok && (res.status === 200 || res.status === 201)) {
      const storedData = data.data || payload;

  // ✅ Save whole object
  localStorage.setItem("selectedApplication", JSON.stringify(storedData));

       if (storedData._id) {
    localStorage.setItem("applicationId", storedData._id);
  }
  toast.success("Application saved successfully!");
      console.log("✅ Application stored:", data.data || payload);
      setApiResponse(data);
      router.push(`/dashboard/application/step${currentStep + 1}`);
    } else {
      toast.error(`Submission failed! Status: ${res.status}`);
      console.error("❌ Error Response:", data);
    }
  } catch (err) {
    console.error("❌ Error submitting form:", err);
    alert("Something went wrong while submitting!");
  }
};


  return (
    <div>
      <div className="flex justify-between xs:flex-col xs:items-center items-center">
        <span className="flex gap-2 ">
          <span className="flex justify-center xs:justify-start xs:items-start items-center">
            <Link href="/dashboard/application">
              <IoMdArrowRoundBack className="xs:mt-1 dark:text-black " />
            </Link>
          </span>
          <span className="flex flex-col">
            <h1 className="text-[16px] text-[#111827] dark:text-black font-semibold">
              Let’s get started with your application!
            </h1>
            <p className="text-[14px] flex flex-wrap dark:text-black  max-w-[91%]">
              Track your current mortgage applications or start a new one—everything you need in one place.
            </p>
          </span>
        </span>
        <span>
          {isClient && (
            <span className="flex flex-col-reverse dark:text-black sm:flex-col-reverse items-end gap-2">
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
              <h1 className="text-sm text-black font-medium">
                {currentStep} of {totalSteps}
              </h1>
            </span>
          )}
        </span>
      </div>

      <div className="w-full min-w-full flex justify-center py-4">
        <form
          className="space-y-6 max-w-5xl bg-white rounded-[20px] py-8 px-6"
          onSubmit={handleSubmit}
        >
          <LookingToDo
            selected={selected}
            setSelected={setSelected}
            formData={formData}
            setFormData={setFormData}
            enabledFields={enabledFields}
            setEnabledFields={setEnabledFields}
          />

          <FoundProperty
            hasFoundProperty={hasFoundProperty}
            setHasFoundProperty={setHasFoundProperty}
            firstTimeBuyer={firstTimeBuyer}
            setFirstTimeBuyer={setFirstTimeBuyer}
            purchasePrice={purchasePrice}
            setPurchasePrice={setPurchasePrice}
          />

          <DownPayment
            downPayment1={downPayment1}
            setDownPayment1={setDownPayment1}
            downPayment2={downPayment2}
            setDownPayment2={setDownPayment2}
            closingDate={closingDate}
            setClosingDate={setClosingDate}
            selectedUsage={selectedUsage}
            setSelectedUsage={setSelectedUsage}
            propertyAddress={propertyAddress}
            setPropertyAddress={setPropertyAddress}
            manualAddress={manualAddress}
            setManualAddress={setManualAddress}
          />

          <RealtorDetails
            hasRealtor={hasRealtor}
            setHasRealtor={setHasRealtor}
            referredByRealtor={referredByRealtor}
            setReferredByRealtor={setReferredByRealtor}
            realtorInfo={realtorInfo}
            setRealtorInfo={setRealtorInfo}
          />

          <div className="text-right w-full">
            <button
              type="submit"
              className="bg-[#013E8C] text-white font-semibold min-w-full py-3 rounded-full"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import LookingToDo from "../ApplicationForm/LookingToDo";
// import DownPayment from "../ApplicationForm/DownPayment";
// import FoundProperty from "../ApplicationForm/FoundProperty";
// import RealtorDetails from "../ApplicationForm/RealtorDetails";
// import SubmitButton from "../ApplicationForm/SubmitButton";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import Link from "next/link";

// const totalSteps = 7;

// export default function ApplicationForm() {
//   const router = useRouter();
//   const [selected, setSelected] = useState<string>("");
//   const pathname = usePathname();
//   const [isClient, setIsClient] = useState(false);
//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
//   const [apiResponse, setApiResponse] = useState(null);
//   // ✅ refinance/renew inputs
//   const [formData, setFormData] = useState({
//     propertyValue: "",
//     mortgageBalance: "",
//     renewalDate: "",
//   });

//   const [enabledFields, setEnabledFields] = useState({
//     propertyValue: false,
//     mortgageBalance: false,
//     renewalDate: false,
//   });

//   const [hasFoundProperty, setHasFoundProperty] = useState<boolean>(false);
//   const [firstTimeBuyer, setFirstTimeBuyer] = useState<null | boolean>(null);
//   const [purchasePrice, setPurchasePrice] = useState<string>("");

//   const [downPayment1, setDownPayment1] = useState("");
//   const [downPayment2, setDownPayment2] = useState("");
//   const [closingDate, setClosingDate] = useState("");
//   const [selectedUsage, setSelectedUsage] = useState("");
//   const [propertyAddress, setPropertyAddress] = useState("");
//   const [manualAddress, setManualAddress] = useState({
//     street: "",
//     city: "",
//     province: "",
//     postalCode: "",
//   });

//   const [hasRealtor, setHasRealtor] = useState<boolean | null>(null);
//   const [referredByRealtor, setReferredByRealtor] = useState<boolean | null>(
//     null
//   );
//   const [realtorInfo, setRealtorInfo] = useState({
//     firstName: "",
//     lastName: "",
//     company: "",
//     email: "",
//     phone: "",
//   });

//   // ✅ store final data locally too
//   const [applicationData, setApplicationData] = useState<any>(null);


// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

//   const payload = {
//     currentState: currentStep,
//     basicDetails: [
//       {
//         lookingToData: selected
//           ? { id: 1, label: selected }
//           : null,

//         alreadyPropertydata:
//           hasFoundProperty !== null
//             ? { id: hasFoundProperty ? 1 : 2, label: hasFoundProperty ? "Yes, I’ve found a property" : "No" }
//             : null,

//         downpayment: downPayment1 || null,

//         closingDate: closingDate || null,

//         propertyUsedData: selectedUsage
//           ? { id: 1, label: selectedUsage }
//           : null,

//         propertyAddress: propertyAddress || null,

//         manualAdress: manualAddress.street
//           ? `${manualAddress.street}, ${manualAddress.city}, ${manualAddress.province}, ${manualAddress.postalCode}`
//           : null,

//         realtorData:
//           hasRealtor !== null
//             ? { id: hasRealtor ? 1 : 2, label: hasRealtor ? "Yes" : "No" }
//             : null,

//         propertyValue: enabledFields.propertyValue ? formData.propertyValue : null,

//         mortgageBalance: enabledFields.mortgageBalance ? formData.mortgageBalance : null,

//         firstPropertyData:
//           firstTimeBuyer !== null
//             ? { id: firstTimeBuyer ? 1 : 2, label: firstTimeBuyer ? "Yes" : "No" }
//             : null,

//         purchasePrice: purchasePrice || null,

//         downPayment: downPayment2 || null,

//         realtorReferData:
//           referredByRealtor !== null
//             ? { id: referredByRealtor ? 1 : 2, label: referredByRealtor ? "Yes" : "No" }
//             : null,

//         realtorFirstName: realtorInfo.firstName || null,
//         realtorLastName: realtorInfo.lastName || null,
//         realtorCompanyName: realtorInfo.company || null,
//         realtorEmail: realtorInfo.email || null,
//         realtorPhoneNumber: realtorInfo.phone || null,
//       },
//     ],
//   };

// try {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const url = "https://bdapi.testenvapp.com/api/v1/user-applications"; // ✅ always POST
//   const method: "POST" = "POST";

//   const res = await fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `${token}` } : {}),
//     },
//     body: JSON.stringify(payload),
//   });

//   let data: any = null;
//   try {
//     data = await res.json();
//   } catch {}

//   if (res.ok) {
//     localStorage.setItem(
//       "selectedApplication",
//       JSON.stringify(data.data || payload)
//     );
//     console.log("✅ Application stored:", data.data || payload);
//     setApiResponse(data);
//     router.push("/dashboard/application/step2");
//   } else {
//     alert(`Submission failed! Status: ${res.status}`);
//     console.error("❌ Error Response:", data);
//   }
// } catch (err) {
//   console.error("❌ Error submitting form:", err);
//   alert("Something went wrong while submitting!");
// }

// };




//   return (
//     <div>
//       <div className="flex justify-between xs:flex-col xs:items-center items-center">
//         <span className="flex gap-2 ">
//           <span className="flex justify-center xs:justify-start xs:items-start items-center">
//             <Link href="/dashboard/application">
//               <IoMdArrowRoundBack className="xs:mt-1 dark:text-black " />
//             </Link>
//           </span>
//           <span className="flex flex-col">
//             <h1 className="text-[16px] text-[#111827] dark:text-black font-semibold">
//               Let’s get started with your application!
//             </h1>
//             <p className="text-[14px] flex flex-wrap dark:text-black  max-w-[91%]">
//               Track your current mortgage applications or start a new
//               one—everything you need in one place.
//             </p>
//           </span>
//         </span>
//         <span>
//           {isClient && (
//             <span className="flex flex-col-reverse dark:text-black sm:flex-col-reverse items-end gap-2">
//               <div className="flex gap-1">
//                 {Array.from({ length: totalSteps }).map((_, index) => (
//                   <div
//                     key={index}
//                     className={`h-1.5 w-5 rounded-full ${
//                       index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"
//                     }`}
//                   ></div>
//                 ))}
//               </div>
//               <h1 className="text-sm text-black font-medium">
//                 {currentStep} of {totalSteps}
//               </h1>
//             </span>
//           )}
//         </span>
//       </div>

//       <div className="w-full min-w-full flex justify-center py-4">
//         <form
//           className="space-y-6 max-w-5xl bg-white rounded-[20px] py-8 px-6"
//           onSubmit={(e) => {
//             e.preventDefault();
//             console.log("✅ onSubmit fired!");
//             handleSubmit(e);
//           }}
//         >
//           <LookingToDo
//             selected={selected}
//             setSelected={setSelected}
//             formData={formData}
//             setFormData={setFormData}
//             enabledFields={enabledFields}
//             setEnabledFields={setEnabledFields}
//           />

//           <FoundProperty
//             hasFoundProperty={hasFoundProperty}
//             setHasFoundProperty={setHasFoundProperty}
//             firstTimeBuyer={firstTimeBuyer}
//             setFirstTimeBuyer={setFirstTimeBuyer}
//             purchasePrice={purchasePrice}
//             setPurchasePrice={setPurchasePrice}
//           />

//           <DownPayment
//             downPayment1={downPayment1}
//             setDownPayment1={setDownPayment1}
//             downPayment2={downPayment2}
//             setDownPayment2={setDownPayment2}
//             closingDate={closingDate}
//             setClosingDate={setClosingDate}
//             selectedUsage={selectedUsage}
//             setSelectedUsage={setSelectedUsage}
//             propertyAddress={propertyAddress}
//             setPropertyAddress={setPropertyAddress}
//             manualAddress={manualAddress}
//             setManualAddress={setManualAddress}
//           />

//           <RealtorDetails
//             hasRealtor={hasRealtor}
//             setHasRealtor={setHasRealtor}
//             referredByRealtor={referredByRealtor}
//             setReferredByRealtor={setReferredByRealtor}
//             realtorInfo={realtorInfo}
//             setRealtorInfo={setRealtorInfo}
//           />

//          <div className="text-right w-full">
//       {/* <Link href=""> */}
//          <button
//         type="submit"
//         className="bg-[#013E8C] text-white font-semibold min-w-full py-3 rounded-full"
//       >
//         Continue
//       </button>
//       {/* </Link> */}
//     </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import LookingToDo from "../ApplicationForm/LookingToDo";
// import DownPayment from "../ApplicationForm/DownPayment";
// import FoundProperty from "../ApplicationForm/FoundProperty";
// import RealtorDetails from "../ApplicationForm/RealtorDetails";
// import SubmitButton from "../ApplicationForm/SubmitButton";
// import { FaDollarSign } from "react-icons/fa";
// import { PiCompassRoseFill } from "react-icons/pi";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// const totalSteps = 7;
// export default function ApplicationForm() {
//   const [selected, setSelected] = useState<string>("");
// const pathname = usePathname();
//   const [isClient, setIsClient] = useState(false);
//   const stepMatch = pathname.match(/step(\d+)/);
//   const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
//   // ✅ Group refinance/renew inputs
//   const [formData, setFormData] = useState({
//     propertyValue: "",
//     mortgageBalance: "",
//     renewalDate: "",
//   });

//   // ✅ Keep track of which fields user checked
//   const [enabledFields, setEnabledFields] = useState({
//     propertyValue: false,
//     mortgageBalance: false,
//     renewalDate: false,
//   });
//   const [hasFoundProperty, setHasFoundProperty] = useState<boolean>(false);
//   const [firstTimeBuyer, setFirstTimeBuyer] = useState<null | boolean>(null);
//   const [purchasePrice, setPurchasePrice] = useState<string>("");
// const [downPayment1, setDownPayment1] = useState("");
// const [downPayment2, setDownPayment2] = useState("");
// const [closingDate, setClosingDate] = useState("");
// const [selectedUsage, setSelectedUsage] = useState("");
// const [propertyAddress, setPropertyAddress] = useState("");
// const [manualAddress, setManualAddress] = useState({
//   street: "",
//   city: "",
//   province: "",
//   postalCode: "",
// });
// const [hasRealtor, setHasRealtor] = useState<boolean | null>(null);
// const [referredByRealtor, setReferredByRealtor] = useState<boolean | null>(null);
// const [realtorInfo, setRealtorInfo] = useState({
//   firstName: "",
//   lastName: "",
//   company: "",
//   email: "",
//   phone: "",
// });
//   // ✅ Submit Handler
//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const payload = {
//       basicDetails: [
//         {
//           lookingToData: selected ? { id: 1, label: selected } : null,
//           alreadyPropertydata:
//             hasFoundProperty !== null
//               ? { id: hasFoundProperty ? 1 : 2, label: hasFoundProperty ? "Yes" : "No" }
//               : null,
//           firstTimeBuyer:
//             firstTimeBuyer !== null
//               ? { id: firstTimeBuyer ? 1 : 2, label: firstTimeBuyer ? "Yes" : "No" }
//               : null,
//           purchasePrice: purchasePrice || null,
//           realtorData:
//             hasRealtor !== null
//               ? { id: hasRealtor ? 1 : 2, label: hasRealtor ? "Yes" : "No" }
//               : null,
//           referredByRealtor:
//             referredByRealtor !== null
//               ? { id: referredByRealtor ? 1 : 2, label: referredByRealtor ? "Yes" : "No" }
//               : null,

//           // ✅ only include refinance/renew fields that were checked
//           refinanceRenewDetails: Object.entries(enabledFields).reduce(
//             (acc, [key, isEnabled]) => {
//               if (isEnabled) acc[key] = formData[key as keyof typeof formData];
//               return acc;
//             },
//             {} as Record<string, string>
//           ),
//         },
//       ],
//     };

//     console.log("📦 Payload:", payload);

//     try {
//       const res = await fetch("https://bdapi.testenvapp.com/api/v1/user-applications", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Failed to submit form");

//       const data = await res.json();
//       alert("Form submitted successfully!");
//     } catch (err) {
//       console.error("❌ Error submitting form:", err);
//       alert("Something went wrong while submitting!");
//     }
//   };

//   return (
//     <div>
// <div className="flex justify-between xs:flex-col xs:items-center items-center">
//         <span className="flex gap-2 ">
//           <span className="flex justify-center xs:justify-start xs:items-start items-center">
//             <Link href="/dashboard/application">
//               <IoMdArrowRoundBack className="xs:mt-1 dark:text-black " />
//             </Link>
//           </span>
//           <span className="flex flex-col">
//             <h1 className="text-[16px] text-[#111827] dark:text-black font-semibold">
//               Let’s get started with your application!
//             </h1>
//             <p className="text-[14px] flex flex-wrap dark:text-black  max-w-[91%]">
//               Track your current mortgage applications or start a new
//               one—everything you need in one place.
//             </p>
//           </span>
//         </span>
//         <span>
//           {isClient && (
//             <span className="flex flex-col-reverse dark:text-black  sm:flex-col-reverse items-end gap-2">
//               {/* Dots */}
//               <div className="flex gap-1">
//                 {Array.from({ length: totalSteps }).map((_, index) => (
//                   <div
//                     key={index}
//                     className={`h-1.5 w-5 rounded-full ${
//                       index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"
//                     }`}
//                   ></div>
//                 ))}
//               </div>

//               <h1 className="text-sm  text-black font-medium">
//                 {currentStep} of {totalSteps}
//               </h1>
//             </span>
//           )}
//         </span>

//       </div>
//     <div className="w-full min-w-full flex justify-center py-4">
//       <form
//         className="space-y-6 max-w-5xl bg-white rounded-[20px] py-8 px-6"
//         onSubmit={handleSubmit}
//       >
//         <LookingToDo
//           selected={selected}
//           setSelected={setSelected}
//           formData={formData}
//           setFormData={setFormData}
//           enabledFields={enabledFields}
//           setEnabledFields={setEnabledFields}
//           />

//         <FoundProperty
//           hasFoundProperty={hasFoundProperty}
//           setHasFoundProperty={setHasFoundProperty}
//           firstTimeBuyer={firstTimeBuyer}
//           setFirstTimeBuyer={setFirstTimeBuyer}
//           purchasePrice={purchasePrice}
//           setPurchasePrice={setPurchasePrice}
//         />

// <DownPayment
//   downPayment1={downPayment1}
//   setDownPayment1={setDownPayment1}
//   downPayment2={downPayment2}
//   setDownPayment2={setDownPayment2}
//   closingDate={closingDate}
//   setClosingDate={setClosingDate}
//   selectedUsage={selectedUsage}
//   setSelectedUsage={setSelectedUsage}
//   propertyAddress={propertyAddress}
//   setPropertyAddress={setPropertyAddress}
//   manualAddress={manualAddress}
//   setManualAddress={setManualAddress}
// />
// <RealtorDetails
//   hasRealtor={hasRealtor}
//   setHasRealtor={setHasRealtor}
//   referredByRealtor={referredByRealtor}
//   setReferredByRealtor={setReferredByRealtor}
//   realtorInfo={realtorInfo}
//   setRealtorInfo={setRealtorInfo}
// />
//         <SubmitButton />
//       </form>
//     </div>
//   </div>
//   );
// }

// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { FaDollarSign } from "react-icons/fa";
// import { PiCompassRoseFill } from "react-icons/pi";
// import { IoMdArrowRoundBack } from "react-icons/io";
// import { usePathname } from "next/navigation";
// const totalSteps = 7;
// interface LookingToData {
//   id: number;
//   label: string;
// }

// interface AlreadyPropertyData {
//   id: number;
//   label: string;
// }

// interface BasicDetails {
//   lookingToData: LookingToData;
//   alreadyPropertydata: AlreadyPropertyData;
//   downpayment: string;
//   propertyUsedData: any;
//   propertyAddress: string;
//   manualAdress: string;
//   realtorData: any;
//   propertyValue: string;
//   mortgageBalance: string;
//   firstPropertyData: any;
//   purchasePrice: string;
//   downPayment: string;
//   realtorReferData: any;
//   realtorFirstName: string;
//   realtorLastName: string;
//   realtorCompanyName: string;
//   realtorEmail: string;
//   realtorPhoneNumber: string;
//   currentState: string;
// }

// interface SelectedApplication {
//   basicDetails: BasicDetails[];
// }

// const page = () => {
//   const [selected, setSelected] = useState<string | null>(null);
//   const [hasFoundProperty, setHasFoundProperty] = useState(false);

//   const [referredByRealtor, setReferredByRealtor] = useState<null | boolean>(
//     null
//   );
//   const [hasRealtor, setHasRealtor] = useState<null | boolean>(null);
//   const [propertyValue, setPropertyValue] = useState("");
//   const [mortgageBalance, setMortgageBalance] = useState("");
//   const [renewalDate, setRenewalDate] = useState("");
//   const [downPayment1, setDownPayment1] = useState("");
// const [downPayment2, setDownPayment2] = useState("");
// const [closingDate, setClosingDate] = useState("");
// const [selectedUsage, setSelectedUsage] = useState("");
//   const handleRealtorSelection = (value: boolean) => {
//     setHasRealtor(value);
//   };

//   return (
//     <div>
//       {/* header */}

//       {/* main section */}

//       <div className="w-full min-w-full flex justify-center py-4">
//         <form className="space-y-6  max-w-3xl bg-white rounded-[20px] py-8 px-6">

//           {/* Looking to do */}
//           <div>
//             <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//               What are looking to do?*
//             </label>
//             <div className="flex items-center xs:flex-wrap justify-between py-2 gap-4">
//               <label
//                 className={`flex text-[16px] text-[#111827] items-center gap-2 ${
//                   selected === "buy" ? "font-semibold" : "font-normal"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="purpose"
//                   value="buy"

//                   className="border-blue-700 bg-red-700 w-[15px] h-[15px]"
//                 />
//                 Buy a Property
//               </label>

//               <label
//                 className={`flex text-[16px] text-[#111827] items-center gap-2 ${
//                   selected === "refinance" ? "font-semibold" : "font-normal"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="purpose"
//                   value="refinance"

//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 Refinance a Property
//               </label>

//               <label
//                 className={`flex text-[16px] text-[#111827] items-center gap-2 ${
//                   selected === "renew" ? "font-semibold" : "font-normal"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="purpose"
//                   value="renew"

//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 Renew a Mortgage
//               </label>
//             </div>
//           </div>

//           <hr className="text-black" />
//           {selected === "refinance" && (
//             <div className="flex gap-1 flex-col justify-between mt-4">
//               {/* Property Value */}
//               <div className="relative w-full">
//                 <label
//                   className={`block text-[#111827] text-[18px] mb-2 ${
//                     selected === "refinance" ? "font-semibold" : "font-normal"
//                   }`}
//                 >
//                   What's the value of your property?
//                 </label>
//                 <span>
//                   <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
//                 </span>
//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="e.g 540,000.00"
//                 />
//               </div>

//               {/* Mortgage Balance */}
//               <div className="relative mt-4 w-full">
//                 <label
//                   className={`block text-[#111827] text-[18px] mb-2 ${
//                     selected === "refinance" ? "font-semibold" : "font-normal"
//                   }`}
//                 >
//                   What's your mortgage balance?
//                 </label>
//                 <span>
//                   <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
//                 </span>
//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="e.g 540,000.00"
//                 />
//               </div>
//             </div>
//           )}

//           {selected === "renew" && (
//             <div className="flex gap-1 flex-col justify-between mt-4">
//               {/* Renewal Date */}
//               <div>
//                 <label
//                   className={`block text-[#111827] text-[18px] mb-2 ${
//                     selected === "renew" ? "font-semibold" : "font-normal"
//                   }`}
//                 >
//                   What is your renewal date?
//                 </label>
//                 <input
//                   type="date"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="2025-07-26"
//                 />
//               </div>

//               {/* Property Value */}
//               <div className="relative mt-4 w-full">
//                 <label
//                   className={`block text-[#111827] text-[18px] mb-2 ${
//                     selected === "renew" ? "font-semibold" : "font-normal"
//                   }`}
//                 >
//                   What's the value of your property?
//                 </label>
//                 <span>
//                   <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
//                 </span>
//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="e.g 540,000.00"
//                 />
//               </div>

//               {/* Mortgage Balance */}
//               <div className="relative mt-4 w-full">
//                 <label
//                   className={`block text-[#111827] text-[18px] mb-2 ${
//                     selected === "renew" ? "font-semibold" : "font-normal"
//                   }`}
//                 >
//                   What's your mortgage balance?
//                 </label>
//                 <span>
//                   <FaDollarSign className="absolute top-[57px] left-[8px] text-gray-500" />
//                 </span>
//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="e.g 540,000.00"
//                 />
//               </div>
//             </div>
//           )}

//           {/* 2. How many children in your group? */}
//           <div className="">
//             <div>
//               <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//                 Have you already found a property?*
//               </label>
//               <div className="flex xs:flex-wrap xs:gap-2 gap-12 xs:py-1 py-3">
//                 <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="purpose"
//                     value="buy"
//                     className="accent-blue-600 w-[15px] h-[15px]"

//                     checked={hasFoundProperty}
//                   />
//                   Yes, I’ve found a property
//                 </label>

//                 <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="purpose"
//                     value="refinance"
//                     className="accent-blue-600 w-[15px] h-[15px]"
//                     onChange={() => setHasFoundProperty(false)}
//                     checked={!hasFoundProperty}
//                   />
//                   No, I’m still looking
//                 </label>
//               </div>
//             </div>

//             {/* Conditional Question 2 */}
//             {hasFoundProperty && (
//               <>
//                 <div>
//                   <hr className="text-black my-4" />
//                   <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//                     Great! Is this the first property you've purchased?*
//                   </label>
//                   <div className="flex items-center py-2 gap-4">
//                     <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                       <input
//                         type="checkbox"
//                         name="firstTime"
//                         value="yes"
//                         className="accent-blue-600 w-[15px] h-[15px]"
//                       />
//                       Yes
//                     </label>
//                     <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                       <input
//                         type="checkbox"
//                         name="firstTime"
//                         value="no"
//                         className="accent-blue-600 w-[15px] h-[15px]"
//                       />
//                       No
//                     </label>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <label className="block font-semibold text-[#111827] text-[18px]  mb-2">
//                     What's the purchase price?
//                   </label>
//                   <div className="relative">
//                     <span>
//                       <FaDollarSign className="absolute top-[21.5px] left-[8px]" />
//                     </span>
//                     <input
//                       type="number"
//                       className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                       placeholder="e.g 540,000.00"
//                     />
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//           <hr className="text-black my-4" />

//           {hasFoundProperty === false && (
//             <div>
//               <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//                 What's the purchase price you're considering?
//               </label>
//               <div className="relative">
//                 <FaDollarSign className="absolute top-[22px] left-[12px] text-gray-500" />
//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="e.g 540,000.00"
//                 />
//               </div>
//             </div>
//           )}

//           {/* 4. Where is the trip going? */}

//           <div>
//             <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//               How much down payment do you have?
//             </label>
//             <div className="flex xs:flex-col gap-1 justify-between">
//               <div className="relative min-w-[49%] xs:min-w-[100%] max-w-[50%]">
//                 <span>
//                   <FaDollarSign className="absolute top-[21.5px] left-[8px]" />
//                 </span>
//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="e.g 540,000.00 "
//                 />
//               </div>
//               <div className="relative xs:min-w-[100%] min-w-[49%] max-w-[50%]">
//                 <span>
//                   <FaDollarSign className="absolute top-[21.5px] left-[8px]" />
//                 </span>
//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="e.g 540,000.00"
//                 />
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//               When's the closing date?
//             </label>

//             <input
//               type="date"
//               className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
//               placeholder="2025-007-26"
//             />
//           </div>

//           <hr className="text-black my-4" />
//           <div>
//             <label className="block font-semibold text-[18px] text-[#111827] mb-2">
//               How is this Property used?
//             </label>

//             <div className="flex xs:flex-wrap gap-12 xs:gap-2 py-2">
//               <label
//                 className={`flex text-[16px] text-[#111827] items-center gap-2 ${
//                   selectedUsage === "live" ? "font-semibold" : "font-normal"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="usage"
//                   value="live"

//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 I’m going to live in it
//               </label>

//               <label
//                 className={`flex text-[16px] text-[#111827] items-center gap-2 ${
//                   selectedUsage === "liveRent" ? "font-semibold" : "font-normal"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="usage"
//                   value="liveRent"

//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 I will live in it and also rent out some of it
//               </label>
//             </div>

//             <div className="flex xs:flex-wrap xs:gap-2 gap-12 py-2">
//               <label
//                 className={`flex text-[16px] text-[#111827] items-center gap-2 ${
//                   selectedUsage === "rent" ? "font-semibold" : "font-normal"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="usage"
//                   value="rent"

//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 I will rent it out exclusively
//               </label>

//               <label
//                 className={`flex text-[16px] text-[#111827] items-center gap-2 ${
//                   selectedUsage === "secondHome"
//                     ? "font-semibold"
//                     : "font-normal"
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   name="usage"
//                   value="secondHome"

//                   className="accent-blue-600 w-[15px] h-[15px]"
//                 />
//                 It’s going to be my second home
//               </label>
//             </div>
//           </div>
//           <hr className="text-black my-8" />

//           {/* 6. What is the outing date? */}
//           <div>
//             <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//               What’s the property address?
//             </label>
//             <div className="relative">
//               <span>
//                 <PiCompassRoseFill className="absolute top-[22px] left-[11px]" />
//               </span>
//               <input
//                 type="number"
//                 className="w-full border rounded-full pl-8 text-black dark:text-black  border-gray-300 mt-2 px-4 py-2"
//                 placeholder="Start typing the address"
//               />
//             </div>
//             <span className="flex xs:flex-col text-[16px] text-black font-normal  justify-between my-4">
//               <p>Can’t find the address</p>

//               <p className="text-[#013E8C] xs:mt-2 xs:border-0 border-b-2 border-b-[#013E8C] font-semibold">
//                 Typing Manually?
//               </p>
//             </span>
//           </div>
//           <hr className="text-black " />

//           <div className="">
//             {/* Question 1 */}
//             <div>
//               <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//                 Do you have a realtor?
//               </label>
//               <div className="flex gap-4">
//                 <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="hasRealtor"
//                     className="accent-blue-600 w-[15px] h-[15px]"
//                     checked={hasRealtor === true}
//                     onChange={() => {
//                       setHasRealtor(true);
//                       setReferredByRealtor(null); // reset next step
//                     }}
//                   />
//                   Yes
//                 </label>
//                 <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                   <input
//                     type="checkbox"
//                     name="hasRealtor"
//                     className="accent-blue-600 w-[15px] h-[15px]"
//                     checked={hasRealtor === false}
//                     onChange={() => {
//                       setHasRealtor(false);
//                       setReferredByRealtor(null); // reset next step
//                     }}
//                   />
//                   No
//                 </label>
//               </div>
//             </div>

//             {/* Conditional Question 2 */}
//             {hasRealtor && (
//               <div className="mt-4">
//                 <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//                   Did your realtor refer you to us?
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                     <input
//                       type="checkbox"
//                       name="realtorReferral"
//                       className="accent-blue-600 w-[15px] h-[15px]"
//                       checked={referredByRealtor === true}
//                       onChange={() => setReferredByRealtor(true)}
//                     />
//                     Yes
//                   </label>
//                   <label className="flex text-[16px] text-[#111827] font-medium items-center gap-2">
//                     <input
//                       type="checkbox"
//                       name="realtorReferral"
//                       className="accent-blue-600 w-[15px] h-[15px]"
//                       onChange={() => setReferredByRealtor(false)}
//                     />
//                     No
//                   </label>
//                 </div>
//               </div>
//             )}
//           </div>

//           {hasRealtor && referredByRealtor === true && (
//             <div>
//               <label className="block font-semibold text-[#111827] text-[18px] mb-2">
//                 Who is your realtor?
//               </label>
//               <div className="flex gap-1 mt-4 justify-between">
//                 <div className="relative  min-w-[49%] max-w-[50%]">
//                   <label
//                     htmlFor=""
//                     className="text-[16px] text-[#111827] font-medium"
//                   >
//                     Realtor's first name
//                   </label>

//                   <input
//                     type="number"
//                     className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                     placeholder="Realtor’s first name"
//                   />
//                 </div>
//                 <div className="relative min-w-[49%] max-w-[50%]">
//                   <label
//                     htmlFor=""
//                     className="text-[16px] text-[#111827] font-medium"
//                   >
//                     Realtor's last name
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                     placeholder="Realtor’s Last name"
//                   />
//                 </div>
//               </div>
//               <div className="relative w-full mt-4">
//                 <label
//                   htmlFor=""
//                   className="text-[16px] text-[#111827] font-medium"
//                 >
//                   Realtor's Company name
//                 </label>

//                 <input
//                   type="number"
//                   className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                   placeholder="Realtor’s Company name"
//                 />
//               </div>

//               <div className="flex gap-1 mt-4 justify-between">
//                 <div className="relative min-w-[49%] max-w-[50%]">
//                   <label
//                     htmlFor=""
//                     className="text-[16px] text-[#111827] font-medium"
//                   >
//                     Realtor's email
//                   </label>

//                   <input
//                     type="number"
//                     className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                     placeholder="Realtor’s email"
//                   />
//                 </div>
//                 <div className="relative min-w-[49%] max-w-[50%]">
//                   <label
//                     htmlFor=""
//                     className="text-[16px] text-[#111827] font-medium"
//                   >
//                     Realtor's phone number
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full border rounded-full pl-8 border-gray-300 mt-2 px-4 py-2"
//                     placeholder="Realtor’s phone number"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* 11. Submit Button */}
//           <div className="text-right w-full">
//             <Link href="/dashboard/application/step2">
//               <button
//                 type="submit"
//                 className="bg-[#013E8C] text-white font-semibold min-w-full py-3 rounded-full"
//               >
//                 Continue
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default page;
