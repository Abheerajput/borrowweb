"use client";
import React from "react";
import backgroundimg from "../../../public/assets/backgroundimg.webp";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import borrow from "../../../public/assets/Borrower.png";
import Lender from "../../../public/assets/Lender.png";
import lawyer from "../../../public/assets/lawyer.png";
import keypartner from "../../../public/assets/KeyPartner.png";
import Link from "next/link";
const page = () => {
  return (
    <>
      <div className="px-[5%] py-[2%] flex xs:flex-col  w-full h-screen">
        <div className="flex xs:flex-col xs:min-w-full max-w-1/2 mt-[4%]   min-h-screen gap-6">
          <div
            className="backgroundimg xs:min-w-[100%] max-w-[88%] min-h-[700px]  rounded-[30px] bg-cover bg-center flex items-start justify-center relative"
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
        </div>
        <div className="flex xs:min-w-full  max-w-[59%] justify-center">
          <div className="flex flex-col gap-2 w-full sm:p-4 p-10 items-center ">
            <span className="flex flex-col  items-center">
              <h2 className="text-[34px] font-semibold text-[#111827]">
                Choose Your Role to
              </h2>
              <p className="text-[27px] font-semibold text-[#013E8C] cursor-pointer">
                Get Started
              </p>
            </span>
            <p className="text-[#595959] pb-4 font-medium text-center">
              Identify yourself as a Borrower, Lender, Lawyer, or Referral
              Partner to streamline your journey and access tailored features.
            </p>

            <div className=" grid grid-cols-2  xs:grid-cols-1 gap-6 sm:gap-4">
              <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
                <Image src={borrow} alt="" />
                <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
                  Borrower
                </span>
                <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
                  Find the perfect loan for your dream home
                </span>
                <span className=" text-black px-4 py-2 rounded-lg w-full cursor-pointer">
                  <Link
                    href={{
                      pathname: "/login",
                      query: { type: "Borrower" },
                    }}
                    className="bg-[#FFFFFF]  py-2  rounded-full min-w-full"
                  >
                    <button
                      className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full"
                    >
                      Get Started
                    </button>
                  </Link>
                </span>
              </span>

              <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
                <Image src={Lender} alt="" />
                <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
                  Lender
                </span>
                <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
                  Connect with qualified borrowers instantly
                </span>
                <span className=" text-black   px-4 py-2 rounded-lg w-full cursor-pointer">
                  
                  <Link
                    href={{
                      pathname: "/login",
                      query: { type: "Lender" },
                    }}
                    className="bg-[#FFFFFF]  py-2  rounded-full min-w-full"
                  >
                    <button
                      className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full"
                    >
                      Get Started
                    </button>
                  </Link>
                </span>
              </span>

              <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
                <Image src={lawyer} alt="" />
                <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
                  Lawyer
                </span>
                <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
                  Provide legal support for real estate transactions
                </span>
                <span className=" text-black   px-4 py-2 rounded-lg w-full cursor-pointer">
                  <Link
                    href={{
                      pathname: "/login",
                      query: { type: "Lawyer" },
                    }}
                   className="bg-[#FFFFFF]  py-2  rounded-full min-w-full">
                    <button
                    
                      className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full">
                      Get Started
                    </button>
                  </Link>
                </span>
              </span>

              <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
                <Image src={keypartner} alt="" />
                <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
                  Key Partner
                </span>
                <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
                  Earn rewards through our referral program
                </span>
                <span className=" text-black   px-4 py-2 rounded-lg w-full cursor-pointer">
                  <Link
                   href={{
                      pathname: "/keypartner",
                    }}
                    className="bg-[#FFFFFF]  py-2  rounded-full min-w-full">
                   <button
                      className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full">
                      Get Started
                    </button>
                  </Link>
                </span>
              </span>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default page;
