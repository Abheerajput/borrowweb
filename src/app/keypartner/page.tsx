"use client";
import React, { useState } from "react";
import loginimg from "../../../public/assets/loginimg.png";
import google from "../../../public/assets/google.png";
import logo from "../../../public/assets/logo.png";
import fb from "../../../public/assets/fb.png";
import backgroundimg from "../../../public/assets/backgroundimg.webp";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [selected, setSelected] = useState<string>("");

  const options = ["Lawyer", "Accountant", "Realtor", "Others"];
  return (
    <>
      <div className="px-[5%] bg-white py-[2%] flex  xs:flex-col w-full min-h-screen">
        <div className="flex xs:flex-col w-1/2 xs:hidden  xs:min-w-full gap-6">
          <div
            className="backgroundimg xs:min-w-[100%]  min-w-full min-h-screen  rounded-[30px] bg-cover bg-center flex items-start justify-center relative"
            style={{ backgroundImage: `url(${backgroundimg.src})` }}
          >
            <div className="flex flex-col pt-4 px-[5%] gap-6">
              <div className="">
                <Image src={logo} alt="" />
              </div>
              <div className="flex flex-col gap-4 ">
                <h1 className="text-[32px] text-white font-medium">
                  Join BORROW and Take Control of Your Mortgage Experience
                </h1>
                <p className="text-[18px] text-white font-normal">
                  Create your account to explore personalized mortgage offers,
                  apply with ease, and stay connected with top lenders.
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 xs:min-w-[100%]  flex justify-center"></div>
        </div>
        <div className="flex flex-col xs:min-w-full w-1/2 items-center xs:min-h-full min-h-screen px-[5%] py-[4%] bg-white">
          <h1 className="text-[27px] font-semibold mb-4 text-[#000000] text-center mt-10">
            Are You an Existing Customer?
          </h1>

          {options.map((option) => (
            <label
              key={option}
              className={`flex items-center mb-4 px-4 justify-between border rounded-lg min-w-full py-3 cursor-pointer transition
            ${
              selected === option
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 bg-white"
            }
          `}
            >
              <span className="text-gray-800">{option}</span>
              <input
                type="radio"
                name="role"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="hidden"
              />
              <span
                className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                  selected === option ? "border-blue-600" : "border-gray-400"
                }`}
              >
                {selected === option && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </span>
            </label>
          ))}

          <div className="w-full flex flex-col items-center ">
            <Link
              href={{
                pathname: "/login",
                query: { type: "keypartner" },
              }}
              className="w-full"
            >
              <button className="bg-[#013E8C] cursor-pointer text-white font-semibold px-12 py-2 w-full rounded-full mt-4">
                Next
              </button>
            </Link>

            <p className="text-black font-light mt-4">
              Already have an account?{" "}
              <span className="text-[#013E8C] font-light">Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
