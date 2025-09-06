"use client";
import React, { useState, useRef, useEffect } from "react";
import loginimg from "../../../public/assets/loginimg.png";
import google from "../../../public/assets/google.png";
import logo from "../../../public/assets/logo.png";
import fb from "../../../public/assets/fb.png";
import backgroundimg from "../../../public/assets/backgroundimg.webp";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import axios from "axios"; // Import axios

const VerifyPage = () => {
  // Renamed 'page' to 'VerifyPage' for clarity
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
  const userPhone =
    typeof window !== "undefined" ? localStorage.getItem("userPhone") : null;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    // Focus on the first input when the component mounts
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setError("");
    setSuccessMessage("");
    setLoading(true);

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6 || isNaN(Number(enteredOtp))) {
      setError("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    if (!userEmail && !userPhone) {
      setError("User email or phone not found. Please register again.");
      setLoading(false);
      return;
    }

    const payload: {
      email?: string;
      phone?: number;
      otpEmail?: number;
      otpPhone?: number;
    } = {};

    if (userEmail) {
      payload.email = userEmail;
      payload.otpEmail = parseInt(enteredOtp, 10);
    }
    if (userPhone) {
      payload.phone = parseInt(userPhone, 10);

      if (!userEmail) {
        payload.otpPhone = parseInt(enteredOtp, 10);
      }
    }

    if (userEmail && userPhone) {
      payload.otpEmail = parseInt(enteredOtp, 10);
    }

    try {
      const response = await axios.post(
        "https://bdapi.testenvapp.com/api/v1/verify-otp",
        payload
      );

      if (response.status === 201) {
        const user = response.data.data;
        setSuccessMessage("Identity verified successfully!");
        // Clear local storage after successful verification
        localStorage.removeItem("userPhone");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userId");
 if (user.role === "lender") {
        router.push("/dashboard/application/lender");
      } else if (user.role === "borrow") {
        router.push("/dashboard/application");
      } else if (user.role === "keypartner") {
        router.push("/dashboard/application/keypartner");
      } else {
        router.push("/dashboard/application"); // default fallback
      }
    
      } else {
        setError(
          response.data?.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err: any) {
      console.error("OTP verification error:", err);
      setError(
        err.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex xs:flex-col flex-row w-full px-[2%]  overflow-y-visible bg-white">
        <div className="w-[40%] py-[1%] min-h-screen xs:w-full">
          <div
            className="backgroundimg w-full  min-h-full rounded-xl bg-cover bg-center flex flex-col justify-start items-center px-6"
            style={{ backgroundImage: `url(${backgroundimg.src})` }}
          >
            <div className="flex flex-col w-full max-w-lg gap-6 pt-4">
              <div className="">
                <Image
                  src={logo}
                  alt="Borrow Logo"
                  className="w-auto h-[50px]"
                />
              </div>
              <div className="flex flex-col gap-4">
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
            Enter the OTP sent to your{" "}
            {userEmail ? "email" : userPhone ? "phone" : "email or phone"} to
            verify your account. This helps keep your information secure.
          </p>
          <div>
            <div className="flex flex-col  gap-4 mt-4">
              <p className="text-black  xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-semibold w-full text-start ">
                Enter OTP
              </p>
              <div className="flex gap-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 xs:w-8 xs:h-8 text-center text-lg border border-[#D9D9D9] rounded-full outline-none focus:ring-2 focus:ring-blue-500"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputRefs.current[index] = el as HTMLInputElement | null;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {error && <p className="text-green-500 text-sm mt-2">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm mt-2">{successMessage}</p>
          )}

          <div className="w-full flex flex-col items-center mt-6">
            <p className="text-[#111827] w-full flex justify-center font-normal">
              Didn’t receive code?
              <span className="text-[#013E8C] ml-1 cursor-pointer hover:underline">
                Resend Again
              </span>
            </p>
            {/* Changed Link to a button that calls handleVerify */}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="bg-[#013E8C] cursor-pointer text-white font-semibold px-12 py-2 w-[80%] rounded-full mt-4 transition hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </>
  );
};

export default VerifyPage;
// "use client";
// import React from 'react';
// import loginimg from "../../../public/assets/loginimg.png";
// import google from "../../../public/assets/google.png";
// import logo from "../../../public/assets/logo.png";
// import fb from "../../../public/assets/fb.png";
// import backgroundimg from "../../../public/assets/backgroundimg.webp";
// import Image from 'next/image';
// import Link from 'next/link';

// const page = () => {
//   return (
//     <>
// <div className="flex xs:flex-col flex-row w-full px-[2%]  overflow-y-visible bg-white">

//   <div className="w-[40%] py-[1%] min-h-screen xs:w-full">
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

//          <div className="flex flex-col xs:min-w-full w-[60%] items-center xs:min-h-full min-h-screen px-[5%] py-[4%] bg-white">
//       <h1 className="xs:text-[15px] sm:text-[18px] pt-3 md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold text-[#000000] text-center mt-10">
//         Verify Your Identity
//       </h1>

//       <p className="xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] text-[#595959] font-medium text-center mt-4 max-w-md">
//         Enter the OTP sent to your email (or phone) to verify your account. This helps keep your information secure.
//       </p>
// <div>

//       <div className="flex flex-col  gap-4 mt-4">
//               <p className="text-black  xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-semibold w-full text-start ">Enter OTP</p>
// <div className='flex gap-4'>

//         {[...Array(6)].map((_, index) => (
//           <input
//           key={index}
//           type="text"
//           maxLength={1}
//           className="w-12 h-12 xs:w-8 xs:h-8 text-center text-lg border border-[#D9D9D9] rounded-full outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         ))}
//         </div>
//       </div>
//         </div>

//       <div className="w-full flex flex-col items-center mt-6">
//         <p className="text-[#111827] w-full flex justify-center font-normal">
//           Didn’t receive code?
//           <span className="text-[#013E8C] ml-1 cursor-pointer hover:underline">Resend Again</span>
//         </p>
// <Link href="/dashboard/application" className='w-[80%]'>
//         <button className="bg-[#013E8C] cursor-pointer text-white font-semibold px-12 py-2 w-full rounded-full mt-4">
//           Verify
//         </button>
// </Link>

//         <div className="mt-8 flex flex-col items-center">
//           <Image src={loginimg} alt="Login" className="max-w-[300px]" />
//           <div className="flex gap-6 mt-4">
//             <Image src={google} alt="Google Login" className="w-[60px]" />
//             <Image src={fb} alt="Facebook Login" className="w-[60px]" />
//           </div>
//         </div>
//       </div>
//     </div>
//         </div>

//     </>
//   );
// };

// export default page;
