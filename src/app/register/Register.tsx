"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import loginimg from "../../../public/assets/loginimg.png";
import google from "../../../public/assets/google.png";
import fb from "../../../public/assets/fb.png";
import Image from "next/image";
import PasswordInput from "./PasswordInput";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios"; // Import axios
import toast from "react-hot-toast";
 
const Page = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState(""); // For keypartner
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error messages

  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type")?.trim().toLowerCase();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  console.log(BASE_URL, "BASE_URLBASE_URL===================");
  const keypartner = type?.toLowerCase() === "keypartner";
  const Borrower = type === "borrower";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const getTabClassName = (tabName: string) => {
    const isActive = activeTab === tabName;
    return `
      h-[40px] w-1/2 flex items-center justify-center rounded-full px-6 cursor-pointer
      transition-colors duration-300
      ${
        isActive
          ? "bg-white text-black font-semibold shadow-md"
          : "text-[#898989] hover:text-black"
      }
    `;
  };

const handleLogin = async () => {
  if (!email || !password) {
    setError("Email and password are required");
    toast.error("Email and password are required");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });

    if (response.status === 201) {
      const user = response.data.data;

      // Get role from URL
      const urlRole = type?.toLowerCase(); // "lender", "borrower", "keypartner"

      // Compare roles
      if (urlRole && user.role.toLowerCase() !== urlRole) {
        toast.error("You are not authorized for this role");
        return; // Stop here, don't store anything
      }

      // ✅ Save data if authorized
      localStorage.setItem("token", user.token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", `${user.firstName} ${user.lastName}`);

      toast.success("Login successful!");

      // Redirect based on role
      if (user.role === "lender") {
        router.push("/dashboard/application/lender");
      } else if (user.role === "borrower") {
        router.push("/dashboard/application");
      } else if (user.role === "keypartner") {
        router.push("/dashboard/application/keypartner");
      } else {
        router.push("/dashboard/application"); // default fallback
      }
    }
  } catch (err: any) {
    const message =
      err.response?.data?.message || "Login failed. Please try again.";
    setError(message);
    toast.error(message);
  } finally {
    setLoading(false);
  }
};


  const handleRegister = async () => {
    setError(""); // Clear previous errors
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Determine the role based on the URL parameter
    let role = "borrow"; // Default role
    if (type === "lender") {
      role = "lender";
    } else if (type === "keypartner") {
      role = "keypartner";
    }
    const cleanPhone = phone.replace(/\D/g, "");
    const payload = {
      firstName,
      lastName,
      email,
      phone: cleanPhone ? parseInt(cleanPhone, 10) : undefined,
      // phone: parseInt(phone.replace(/\D/g, ""), 10), // Remove non-digits and convert to number
      password,
      role,
      ...(keypartner && {
        address,
        verifyId: file ? file.name : undefined,
      }),
    };

    try {
      const response = await axios.post(
        "https://bdapi.testenvapp.com/api/v1/user",
        payload
      );
      console.log("Registration successful:", response.data);
      console.log(response, "response=============");

      // Check if the response status is 200 (OK)
      if (response.status === 201) {
        localStorage.setItem("userPhone", payload.phone);
        localStorage.setItem("userEmail", payload.email);
        localStorage.setItem("userId", response.data.userId);
        router.push("/verify");
      } else {
        // Handle cases where the status is not 200 but no error was thrown by axios
        // This might happen if the server returns a non-2xx status without an error,
        // though axios usually throws for 4xx/5xx statuses.
        setError(
          response.data?.message ||
            "Registration failed with an unexpected status."
        );
      }
    } catch (err: any) {
      console.error("Registration error:", err);

      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" py-10 min-w-full px-[4%] bg-white min-h-screen flex flex-col items-center">
      {/* Tabs */}
      <div className="bg-[#F1F1F1] py-[6px] px-2 w-[80%] max-w-xl flex items-center justify-between rounded-full mb-2 shadow-sm">
        <div
          className={getTabClassName("register")}
          onClick={() => setActiveTab("register")}
        >
          Register
        </div>
        <div
          className={getTabClassName("login")}
          onClick={() => setActiveTab("login")}
        >
          Login
        </div>
      </div>

      {activeTab === "register" ? (
        <div className=" px-[4%]">
          <h1 className="xs:text-[15px] text-black text-center sm:text-[18px] pt-3 md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold mb-2">
            {Borrower
              ? "Welcome to Borrow Direct"
              : "Welcome to Borrow Direct – Lender Portal"}
          </h1>
          <p className="xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] pb-3 text-black max-w-lg font-normal text-center mx-auto">
            {Borrower
              ? "Log in to manage your mortgage applications, connect with lenders, and track your progress every step of the way."
              : "Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders."}
          </p>

          <form
            className="w-full max-w-3xl space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-[#111827]">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-2 w-full h-[40px] px-4 text-black border border-[#D9D9D9]  rounded-full focus:outline-none font-normal  focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-2 w-full h-[40px] px-4 border text-black border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#111827]"
              >
                Email
              </label>
              <div className="relative mt-2">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="borrowdirect@gmail.com"
                  className="pl-11 pr-4 w-full text-black h-[40px] border border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {keypartner && (
              <>
                <div>
                  <label className="text-sm font-medium text-[#111827]">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="mt-2 w-full h-[40px] text-black px-4 border border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#111827]">
                    Verify ID
                  </label>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    id="verify-id-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* Upload Box */}
                  <label
                    htmlFor="verify-id-upload"
                    className="w-[50px] h-[50px] border border-dashed text-black border-[#D9D9D9] flex items-center justify-center rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden"
                  >
                    {file ? (
                      file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs text-center px-1">
                          {file.name}
                        </span>
                      )
                    ) : (
                      <FaPlus className="text-blue-700" />
                    )}
                  </label>
                </div>
              </>
            )}
            {/* Phone Field */}
            <div>
              <label className="text-sm font-medium text-[#111827]">
                Phone Number*
              </label>
              <PhoneInput
                country={"us"} // Default country
                value={phone}
                onChange={setPhone} // The 'phone' state will be updated with the full number
                containerClass="mt-2"
                inputClass="!w-full !h-[40px] !pl-12 !pr-4 !border text-black font-normal !rounded-full focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
                buttonClass="!border-[#D9D9D9] !rounded-l-full  text-black !bg-white"
                inputProps={{
                  name: "phone",
                  required: true,
                  placeholder: "Phone Number",
                }}
              />
            </div>

            {/* Password Fields */}
            <div className="grid xs:grid-cols-1 grid-cols-2 gap-6">
              <PasswordInput
                label="Password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordInput
                label="Confirm Password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-green-500 flex justify-center text-sm">
                {error}
              </p>
            )}

            <div className="space-y-4">
              <p className="text-sm py-2 text-[#111827]">
                By registering, I agree to the
                <span className="text-[#013E8C] font-medium cursor-pointer px-1">
                  Terms & Conditions
                </span>
                and
                <span className="text-[#013E8C] font-medium cursor-pointer px-1">
                  Privacy Policy
                </span>
              </p>
              <button
                type="submit"
                className="w-full bg-[#013E8C] h-[40px] text-white rounded-full font-medium transition hover:bg-blue-900"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="min-w-full  px-[4%]">
          <h1 className="xs:text-[15px] text-center text-black sm:text-[18px] pt-3 md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold mb-2">
            {Borrower
              ? "Welcome to Borrow Direct"
              : "Welcome to Borrow Direct – Lender Portal"}
          </h1>
          <p className="xs:text-[12px] sm:text-[14px] md:text-[15px] font-normal lg:text-[16px] xl:text-[18px] pb-3 text-gray-600 max-w-lg text-center mx-auto">
            {Borrower
              ? "Log in to manage your mortgage applications, connect with lenders, and track your progress every step of the way."
              : "Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders."}
          </p>

          <form className="w-full  max-w-full space-y-4">
            <div>
              <label className="text-sm font-medium text-[#111827]">
                Email
              </label>
              <input
                type="email"
                placeholder="borrowdirect@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full h-[40px] px-4 border text-black border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1  gap-6">
              <PasswordInput
                label="Password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right py-3 text-sm">
              <Link href="/forgotpassword">
                <span className="text-[#013E8C] cursor-pointer">
                  Forgot Password?
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#013E8C] h-[40px] text-white rounded-full font-medium transition hover:bg-blue-900"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      )}

      {/* Common Footer */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <Image src={loginimg} alt="Login Visual" className="w-[280px] " />
        <div className="flex gap-6">
          <Image
            src={google}
            alt="Google Login"
            className="w-[50px] hover:scale-105 transition"
          />
          <Image
            src={fb}
            alt="Facebook Login"
            className="w-[50px] hover:scale-105 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

// "use client";
// import React, {  useState } from "react";
// import { Suspense } from "react";
// import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
// import loginimg from "../../../public/assets/loginimg.png";
// import google from "../../../public/assets/google.png";
// import fb from "../../../public/assets/fb.png";
// import Image from "next/image";
// import PasswordInput from "./PasswordInput";
// import Link from "next/link";
// import { FaPlus } from "react-icons/fa";
// import { useRouter, useSearchParams } from "next/navigation";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// const Page = () => {
//   const [activeTab, setActiveTab] = useState("register");
//   const [password, setPassword] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const router = useRouter();
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }

