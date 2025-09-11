"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import backgroundimg from "../../../public/assets/backgroundimg.webp";
import logo from "../../../public/assets/logo.png";
import loginimg from "../../../public/assets/loginimg.png";
import google from "../../../public/assets/google.png";
import fb from "../../../public/assets/fb.png";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MutableRefObject } from 'react';

const BASE_URL = "https://bdapi.testenvapp.com/api/v1/"; // replace if needed

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef: MutableRefObject<(HTMLInputElement | null)[]> = useRef<(HTMLInputElement | null)[]>([]);
const router = useRouter();
  const handleChange = (e:any, index:any) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) inputsRef.current[index + 1]?.focus();
  };

const handleKeyDown = (e:any, index:any) => {
  if (e.key === "Backspace") {
    e.preventDefault(); // prevent default backspace behavior
    const newOtp = [...otp];
    if (newOtp[index]) {
      // If current input has a value, just clear it
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (index > 0) {
      // If current input is empty, move focus backward and clear previous
      inputsRef.current[index - 1]?.focus();
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  } else if (e.key === "Enter") {
    handleResetPassword();
  }
};


  const handleResetPassword = async () => {
  setError("");
  setSuccess("");
  setLoading(true);

  const email = localStorage.getItem("email"); // get email from localStorage
  if (!email) {
    setError("User email not found. Please enter your email first.");
    setLoading(false);
    return;
  }
const newPassword = otp.join("");

  if (!newPassword) {
    setError("Please enter your new password.");
    setLoading(false);
    return;
  }

  const enteredOtp = otp.join("");
  if (enteredOtp.length !== otp.length) {
    setError("Please enter the complete OTP.");
    setLoading(false);
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}forgotPassword`, {
      email,
      newPassword,
      otp: enteredOtp, // Include OTP if backend requires it
    });

    if (response.status === 200 || response.status === 201) {
      toast.success("Password reset successfully!");
      router.push("/login"); // redirect to login
      // Clear localStorage
    } else {
      setError(response.data?.message || "Password reset failed.");
    }
  } catch (err: any) {
    console.error(err);
    setError(err.response?.data?.message || "Password reset failed.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="px-[5%]  bg-white xs:h-screen min-h-screen">
      <div className="flex xs:flex-col w-full gap-6">
        {/* Left Background */}
         <div className="w-[40%] py-[1%] xs:hidden h-screen  bg-white  xs:w-full">
<div className='backgroundimg w-full  min-h-full rounded-xl bg-cover bg-center flex flex-col justify-start items-center px-6'style={{ backgroundImage: `url(${backgroundimg.src})` }}>
 <div className="flex flex-col xs:hidden xs:max-h-[50vh] xs:min-h-[49vh] w-full max-w-lg gap-6 pt-4">
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

        {/* Right Form */}
        <div className="w-[60%] xs:pt-10 xs:min-w-[100%] px-[4%] text-center flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-[#111827] mb-2">
            Forgot Your Password
          </h2>
          <p className="text-gray-600 text-[14px] font-normal px-[8%] text-sm mb-6">
            Enter the OTP sent to your email to setup a new password. This helps keep your information secure.
          </p>

          <div className="px-4 py-3">
            <div className="flex gap-4 items-center justify-center">
  {otp.map((value, index) => (
    <input
      key={index}
      type="password" // keep hidden if it's a password (or "text" if you want visible)
      maxLength={1}
      value={otp[index]}
      onChange={(e) => handleChange(e, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
ref={(el) => {
  inputsRef.current[index] = el;
}}
      className="w-12 h-12 xs:w-8 xs:h-8 text-center text-lg border border-[#D9D9D9] rounded-full outline-none focus:ring-2 focus:ring-blue-500"
    />
  ))}



            </div>

        
            <div className="w-full flex flex-col items-center mt-6">
              <p className="text-[#111827] w-full flex justify-center font-normal">
                Didn’t receive code?
                <span className="text-[#013E8C] ml-1 cursor-pointer hover:underline">
                  Resend Again
                </span>
              </p>

              <button
                onClick={handleResetPassword}
                className="bg-[#013E8C] cursor-pointer text-white font-semibold px-12 py-2 w-full rounded-full mt-4"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>

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
      </div>
    </div>
  );
};

export default ForgotPassword;

// // components/ForgotPassword.jsx
// "use client"
// import { Mail } from 'lucide-react';
// import backgroundimg from "../../../public/assets/backgroundimg.webp"
// import logo from "../../../public/assets/logo.png"
// import Image from 'next/image'
// import Link from 'next/link';
// import loginimg from "../../../public/assets/loginimg.png";
// import google from "../../../public/assets/google.png";
// import fb from "../../../public/assets/fb.png";
// const ForgotPassword = () => {
//   return (
// <div className='px-[5%] py-[2%] bg-white xs:h-screen min-h-screen'>
//         <div className='flex xs:flex-col  w-full gap-6'>
//       <div className="w-[40%] py-[1%] xs:hidden   min-h-screen xs:w-full">
// <div className='backgroundimg w-full  min-h-full rounded-xl bg-cover bg-center flex flex-col justify-start items-center px-6'style={{ backgroundImage: `url(${backgroundimg.src})` }}>
//  <div className="flex flex-col w-full max-w-lg gap-6 pt-4">
//               <div className="">
//                               <Image src={logo} alt="Borrow Logo" className="w-auto h-[50px]" />
//               </div>
//               <div className="flex flex-col gap-4">
//                 {/* Responsive font sizes */}
//                 <h1 className="xs:text-[15px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[28px] text-white font-medium">
//                   Join BORROW and Take Control of Your Mortgage Experience
//                 </h1>
//                 <p className="xs:text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px] text-white font-normal">
//                   Create your account to explore personalized mortgage offers,
//                   apply with ease, and stay connected with top lenders.
//                 </p>
//               </div>
//             </div>
// </div>
// </div>

      
//      <div className='w-[60%] xs:pt-10 xs:min-w-[100%]  px-[4%] text-center flex flex-col justify-center'>
//         <h2 className="text-2xl font-semibold text-[#111827] mb-2">Forgot Your Password</h2>
//         <p className="text-gray-600 text-[14px] font-normal px-[8%] text-sm mb-6">
//           Enter the OTP sent to your email to Setup New Password of Your Account. This help keep your information secure.
//         </p>

//         <div className="  px-4 py-3">
//           <div className="flex gap-4 items-center justify-center ">
//         {[...Array(6)].map((_, index) => (
//           <input
//             key={index}
//             type="text"
//             maxLength={1}
//             className="w-12 h-12 xs:w-8 xs:h-8 text-center text-lg border border-[#D9D9D9] rounded-full outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         ))}
//       </div>

//       <div className="w-full flex flex-col items-center mt-6">
//         <p className="text-[#111827] w-full flex justify-center font-normal">
//           Didn’t receive code?
//           <span className="text-[#013E8C] ml-1 cursor-pointer hover:underline">Resend Again</span>
//         </p>
// <Link href="/dashboard/application" className='w-full'>
//         <button className="bg-[#013E8C] cursor-pointer text-white font-semibold px-12 py-2 w-full rounded-full mt-4">
//           Verify
//         </button>
// </Link>

//         <div className="mt-8 flex flex-col items-center">
//           <Image src={loginimg} alt="Login" className="max-w-[300px]" />
//           <div className="flex gap-6 mt-4">
//             <Image src={google} alt="Go/ogle Login" className="w-[60px]" />
//             <Image src={fb} alt="Facebook Login" className="w-[60px]" />
//           </div>
//         </div>

//       </div>
//         </div>

      
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ForgotPassword;

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
