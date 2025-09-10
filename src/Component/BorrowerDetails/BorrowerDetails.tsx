"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
const totalSteps = 7;

interface BorrowerDetailsProps {
  borrowerName?: string;
  onBack: () => void;
}

const BorrowerDetails: React.FC<BorrowerDetailsProps> = ({
  borrowerName,
  onBack,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    cellPhone: "",
    homePhone: "",
    workPhone: "",
    dob: "",
    maritalStatus: "",
    ssn: "",
    dependents: "",
    address: "",
    propertyUse: "",
    purchasePrice: "",
    moveInMonth: "",
    moveInYear: "",
  });

  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;

useEffect(() => {
  if (typeof window !== "undefined") {
    const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "null");
    if (storedApp && storedApp.borrowers) {
      const borrowerIndex = borrowerName
        ? parseInt(borrowerName.replace("Borrower ", ""), 10) - 1
        : 0;

      const borrowerData = storedApp.borrowers[borrowerIndex]?.BorrowersData?.[`borrower${borrowerIndex + 1}`];

      if (borrowerData) {
        setFormData({
          firstName: borrowerData.firstName || "",
          middleName: borrowerData.middleName || "",
          lastName: borrowerData.lastName || "",
          email: borrowerData.email || "",
          cellPhone: borrowerData.cellPhone || "",
          homePhone: borrowerData.homePhone || "",
          workPhone: borrowerData.workPhone || "",
          dob: borrowerData.dateOfBirth || "",
          maritalStatus: borrowerData.maritialStatus || "",
          ssn: borrowerData.sinNumber || "",
          dependents: borrowerData.numOfDependents || "",
          address: borrowerData.manualAddress || "",
          propertyUse: borrowerData.living?.label || "",
          purchasePrice: borrowerData.rent || "",
          moveInMonth: borrowerData.startLiving
            ? new Date(borrowerData.startLiving).getMonth() + 1 + ""
            : "",
          moveInYear: borrowerData.startLiving
            ? new Date(borrowerData.startLiving).getFullYear() + ""
            : "",
        });
      }
    }
  }
}, [borrowerName]);

  // ✅ When updating formData
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const updatedForm = { ...formData, [e.target.name]: e.target.value };
  setFormData(updatedForm);

  const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");
  if (!storedApp.borrowers) storedApp.borrowers = [];

  const borrowerIndex = borrowerName
    ? parseInt(borrowerName.replace("Borrower ", ""), 10) - 1
    : 0;

  // ✅ enforce correct structure
  storedApp.borrowers[borrowerIndex] = {
    BorrowersData: {
      [`borrower${borrowerIndex + 1}`]: {
        firstName: updatedForm.firstName,
        middleName: updatedForm.middleName,
        lastName: updatedForm.lastName,
        email: updatedForm.email,
        cellPhone: updatedForm.cellPhone,
        homePhone: updatedForm.homePhone,
        workPhone: updatedForm.workPhone,
        sinNumber: updatedForm.ssn, // ✅ map field correctly
        manualAddress: updatedForm.address,
        rent: updatedForm.purchasePrice, // or rent if you have separate
        dateOfBirth: updatedForm.dob,
        maritialStatus: updatedForm.maritalStatus,
        numOfDependents: updatedForm.dependents,
        googleAdress: "", // leave blank for now
        living: updatedForm.propertyUse
          ? { id: 1, label: updatedForm.propertyUse }
          : null,
        startLiving: `${updatedForm.moveInYear}-${updatedForm.moveInMonth}-01`, // or your format
      },
    },
  };

  storedApp.currentState = currentStep;
  localStorage.setItem("selectedApplication", JSON.stringify(storedApp));
};

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const updatedForm = { ...formData, [e.target.name]: e.target.value };
//     setFormData(updatedForm);
// console.log("Updated:", e.target.name, "=", e.target.value);
// console.log("Full formData:", updatedForm);

//     const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");
//     if (!storedApp.borrowers) storedApp.borrowers = [];

//     const borrowerIndex = borrowerName
//       ? parseInt(borrowerName.replace("Borrower ", ""), 10) - 1
//       : 0;

//     storedApp.borrowers[borrowerIndex] = updatedForm;
//     storedApp.currentState = currentStep; // keep progress updated