//   };
//   const [phone, setPhone] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type")?.trim().toLowerCase();
//   console.log(type , "kk q")
//   const keypartner = type?.toLowerCase() === "keypartner";
//     const Borrower = type === "borrower";
//   const countries = [
//     { code: "+1", name: "USA", flag: "🇺🇸" },
//     { code: "+44", name: "UK", flag: "🇬🇧" },
//     { code: "+91", name: "India", flag: "🇮🇳" },
//     { code: "+61", name: "Australia", flag: "🇦🇺" },
//   ];

//   const getTabClassName = (tabName: string) => {
//     const isActive = activeTab === tabName;
//     return `
//       h-[40px] w-1/2 flex items-center justify-center rounded-full px-6 cursor-pointer
//       transition-colors duration-300
//       ${
//         isActive
//           ? "bg-white text-black font-semibold shadow-md"
//           : "text-[#898989] hover:text-black"
//       }
//     `;
//   };
//    const handleLogin = () => {
//     if (type === "lender") {
//       router.push("/dashboard/application/lender");
//     } else if (type === "borrower") {
//       router.push("/dashboard/application");
//     } else if (type === "keypartner") {
//       router.push("/dashboard/application/keypartner");
//     } else {
//       router.push("/dashboard/application"); // default route if no type matches
//     }
//   };

