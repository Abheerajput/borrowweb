"use client";
import React from "react";
import backgroundimg from "../../../public/assets/backgroundimg.webp";
import logo from "../../../public/assets/logo3.png";
import Image from "next/image";
import borrow from "../../../public/assets/borrow2.webp";
import Lender from "../../../public/assets/lender2.png";
import lawyer from "../../../public/assets/lawyer2.png";
import keypartner from "../../../public/assets/keypartner2.png";
import Link from "next/link";

const Page = () => {
  return (
    <>
      {/* 
        Main container: 
        - Uses min-h-screen to ensure it fills the viewport height without causing overflow.
        - flex-col for mobile (default), and lg:flex-row for large screens.
      */}
<div className="flex xs:flex-col flex-row w-full px-[2%] min-h-screen overflow-y-visible bg-white">
        <div className="w-[40%] py-[1%] xs:hidden xs:max-h-screen xs:w-full">
<div className='backgroundimg w-full   min-h-full rounded-xl bg-cover bg-center flex flex-col justify-start items-center px-6'style={{ backgroundImage: `url(${backgroundimg.src})` }}>
 <div className="flex flex-col w-full xs:max-h-[50vh] xs:min-h-[49vh] max-w-lg gap-6 pt-4">
              <div className="">
                              <Image src={logo} alt="Borrow Logo" className="w-auto h-[50px]" />
              </div>
              <div className="flex flex-col gap-4">
                {/* Responsive font sizes */}
                <h1 className="xs:text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-white font-medium">
                  Join BORROW and Take Control of Your Mortgage Experience
                </h1>
                <p className="xs:text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px] text-white font-normal">
                  Create your account to explore personalized mortgage offers,
                  apply with ease, and stay connected with top lenders.
                </p>
              </div>
            </div>
</div>
</div>

        {/* Right Side: Role Selection */}
        <div className="w-[60%] xs:w-full px-[4%]  bg-white min-h-screen flex items-center justify-center">
          <div className="flex flex-col gap-2 w-full p-6  items-center">
            <div className="flex flex-col gap-0 items-center text-center">
              {/* Responsive font sizes */}
              <h2 className="xs:text-[15px] sm:text-[18px] md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold text-[#111827]">
                Choose Your Role to
              </h2>
              <p className="xs:text-[13px] sm:text-[18px] md:text-[18px] lg:text-[18px] xl:text-[18px] font-semibold text-[#013E8C]">
                Get Started
              </p>
            </div>
            <p className="text-[#595959] flex flex-wrap xs:min-w-[100px]  py-2 max-w-[500px] xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px]  font-medium text-center ">
              Identify yourself as a Borrower, Lender, Lawyer, or Referral
              Partner to streamline your journey and access tailored features.
            </p>

            {/* 
              Responsive Grid:
              - 1 column on mobile (default).
              - 2 columns on small screens (sm) and up.
            */}
            <div className="grid xs:grid-cols-1  grid-cols-2 gap-6 w-full max-w-lg">
              {/* Card 1: Borrower */}
              <div className="flex flex-col rounded-3xl bg-[#DBEAFE] hover:bg-[#d0e1fc] transition-colors items-center justify-between text-center p-4">
                <Image src={borrow} alt="Borrower" className="w-auto max-w-[50px]  max-h-[50px]" />
                <h3 className="text-black font-medium xs:text-[12px] sm:text-[14px] md:text-[16px]  lg:text-[20px] xl:text-[22px]  py-1">
                  Borrower
                </h3>
                <p className="text-[#4D5259] px-2 xs:text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[17px]">
                  Find the perfect loan for your dream home
                </p>
                <div className="w-full pt-2">
                  <Link
                    href={{ pathname: "/login", query: { type: "Borrower" } }}
                    className="block w-full text-center bg-white py-2.5 xs:text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px]  rounded-full text-[#013E8C] font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Card 2: Lender */}
              <div className="flex flex-col  rounded-3xl bg-[#DBEAFE] hover:bg-[#d0e1fc] transition-colors items-center justify-between text-center p-4">
                <Image src={Lender} alt="Lender" className="w-auto max-w-[50px]  max-h-[50px]"/>
                <h3 className="text-black font-medium xs:text-[12px] sm:text-[14px] md:text-[16px]  lg:text-[20px] xl:text-[22px]  py-1">
                  Lender
                </h3>
                <p className="text-[#4D5259] px-2 xs:text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[17px]  ">
                  Connect with qualified borrowers instantly
                </p>
                <div className="w-full pt-2">
                  <Link
                    href={{ pathname: "/login", query: { type: "Lender" } }}
                    className="block w-full text-center bg-white py-2.5 xs:text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] rounded-full text-[#013E8C] font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Card 3: Lawyer */}
              <div className="flex flex-col rounded-3xl bg-[#DBEAFE] hover:bg-[#d0e1fc] transition-colors items-center justify-between text-center p-4">
                <Image src={lawyer} alt="Lawyer"  className="w-auto max-w-[50px]  max-h-[50px]"/>
                <h3 className="text-black font-medium xs:text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[22px]  py-1">
                  Lawyer
                </h3>
                <p className="text-[#4D5259] px-2  h-12 xs:text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[17px]">
                  Provide legal support for real estate transactions
                </p>
                <div className="w-full pt-2">
                  <Link
                    href={{ pathname: "/login", query: { type: "Lawyer" } }}
                    className="block w-full text-center bg-white xs:text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px]  py-2.5 rounded-full text-[#013E8C] font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              {/* Card 4: Key Partner */}
              <div className="flex flex-col rounded-3xl bg-[#DBEAFE] hover:bg-[#d0e1fc] transition-colors items-center justify-between text-center p-4">
                <Image src={keypartner} alt="Key Partner"  className="w-auto max-w-[50px]  max-h-[50px]" />
                <h3 className="text-black font-medium xs:text-[12px] sm:text-[14px] md:text-[16px]  lg:text-[20px] xl:text-[22px]  py-1">
                  Key Partner
                </h3>
                <p className="text-[#4D5259] px-2 xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px]">
                  Earn rewards through our referral program
                </p>
                <div className="w-full pt-2">
                  <Link
                    href={{ pathname: "/keypartner" }}
                    className="block w-full text-center xs:text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[17px]  bg-white py-2.5 rounded-full text-[#013E8C] font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
// "use client";
// import React from "react";
// import backgroundimg from "../../../public/assets/backgroundimg.webp";
// import logo from "../../../public/assets/logo.png";
// import Image from "next/image";
// import borrow from "../../../public/assets/Borrower.png";
// import Lender from "../../../public/assets/Lender.png";
// import lawyer from "../../../public/assets/lawyer.png";
// import keypartner from "../../../public/assets/KeyPartner.png";
// import Link from "next/link";
// const page = () => {
//   return (
//     <>
//       <div className="px-[5%] py-[2%] flex xs:flex-col  w-full h-screen">
//         <div className="flex xs:flex-col xs:min-w-full max-w-1/2 mt-[4%]   min-h-screen gap-6">
//           <div
//             className="backgroundimg xs:min-w-[100%] max-w-[88%] min-h-[700px]  rounded-[30px] bg-cover bg-center flex items-start justify-center relative"
//             style={{ backgroundImage: `url(${backgroundimg.src})` }}
//           >
//             <div className="flex flex-col pt-4 px-[5%] gap-6">
//               <div className="">
//                 <Image src={logo} alt="" />
//               </div>
//               <div className="flex flex-col gap-4 ">
//                 <h1 className="text-[32px] text-white font-medium">
//                   Join BORROW and Take Control of Your Mortgage Experience
//                 </h1>
//                 <p className="text-[18px] text-white font-normal">
//                   Create your account to explore personalized mortgage offers,
//                   apply with ease, and stay connected with top lenders.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex xs:min-w-full  max-w-[59%] justify-center">
//           <div className="flex flex-col gap-2 w-full sm:p-4 p-10 items-center ">
//             <span className="flex flex-col  items-center">
//               <h2 className="text-[34px] font-semibold text-[#111827]">
//                 Choose Your Role to
//               </h2>
//               <p className="text-[27px] font-semibold text-[#013E8C] cursor-pointer">
//                 Get Started
//               </p>
//             </span>
//             <p className="text-[#595959] pb-4 font-medium text-center">
//               Identify yourself as a Borrower, Lender, Lawyer, or Referral
//               Partner to streamline your journey and access tailored features.
//             </p>

//             <div className=" grid grid-cols-2  xs:grid-cols-1 gap-6 sm:gap-4">
//               <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
//                 <Image src={borrow} alt="" />
//                 <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
//                   Borrower
//                 </span>
//                 <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
//                   Find the perfect loan for your dream home
//                 </span>
//                 <span className=" text-black px-4 py-2 rounded-lg w-full cursor-pointer">
//                   <Link
//                     href={{
//                       pathname: "/login",
//                       query: { type: "Borrower" },
//                     }}
//                     className="bg-[#FFFFFF]  py-2  rounded-full min-w-full"
//                   >
//                     <button
//                       className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full"
//                     >
//                       Get Started
//                     </button>
//                   </Link>
//                 </span>
//               </span>

//               <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
//                 <Image src={Lender} alt="" />
//                 <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
//                   Lender
//                 </span>
//                 <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
//                   Connect with qualified borrowers instantly
//                 </span>
//                 <span className=" text-black   px-4 py-2 rounded-lg w-full cursor-pointer">
                  
//                   <Link
//                     href={{
//                       pathname: "/login",
//                       query: { type: "Lender" },
//                     }}
//                     className="bg-[#FFFFFF]  py-2  rounded-full min-w-full"
//                   >
//                     <button
//                       className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full"
//                     >
//                       Get Started
//                     </button>
//                   </Link>
//                 </span>
//               </span>

//               <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
//                 <Image src={lawyer} alt="" />
//                 <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
//                   Lawyer
//                 </span>
//                 <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
//                   Provide legal support for real estate transactions
//                 </span>
//                 <span className=" text-black   px-4 py-2 rounded-lg w-full cursor-pointer">
//                   <Link
//                     href={{
//                       pathname: "/login",
//                       query: { type: "Lawyer" },
//                     }}
//                    className="bg-[#FFFFFF]  py-2  rounded-full min-w-full">
//                     <button
                    
//                       className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full">
//                       Get Started
//                     </button>
//                   </Link>
//                 </span>
//               </span>

//               <span className="flex flex-col rounded-[25px] bg-[#DBEAFE] hover:bg-[#F0FDFA] items-center justify-center p-4">
//                 <Image src={keypartner} alt="" />
//                 <span className=" text-black px-4 font-medium text-[20px] py-2 rounded-lg cursor-pointer">
//                   Key Partner
//                 </span>
//                 <span className=" text-[#4D5259] px-4 py-2 rounded-lg cursor-pointer">
//                   Earn rewards through our referral program
//                 </span>
//                 <span className=" text-black   px-4 py-2 rounded-lg w-full cursor-pointer">
//                   <Link
//                    href={{
//                       pathname: "/keypartner",
//                     }}
//                     className="bg-[#FFFFFF]  py-2  rounded-full min-w-full">
//                    <button
//                       className="text-[#013E8C] font-semibold  w-full cursor-pointer  rounded-full">
//                       Get Started
//                     </button>
//                   </Link>
//                 </span>
//               </span>
//             </div>
//           </div>

//           <div></div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
