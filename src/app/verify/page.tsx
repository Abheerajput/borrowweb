"use client";
import React from 'react';
import loginimg from "../../../public/assets/loginimg.png";
import google from "../../../public/assets/google.png";
import logo from "../../../public/assets/logo.png";
import fb from "../../../public/assets/fb.png";
import backgroundimg from "../../../public/assets/backgroundimg.webp";
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <>
<div className="flex xs:flex-col flex-row w-full px-[2%]  overflow-y-visible bg-white">

  <div className="w-[40%] py-[1%] min-h-screen xs:w-full">
<div className='backgroundimg w-full  min-h-full rounded-xl bg-cover bg-center flex flex-col justify-start items-center px-6'style={{ backgroundImage: `url(${backgroundimg.src})` }}>
 <div className="flex flex-col w-full max-w-lg gap-6 pt-4">
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



         <div className="flex flex-col xs:min-w-full w-[60%] items-center xs:min-h-full min-h-screen px-[5%] py-[4%] bg-white">
      <h1 className="xs:text-[15px] sm:text-[18px] pt-3 md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold text-[#000000] text-center mt-10">
        Verify Your Identity
      </h1>

      <p className="xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] text-[#595959] font-medium text-center mt-4 max-w-md">
        Enter the OTP sent to your email (or phone) to verify your account. This helps keep your information secure.
      </p>
<div>


      <div className="flex flex-col  gap-4 mt-4">
              <p className="text-black  xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-semibold w-full text-start ">Enter OTP</p>
<div className='flex gap-4'>

        {[...Array(6)].map((_, index) => (
          <input
          key={index}
          type="text"
          maxLength={1}
          className="w-12 h-12 xs:w-8 xs:h-8 text-center text-lg border border-[#D9D9D9] rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        </div>
      </div>
        </div>

      <div className="w-full flex flex-col items-center mt-6">
        <p className="text-[#111827] w-full flex justify-center font-normal">
          Didn’t receive code?
          <span className="text-[#013E8C] ml-1 cursor-pointer hover:underline">Resend Again</span>
        </p>
<Link href="/dashboard/application" className='w-[80%]'>
        <button className="bg-[#013E8C] cursor-pointer text-white font-semibold px-12 py-2 w-full rounded-full mt-4">
          Verify
        </button>
</Link>

        <div className="mt-8 flex flex-col items-center">
          <Image src={loginimg} alt="Login" className="max-w-[300px]" />
          <div className="flex gap-6 mt-4">
            <Image src={google} alt="Google Login" className="w-[60px]" />
            <Image src={fb} alt="Facebook Login" className="w-[60px]" />
          </div>
        </div>
      </div>
    </div>
        </div>
   
    </>
  );
};

export default page;