//   return (
//     <div className=" py-10 min-w-full px-[4%] bg-white min-h-screen flex flex-col items-center">
//       {/* Tabs */}
//       <div className="bg-[#F1F1F1] py-[6px] px-2 w-[80%] max-w-xl flex items-center justify-between rounded-full mb-2 shadow-sm">
//         <div
//           className={getTabClassName("register")}
//           onClick={() => setActiveTab("register")}
//         >
//           Register
//         </div>
//         <div
//           className={getTabClassName("login")}
//           onClick={() => setActiveTab("login")}
//         >
//           Login
//         </div>
//       </div>

//       {activeTab === "register" ? (
//         <div className=" px-[4%]">

//         <h1 className="xs:text-[15px] text-black text-center sm:text-[18px] pt-3 md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold mb-2">
//             {Borrower
//               ? "Welcome to Borrow Direct"
//               : "Welcome to Borrow Direct – Lender Portal"}
//           </h1>
//           <p className="xs:text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] pb-3 text-black max-w-lg font-normal text-center mx-auto">
//             {Borrower
//               ? "Log in to manage your mortgage applications, connect with lenders, and track your progress every step of the way."
//               : "Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders."}
//           </p>

//           <form className="w-full max-w-3xl space-y-4">
//             {/* Name Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-sm font-medium text-[#111827]">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your first name"
//                   className="mt-2 w-full h-[40px] px-4 text-black border border-[#D9D9D9]  rounded-full focus:outline-none font-normal  focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-[#111827]">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your last name"
//                   className="mt-2 w-full h-[40px] px-4 border text-black border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Email Field */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-[#111827]"
//               >
//                 Email
//               </label>
//               <div className="relative mt-2">
//                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                   <EnvelopeIcon className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="borrowdirect@gmail.com"
//                   className="pl-11 pr-4 w-full text-black h-[40px] border border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//  {keypartner && (
//         <>
//           <div>
//             <label className="text-sm font-medium text-[#111827]">
//               Address <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="borrowdirect@gmail.com"
//               className="mt-2 w-full h-[40px] text-black px-4 border border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//            <div>
//       <label className="text-sm font-medium text-[#111827]">Verify ID</label>

//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*,.pdf"
//         id="verify-id-upload"
//         className="hidden"
//         onChange={handleFileChange}
//       />

