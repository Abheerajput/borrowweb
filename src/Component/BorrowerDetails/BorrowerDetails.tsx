"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
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
    setIsClient(true);
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
              onChange={handleChange}
            />
            <input
              name="middleName"
              placeholder="Middle name"
              className="w-full border rounded-full text-black border-gray-300 mt-2 px-4 py-2"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last name"
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
                name="tel"
                placeholder="Cell phone number"
                className="w-full border rounded-full text-black  border-gray-300 mt-2 px-4 py-2"
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
        className={`flex items-center gap-2 ${
          formData.propertyUse === option ? "font-semibold" : "font-normal"
        }`}
      >
        <input
          type="checkbox"
          name="propertyUse"
          value={option}
          className="accent-blue-600 w-[15px] h-[15px]"
          checked={formData.propertyUse === option}
          onChange={handleChange}
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
                  className="w-full border rounded-full text-black  border-gray-300 px-4 py-2 appearance-none"
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Dropdown */}
              <div className="relative">
               
                <select
                  name="moveInYear"
                  className="w-full border rounded-full text-black  border-gray-300 px-4 py-2 appearance-none"
                  onChange={handleChange}
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
              </div>
            </span>
          </div>

          <div className="flex  w-full justify-between mt-6">
            <button className="text-[#F92C2C] border border-[#F92C2C] min-w-[48%] px-6 py-2 rounded-full hover:bg-red-100">
              Delete
            </button>
            <button className="bg-[#013E8C] min-w-[48%] text-white px-6 py-2 rounded-full hover:bg-[#002e6b]">
              Update
            </button>
          </div>

          {/* <div className="mt-4 text-center">
        <button onClick={onBack} className="text-sm text-blue-600 underline">
          ← Back to Borrowers
        </button>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default BorrowerDetails;
