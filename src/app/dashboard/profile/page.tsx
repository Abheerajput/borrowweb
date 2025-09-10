"use client";

import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import Image from 'next/image';
import { FiMail, FiCamera, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from '../../../Component/UseDirect/page';
import img from "../../../../public/assets/applicationprofile.png"
import toast from "react-hot-toast";
import axios from "axios";
interface IProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    faxNumber?: string;
    companyName?: string;
    image: string;
}

const page: React.FC = () => {
    const [profileData, setProfileData] = useState<IProfileData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        faxNumber: "",
        companyName: "",
        image: ""
    });

    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLender, setIsLender] = useState(false);
  const router = useRouter();
  useAuthRedirect()
    // Load data from localStorage on mount
    useEffect(() => {
        const role = localStorage.getItem("userRole");
        setIsLender(role === "lender");

        const firstName = localStorage.getItem("firstName") || "";
        const lastName = localStorage.getItem("lastName") || "";
        const email = localStorage.getItem("email") || "";
        const phone = localStorage.getItem("phone") || "";
        const faxNumber = localStorage.getItem("faxNumber") || "";
        const companyName = localStorage.getItem("companyName") || "";
        const image = localStorage.getItem("image") || "";
        const id = localStorage.getItem("userId") || "";

        setProfileData({
            firstName,
            lastName,
            email,
            phone,
            faxNumber,
            companyName,
            image
        });
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  if (!token || !userId) {
    const wasLoggedOut = localStorage.getItem("loggedOut") === "true";

    if (wasLoggedOut) {
      // user clicked logout → just redirect
      localStorage.removeItem("loggedOut");
      router.push("/");
    } else {
 router.push("/");
    }
  }
}, [router]);


const handleUpdate = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

   if ( !userId) {
  toast.error("Your session has expired. Please log in again.");
  return;
}

    const formData = new FormData();
    formData.append("id", userId);
    formData.append("firstName", profileData.firstName);
    formData.append("lastName", profileData.lastName);
    formData.append("phone", profileData.phone);

    if (isLender) {
      formData.append("faxNumber", profileData.faxNumber || "");
      formData.append("companyName", profileData.companyName || "");
    }

    if (newImage) {
      formData.append("file", newImage);
    }

    console.log(formData, "formData==============");

    const response = await axios.post(
      "https://bdapi.testenvapp.com/api/v1/update-profile",
      formData,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Profile updated successfully:", response.data);
    toast.success("Profile updated successfully!");

    // Update localStorage with new values
    localStorage.setItem("firstName", profileData.firstName);
    localStorage.setItem("lastName", profileData.lastName);
    localStorage.setItem("phone", profileData.phone);

    if (isLender) {
      localStorage.setItem("faxNumber", profileData.faxNumber || "");
      localStorage.setItem("companyName", profileData.companyName || "");
    }

    if (newImage) {
      localStorage.setItem("image", URL.createObjectURL(newImage));
    }
  } catch (error: any) {
    console.error("Profile update failed:", error.response || error);
    toast.error(
      error.response?.data?.message ||
        "Failed to update profile. Please try again."
    );
  }
};



   const handleLogout = () => {
  console.log("Logging out...");
  localStorage.removeItem("token"); // remove auth token
  localStorage.clear(); // clear all other stored data
  router.push("/");
  toast.success("You have been logged out!");
};

    return (
        <div className="bg-gray-50 flex items-center justify-center p-4 min-h-screen">
            <div className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
                <form onSubmit={handleUpdate}>
                    {/* --- Profile Picture Upload --- */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                           <Image
    src={imagePreview  || profileData.image ||   img} // show new image > existing image > default
    alt="Profile Picture"
    width={100}
    height={100}
    className="rounded-full object-cover w-24 h-24 border-2 border-gray-200"
/>

                            <button 
                                type="button"
                                onClick={handleCameraClick}
                                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition"
                                aria-label="Upload new photo"
                            >
                                <FiCamera className="w-4 h-4 text-gray-600" />
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/png, image/jpeg"
                            />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mt-4">Upload your photo</h2>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            Kindly upload your professional photo
                            <FiInfo className="cursor-pointer" title="A professional photo helps build trust." />
                        </p>
                    </div>

                    {/* --- First Name & Last Name --- */}
                    <div className="grid xs:grid-cols-1 grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="firstName" className="block font-light text-[#111827] text-[15px]">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} className="w-full py-[11.3px] px-4 border text-black border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition"/>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block font-light text-[#111827] text-[15px]">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} className="w-full py-[11.3px] px-4 border text-black border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition"/>
                        </div>
                    </div>

                    {/* --- Email --- */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block font-light text-[#111827] text-[15px] mb-1">Email*</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange} className="w-full p-3 pl-12 text-black border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 transition" readOnly/>
                            <FiCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600" />
                        </div>
                    </div>

                    {/* --- Phone, Fax & Company Name (Conditional) --- */}
                    <div className="mb-8">
                        <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">Phone Number*</label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-grow">
                                <div className="absolute left-4 top-1/2 text-black -translate-y-1/2 flex items-center gap-2">
                                    <FaCanadianMapleLeaf className="text-red-600" />
                                    <span>|</span>
                                </div>
                                <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleChange} className="w-full p-3 pl-3 text-black relative border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition" />
                                
                            </div>
                        </div>

                        {isLender && (
                            <div className="mt-4 grid xs:grid-cols-1 grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fax" className="block text-sm font-medium text-black mb-1">Fax Number</label>
                                    <input type="text" id="fax" name="faxNumber" value={profileData.faxNumber} onChange={handleChange} className="w-full p-3 text-black border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-black mb-1">Company Name</label>
                                    <input type="text" id="companyName" name="companyName" value={profileData.companyName} onChange={handleChange} className="w-full p-3 text-black border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="grid xs:grid-cols-1 grid-cols-2 gap-4">
                        <button type="submit" className="w-full py-3 rounded-full font-semibold text-blue-800 bg-blue-100 hover:bg-blue-200 transition">
                            Update
                        </button>
                        <button  onClick={handleLogout} className="w-full py-3 rounded-full font-semibold text-white bg-[#013E8C] hover:bg-[#013E8C] transition">
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;
