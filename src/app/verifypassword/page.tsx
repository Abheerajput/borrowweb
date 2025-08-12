// components/ForgotPassword.jsx
"use client"
import { Mail } from 'lucide-react';
import backgroundimg from "../../../public/assets/backgroundimg.webp"
import logo from "../../../public/assets/logo.png"
import Image from 'next/image'
import Link from 'next/link';
import loginimg from "../../../public/assets/loginimg.png";
import google from "../../../public/assets/google.png";
import fb from "../../../public/assets/fb.png";
const ForgotPassword = () => {
  return (
<div className='px-[5%] py-[2%] h-screen'>
        <div className='flex xs:flex-col w-full gap-6'>
      <div className='backgroundimg xs:min-w-[100%]  w-1/2 min-h-screen  rounded-[30px] bg-cover bg-center flex items-start justify-center relative'style={{ backgroundImage: `url(${backgroundimg.src})` }}>
      <div className='flex flex-col pt-4 px-[5%] gap-6'>
      
      <div className=''>
          <Image src={logo} alt="" />
      </div>
      <div className='flex flex-col gap-4 '>
          <h1 className='text-[32px] text-white font-medium'>Join BORROW and Take Control of Your Mortgage Experience</h1>
          <p className='text-[18px] text-white font-normal'>Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders.</p>
      </div>
      </div>
      </div>
      
     <div className='w-1/2 xs:min-w-[100%]  px-[3%] text-center flex flex-col justify-center'>
        <h2 className="text-2xl font-semibold text-[#111827] mb-2">Forgot Your Password</h2>
        <p className="text-gray-600 text-sm mb-6">
          Enter the OTP sent to your email to Setup New Password of Your Account. This help keep your information secure.
        </p>

        <div className="  px-4 py-3">
          <div className="flex gap-4 mt-4">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-12 xs:w-8 xs:h-8 text-center text-lg border border-[#D9D9D9] rounded-full outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <div className="w-full flex flex-col items-center mt-6">
        <p className="text-[#111827] w-full flex justify-center font-normal">
          Didn’t receive code?
          <span className="text-[#013E8C] ml-1 cursor-pointer hover:underline">Resend Again</span>
        </p>
<Link href="/dashboard/application" className='w-full'>
        <button className="bg-[#013E8C] cursor-pointer text-white font-semibold px-12 py-2 w-full rounded-full mt-4">
          Verify
        </button>
</Link>

        <div className="mt-8 flex flex-col items-center">
          <Image src={loginimg} alt="Login" className="max-w-[300px]" />
          <div className="flex gap-6 mt-4">
            <Image src={google} alt="Go/ogle Login" className="w-[60px]" />
            <Image src={fb} alt="Facebook Login" className="w-[60px]" />
          </div>
        </div>
      </div>
        </div>

      
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