//       {/* Upload Box */}
//       <label
//         htmlFor="verify-id-upload"
//         className="w-[50px] h-[50px] border border-dashed text-black border-[#D9D9D9] flex items-center justify-center rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden"
//       >
//         {file ? (
//           file.type.startsWith("image/") ? (
//             <img
//               src={URL.createObjectURL(file)}
//               alt="Preview"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="text-xs text-center px-1">{file.name}</span>
//           )
//         ) : (
//           <FaPlus className="text-blue-700" />
//         )}
//       </label>
//     </div>
//         </>
//       )}
//             {/* Phone Field */}
//              <div>
//               <label className="text-sm font-medium text-[#111827]">
//                 Phone Number*
//               </label>
//               <PhoneInput
//                 country={"us"} // Default country
//                 value={phone}
//                 onChange={setPhone} // The 'phone' state will be updated with the full number
//                 containerClass="mt-2"
//                 inputClass="!w-full !h-[40px] !pl-12 !pr-4 !border text-black font-normal !rounded-full focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
//                 buttonClass="!border-[#D9D9D9] !rounded-l-full  text-black !bg-white"
//                 inputProps={{
//                   name: "phone",
//                   required: true,
//                   placeholder: "Phone Number",
//                 }}
//               />
//             </div>

//             {/* Password Fields */}
//             <div className="grid xs:grid-cols-1 grid-cols-2 gap-6">
//               <PasswordInput
//                 label="Password"
//                 id="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <PasswordInput
//                 label="Confirm Password"
//                 id="confirm-password"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <div className="space-y-4">
//               <p className="text-sm py-2 text-[#111827]">
//                 By registering, I agree to the
//                 <span className="text-[#013E8C] font-medium cursor-pointer px-1">
//                   Terms & Conditions
//                 </span>
//                 and
//                 <span className="text-[#013E8C] font-medium cursor-pointer px-1">
//                   Privacy Policy
//                 </span>
//               </p>
//               <Link href="/verify">
//               <button
//                 type="button"
//                 className="w-full bg-[#013E8C] h-[40px] text-white rounded-full font-medium transition hover:bg-blue-900"
//                 >
//                 Sign Up
//               </button>
//                 </Link>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="min-w-full  px-[4%]">
//            <h1 className="xs:text-[15px] text-center text-black sm:text-[18px] pt-3 md:text-[24px] lg:text-[28px] xl:text-[32px] font-semibold mb-2">
//             {Borrower
//               ? "Welcome to Borrow Direct"
//               : "Welcome to Borrow Direct – Lender Portal"}
//           </h1>
//           <p className="xs:text-[12px] sm:text-[14px] md:text-[15px] font-normal lg:text-[16px] xl:text-[18px] pb-3 text-gray-600 max-w-lg text-center mx-auto">
//             {Borrower
//               ? "Log in to manage your mortgage applications, connect with lenders, and track your progress every step of the way."
//               : "Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders."}
//           </p>

//           <form className="w-full  max-w-full space-y-4">
//             <div>
//               <label className="text-sm font-medium text-[#111827]">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="borrowdirect@gmail.com"
//                 className="mt-2 w-full h-[40px] px-4 border text-black border-[#D9D9D9] rounded-full focus:outline-none font-normal focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//  <div className="grid grid-cols-1  gap-6">
//               <PasswordInput
//                 label="Password"
//                 id="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//             </div>

//             <div className="text-right py-3 text-sm">
//               <Link href="/forgotpassword">
//               <span className="text-[#013E8C] cursor-pointer">
//                 Forgot Password?
//               </span>
//               </Link>
//             </div>

//               <button
//                 type="button"
//                   onClick={handleLogin}
//                 className="w-full bg-[#013E8C] h-[40px] text-white rounded-full font-medium transition hover:bg-blue-900"
//               >
//                 Login
//               </button>
//           </form>
//         </div>
//       )}

//       {/* Common Footer */}
//       <div className="mt-4 flex flex-col items-center gap-2">
//         <Image src={loginimg} alt="Login Visual" className="w-[280px] " />
//         <div className="flex gap-6">
//           <Image
//             src={google}
//             alt="Google Login"
//             className="w-[50px] hover:scale-105 transition"
//           />
//           <Image
//             src={fb}
//             alt="Facebook Login"
//             className="w-[50px] hover:scale-105 transition"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
