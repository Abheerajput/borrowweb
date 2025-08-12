"use client";
import React, { useEffect, useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import loginimg from "../../../public/assets/loginimg.png";
import google from "../../../public/assets/google.png";
import fb from "../../../public/assets/fb.png";
import Image from "next/image";
import PasswordInput from "./PasswordInput";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
const Page = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  const searchParams = useSearchParams();
  const type = searchParams.get("type")?.trim().toLowerCase();
  console.log(type , "kk q")
  const keypartner = type?.toLowerCase() === "keypartner";
    const Borrower = type === "borrower";
  const countries = [
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
  ];

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
   const handleLogin = () => {
    if (type === "lender") {
      router.push("/dashboard/application/lender");
    } else if (type === "borrower") {
      router.push("/dashboard/application");
    } else if (type === "keypartner") {
      router.push("/dashboard/application/keypartner");
    } else {
      router.push("/dashboard/application"); // default route if no type matches
    }
  };

  return (
    <div className="px-[5%] py-10 min-h-screen flex flex-col items-center">
      {/* Tabs */}
      <div className="bg-[#F1F1F1] w-[80%] max-w-xl flex items-center justify-between rounded-full mb-8 shadow-sm">
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
        <>
         
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {Borrower
              ? "Welcome to Borrow Direct"
              : "Welcome to Borrow Direct – Lender Portal"}
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
            {Borrower
              ? "Log in to manage your mortgage applications, connect with lenders, and track your progress every step of the way."
              : "Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders."}
          </p>

          <form className="w-full max-w-3xl space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-[#111827]">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-2 w-full h-[40px] px-4 border border-[#D9D9D9] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#111827]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-2 w-full h-[40px] px-4 border border-[#D9D9D9] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="pl-11 pr-4 w-full h-[40px] border border-[#D9D9D9] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              placeholder="borrowdirect@gmail.com"
              className="mt-2 w-full h-[40px] px-4 border border-[#D9D9D9] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           <div>
      <label className="text-sm font-medium text-[#111827]">Verify ID</label>

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
        className="w-[50px] h-[50px] border border-dashed border-[#D9D9D9] flex items-center justify-center rounded-lg cursor-pointer hover:border-blue-500 transition overflow-hidden"
      >
        {file ? (
          file.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-center px-1">{file.name}</span>
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
              <div className="flex items-center mt-2 border border-[#D9D9D9] rounded-full focus-within:ring-2 focus-within:ring-blue-500">
                <select
                  name="country-code"
                  className="bg-transparent pl-4 pr-2 h-[40px] text-[#111827] focus:outline-none"
                >
                  {countries.map((c) => (
                    <option key={c.name} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <div className="border-l border-[#D9D9D9] h-6"></div>
                <input
                  type="tel"
                  name="phone-number"
                  placeholder="Phone Number"
                  className="w-full h-[40px] px-4 bg-transparent border-none focus:outline-none"
                />
              </div>
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

            <div className="space-y-4">
              <p className="text-sm text-[#111827]">
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
                type="button"
                onClick={handleLogin}
                className="w-full bg-[#013E8C] h-[40px] text-white rounded-full font-medium transition hover:bg-blue-900"
              >
                Sign Up
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-[24px] md:text-3xl font-semibold mb-2">
            {Borrower
              ? "Welcome to Borrow Direct"
              : "Welcome to Borrow Direct – Lender Portal"}
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
            {Borrower
              ? "Log in to manage your mortgage applications, connect with lenders, and track your progress every step of the way."
              : "Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders."}
          </p>


          <form className="w-full mt-6 max-w-full space-y-6">
            <div>
              <label className="text-sm font-medium text-[#111827]">
                Email
              </label>
              <input
                type="email"
                placeholder="borrowdirect@gmail.com"
                className="mt-2 w-full h-[40px] px-4 border border-[#D9D9D9] rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

      
            <PasswordInput
              label="Password"
              id="login-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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
                className="w-full bg-[#013E8C] h-[40px] text-white rounded-full font-medium transition hover:bg-blue-900"
              >
                Login
              </button>
          </form>
        </>
      )}

      {/* Common Footer */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <Image src={loginimg} alt="Login Visual" className="w-[280px] " />
        <div className="flex gap-6 mt-4">
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
