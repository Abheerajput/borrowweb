"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

// Importing icons from react-icons
import { 
    FiMail, 
    FiCamera,
    FiCheckCircle, 
    FiInfo 
} from 'react-icons/fi';
import { FaCanadianMapleLeaf } from "react-icons/fa"; // For the Canadian flag

// 1. Define the data structure for the profile
interface IProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profilePictureUrl: string; // URL for the existing picture
}

const page: React.FC = () => {
    // 2. Manage form state
    const [profileData, setProfileData] = useState<IProfileData>({
        firstName: "Raj",
        lastName: "Patel",
        email: "borrowdirectgmail.com",
        phone: "92489295522",
        profilePictureUrl: "https://i.pravatar.cc/150?u=rajpatel" // Placeholder image
    });

    const [newImage, setNewImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 3. Handle changes for standard text inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };
    
    // Handle clicking the camera icon to trigger file input
    const handleCameraClick = () => {
        fileInputRef.current?.click();
    };
    
    // Handle new image selection and create a preview
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 4. Handle form submission for updates
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        console.log("Updating profile with data:", profileData);
        if (newImage) {
            console.log("Uploading new profile picture:", newImage.name);
            // Here you would add your API logic to upload the `newImage` file
            // and send the `profileData` object.
        }
        alert("Profile update data logged to console!");
    };
    
    // Handle logout action
    const handleLogout = () => {
        console.log("Logging out...");
        // Add your logout logic here (e.g., clearing auth token, redirecting)
        alert("Logout action triggered!");
    };

    return (
        <div className="bg-gray-50 flex items-center justify-center p-4 min-h-screen">
            <div className="w-full max-w-2xl bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
                <form onSubmit={handleUpdate}>
                    {/* --- Profile Picture Upload --- */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <Image
                                src=''
                                alt="Profile Picture"
                                width={100}
                                height={100}
                                className="rounded-full  object-cover w-24 h-24 border-2 border-gray-200"
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
                    <div className="grid xs:grid-cols-1  grid-cols-2 gap-6 mb-6">
                        <div>
                            <label htmlFor="firstName" className="block font-light text-[#111827] text-[15  px]">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={profileData.firstName} onChange={handleChange} className="w-full  py-[11.3px] px-4 border text-black border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition"/>
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block font-light text-[#111827] text-[15px] ">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={profileData.lastName} onChange={handleChange} className="w-full  py-[11.3px] px-4 border text-black border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition"/>
                        </div>
                    </div>

                    {/* --- Email --- */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block  font-light text-[#111827] text-[15px] mb-1">Email*</label>
                        <div className="relative">
                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="email" id="email" name="email" value={profileData.email} onChange={handleChange} className="w-full p-3 pl-12 text-black border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 transition" readOnly/>
                            <FiCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600" />
                        </div>
                    </div>

                    {/* --- Phone Number --- */}
                    <div className="mb-8">
                        <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">Phone Number*</label>
                        <div className="flex items-center gap-3">
                            <div className="relative flex-grow">
                                <div className="absolute left-4 top-1/2 text-black -translate-y-1/2 flex items-center gap-2 ">
                                    <FaCanadianMapleLeaf className="text-red-600" />
                                    <span>|</span>
                                </div>
                                <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleChange} className="w-full p-3 pl-3 text-black relative border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition" />
                                 <button type="button" className="px-5 top-[6.5px] right-[10px] text-black absolute py-2 border border-gray-300 rounded-full text-sm font-semibold  hover:bg-gray-50 transition">
                                Verify
                            </button>
                            </div>
                           
                        </div>
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="grid xs:grid-cols-1 grid-cols-2 gap-4">
                        <button type="submit" className="w-full py-3 rounded-full font-semibold text-blue-800 bg-blue-100 hover:bg-blue-200 transition">
                            Update
                        </button>
                        <button type="button" onClick={handleLogout} className="w-full py-3 rounded-full font-semibold text-white bg-[#013E8C] hover:bg-[#013E8C] transition">
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default page;