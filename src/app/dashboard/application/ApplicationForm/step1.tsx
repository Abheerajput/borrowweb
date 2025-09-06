// "use client";
// import { useState } from "react";
// import LookingToDo from "./LookingToDo";
// import RefinanceFields from "./RefinanceFields";
// import RenewFields from "./RenewFields";
// import FoundProperty from "./FoundProperty";
// import RealtorDetails from "./RealtorDetails";
// import SubmitButton from "./SubmitButton";

// export default function ApplicationForm() {
//   const [selected, setSelected] = useState<string>("");
//   const [hasRealtor, setHasRealtor] = useState(null);
//   const [referredByRealtor, setReferredByRealtor] = useState(null);
// const [hasFoundProperty, setHasFoundProperty] = useState<boolean>(false);
//   // ✅ Submit Handler
//   const handleSubmit = async (e:any) => {
//     e.preventDefault();

//     // prepare payload
//     const payload = {
//       basicDetails: [
//         {
//           lookingToData: selected
//             ? { id: 1, label: selected }
//             : null,
//           alreadyPropertydata:
//             hasFoundProperty !== null
//               ? { id: hasFoundProperty ? 1 : 2, label: hasFoundProperty ? "Yes" : "No" }
//               : null,
//           realtorData:
//             hasRealtor !== null
//               ? { id: hasRealtor ? 1 : 2, label: hasRealtor ? "Yes" : "No" }
//               : null,
//           referredByRealtor:
//             referredByRealtor !== null
//               ? { id: referredByRealtor ? 1 : 2, label: referredByRealtor ? "Yes" : "No" }
//               : null,
//         },
//       ],
//     };

//     try {
//       const res = await fetch("https://bdapi.testenvapp.com/api/v1/user-applications", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to submit form");
//       }

//       const data = await res.json();
//       alert("Form submitted successfully!");
//     } catch (err) {
//       console.error("❌ Error submitting form:", err);
//       alert("Something went wrong while submitting!");
//     }
//   };

//   return (
//     <div className="w-full min-w-full flex justify-center py-4">
//       <form
//         className="space-y-6 max-w-5xl bg-white rounded-[20px] py-8 px-6"
//         onSubmit={handleSubmit}
//       >
//        <LookingToDo selected={selected} setSelected={setSelected} />

//         {selected === "refinance" && <RefinanceFields />}
//         {selected === "renew" && <RenewFields />}

//       <FoundProperty
//         hasFoundProperty={hasFoundProperty}
//         setHasFoundProperty={setHasFoundProperty}
//       />

//         {/* ... other sections like DownPayment, Address, etc. */}

//         <RealtorDetails
//           hasRealtor={hasRealtor}
//           setHasRealtor={setHasRealtor}
//           referredByRealtor={referredByRealtor}
//           setReferredByRealtor={setReferredByRealtor}
//         />

//         <SubmitButton />
//       </form>
//     </div>
//   );
// }

