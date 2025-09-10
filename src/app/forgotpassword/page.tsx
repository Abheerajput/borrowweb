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
      <div className="w-[40%] py-[1%] xs:hidden  min-h-screen xs:w-full">
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

      
     <div className='w-[60%] xs:pt-10 xs:min-w-[100%]  px-[4%] text-center flex flex-col justify-center'>
        <h2 className="text-2xl font-semibold text-[#111827] mb-2">Forgot Your Password</h2>
        <p className="text-gray-600 text-[14px] font-normal px-[8%] text-sm mb-6">
          Enter the OTP sent to your email to Setup New Password of Your Account. This help keep your information secure.
        </p>

        <div className="  px-4 py-3">
          <div className="flex gap-4 items-center justify-center ">
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

// // components/ForgotPassword.jsx

// import { Mail } from 'lucide-react';

// const ForgotPassword = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
//       <div className="max-w-md w-full text-center">
//         <h2 className="text-2xl font-semibold text-[#111827] mb-2">Forgot Your Password</h2>
//         <p className="text-gray-600 text-sm mb-6">
//           No worries! Select Your registered Email to reset your password and regain access to your account.
//         </p>

//         <div className="flex items-center gap-3 bg-[#F6F9FB] border border-gray-200 rounded-full px-4 py-3 shadow-sm">
//           <div className="bg-white p-2 rounded-full shadow-md">
//             <Mail size={20} className="text-blue-700" />
//           </div>
//           <div className="text-left">
//             <p className="text-sm text-gray-400">Via Email</p>
//             <p className="text-sm font-medium text-gray-800">********@borrowdirect.com</p>
//           </div>
//         </div>

//         <button className="mt-6 w-full bg-[#003B91] hover:bg-[#002c6b] text-white font-semibold py-3 rounded-full transition-all duration-200">
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