//     localStorage.setItem("selectedApplication", JSON.stringify(storedApp));
//   };

  // ✅ Submit sends the full array to API
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const applicationId = localStorage.getItem("applicationId");
  if (!applicationId) {
    toast.error("❌ Application ID not found in localStorage!");
    return;
  }

  const storedApp = JSON.parse(localStorage.getItem("selectedApplication") || "{}");

  const payload = {
    applicationId,
    currentState: currentStep,
    borrowers: storedApp.borrowers || [],
  };

  console.log("📦 Final Payload:", payload);

  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      "https://bdapi.testenvapp.com/api/v1/user-applications/update",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `${token}` } : {}),
        },
      }
    );

    if (res.status === 200 || res.status === 201) {
      toast.success("Form updated successfully!");
    } else {
      toast.error(`❌ Update failed! Status: ${res.status}`);
    }
  } catch (err) {
    toast.error("❌ Error updating form:");
  }
};




  return (
    <div className="min-h-screen min-w-full flex flex-col ">
      <div className="flex justify-between">
        <span className="flex gap-2 ">
          <span className="flex justify-center gap-2 items-center">
            <Link href="/dashboard/application/step1">
              <IoMdArrowRoundBack />
            </Link>
            Borrowers
          </span>
        </span>

        {isClient && (
          <span className="flex flex-col-reverse items-end gap-2">
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
        <div className="bg-white mt-8 shadow-md rounded-xl p-6 w-full  max-w-3xl">
          <h2 className="text-xl font-semibold text-black mb-6 border-b-2 border-[#013E8C] pb-1">
            Tell us about the borrowers
          </h2>

          <div className="mb-4">
            <input
              type="text"
              value={borrowerName}
              disabled
              className="w-full border rounded-md px-3 py-2 text-black bg-gray-100 "
            />
          </div>

          <label
            htmlFor=""
            className="block font-semibold text-[#111827] text-[18px] "
          >
            Enter your name
          </label>
          <div className="grid xs:grid-cols-1 sm:grid-cols-3 grid-cols-3 gap-4 mb-4">
            <input
              name="firstName"
              placeholder="First name"
              value={formData.firstName} 
              className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
              onChange={handleChange}
            />
            <input
              name="middleName"
              placeholder="Middle name"
              value={formData.middleName} 
              className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={formData.lastName} 
              className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label
              htmlFor=""
              className="block font-semibold text-[#111827] text-[18px]"
            >
              Enter your email
            </label>
            <input
              name="email"
              placeholder="example@email.com"
              value={formData.email} 
              className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
              onChange={handleChange}
            />
          </div>

          <div className="grid xs:grid-cols-1  grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor=""
                className="block font-semibold text-[#111827] text-[18px] "
              >
                Cell phone number
              </label>
              <input
                name="cellPhone"
                placeholder="Cell phone number"

                className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
                 value={formData.cellPhone}   // 🔹 always read from state
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block font-semibold text-[#111827] text-[18px] "
              >
                Home phone number
              </label>

              <input
                name="homePhone"
                placeholder="Home phone number"
                className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
                onChange={handleChange}
                value={formData.homePhone}   // 🔹 always read from state
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="block font-semibold text-[#111827] text-[18px] "
              >
                Work phone number
              </label>

              <input
                name="workPhone"
                placeholder="Work phone number"
                className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
                onChange={handleChange}
                value={formData.workPhone}   // 🔹 always read from state
              />
            </div>
          </div>

          <hr className="text-black my-8" />

          <div className="grid grid-cols-2 xs:grid-cols-1  gap-4 mb-4">
            <span className="flex flex-col ">
              <label
                htmlFor=""
                className="block font-semibold text-[#111827] text-[18px]"
              >
                Date of birth
              </label>
              <input
                name="dob"
                placeholder="23-12-2000"
                type="date"
                className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
                onChange={handleChange}
                value={formData.dob}   // 🔹 always read from state
              />
            </span>
            <span className="flex flex-col">
              <label
                htmlFor=""
                className="block font-semibold text-[#111827] text-[18px]"
              >
                Marital Status
              </label>
              <select
                name="maritalStatus"
                className="w-full border rounded-full text-black  px-4 border-gray-300 mt-2  py-2"
                onChange={handleChange}
                value={formData.maritalStatus}   // 🔹 always read from state
              >
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            </span>
          </div>

          <div className="grid xs:grid-cols-1   grid-cols-2 gap-4 mb-4 mt-4">
            <span className="flex flex-col">
              <label
                htmlFor=""
                className="block font-semibold text-[#111827] text-[18px]"
              >
                Social Insurance Number
              </label>
              <input
                name="ssn"
                placeholder="Social Insurance Number"
                className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
                onChange={handleChange}
                value={formData.ssn}   // 🔹 always read from state
              />
            </span>
            <span className="flex flex-col">
              <label
                htmlFor=""
                className="block font-semibold text-[#111827] text-[18px]"
              >
                Number of Dependents
              </label>
              <input
                name="dependents"
                placeholder="Number of Dependents"
                className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
                onChange={handleChange}
                value={formData.dependents}   // 🔹 always read from state
              />
            </span>
          </div>

          <span>
            <label
              htmlFor=""
              className="block font-semibold text-[#111827] text-[18px] my-4"
            >
              Where do tou live?
            </label>
          </span>

          <div className="mb-4 flex flex-col">
            <label
              htmlFor=""
              className="block font-semibold text-[#111827] text-[18px] mb-2"
            >
              What is the property’s address?
            </label>
            <input
              name="address"
              placeholder="Property address"
              className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
              onChange={handleChange}
              value={formData.address}   // 🔹 always read from state
            />
          </div>

        <div className="mb-4">
  <label className="block font-semibold text-[#111827] text-[18px] mb-2">
    How is this property used?
  </label>
<div className="flex gap-4 xs:flex-wrap xs:flex-col text-[#111827] flex-wrap">
{["I own it", "I live with my parents", "I rent", "Other"].map((option) => (
  <label
    key={option}
    className={`flex items-center cursor-pointer px-3 py-1 rounded-full ${
      formData.propertyUse === option
        ? "bg-blue-100 border border-blue-600 font-semibold"
        : "border border-gray-300 font-normal"
    }`}
  >
    <input
      type="radio"
      name="propertyUse"
      value={option}
      checked={formData.propertyUse === option}
      onChange={handleChange}   // ✅ use handleChange here
      className="hidden"
    />
    {option}
  </label>
))}

</div>

</div>


          <div className="mb-4 mt-4 flex flex-col">
            <label
              htmlFor=""
              className="block font-semibold text-[#111827] text-[18px] mb-2"
            >
              What's the purchase price?
            </label>
            <input
              name="purchasePrice"
              placeholder="$ e.g 540,000.00"
              className="w-full border rounded-full  text-black border-gray-300  px-4 py-2"
              onChange={handleChange}
              value={formData.purchasePrice}   // 🔹 always read from state
            />
          </div>

          <div className="grid  xs:grid-cols-1 grid-cols-1 gap-4 mb-4">
            <span>
              <label
                htmlFor=""
                className="flex flex-col font-semibold text-[#111827] text-[18px] mb-2"
              >
                When did you start living here?
                <span className="font-normal text-[#111827] text-[15px]">
                  (If you're not sure, just estimate)
                </span>
              </label>
            </span>
        <span className="grid xs:grid-cols-1 grid-cols-2 gap-4 mb-4">
  {/* Month Dropdown */}
  <div className="relative">
    <select
      name="moveInMonth"
      // CLEANED UP PADDING: pl-4 for left, pr-10 for right (to make room for the icon)
      className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
        value={formData.moveInMonth} 
    >
      <option value="">Month</option>
      {[
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ].map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
    {/* Custom Dropdown Arrow Icon */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </div>
  </div>

  {/* Year Dropdown */}
  <div className="relative">
    <select
      name="moveInYear"
      // CLEANED UP PADDING: pl-4 for left, pr-10 for right
      className="w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleChange}
      value={formData.moveInYear}   // ✅ controlled value

    >
      <option value="">Year</option>
      {Array.from({ length: 10 }, (_, i) => {
        const year = new Date().getFullYear() + i;
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      })}
    </select>
    {/* Custom Dropdown Arrow Icon */}
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
      <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
      </svg>
    </div>
  </div>
</span>
          </div>

          <div className="flex  w-full justify-between mt-6">
            <button className="text-[#F92C2C] border border-[#F92C2C] min-w-[48%] px-6 py-2 rounded-full hover:bg-red-100">
              Delete
            </button>
            <button 
            onClick={handleSubmit}
            type="submit"
            className="bg-[#013E8C] min-w-[48%] text-white px-6 py-2 rounded-full hover:bg-[#002e6b]">
              Update
            </button>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default BorrowerDetails;
