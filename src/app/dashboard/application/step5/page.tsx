"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGift, FaCouch, FaCarAlt, FaUmbrella, FaDollarSign, FaLightbulb } from 'react-icons/fa';
import { IoMdArrowRoundBack } from "react-icons/io";
const totalSteps = 7;
// 1. Define the structure for each asset's data
interface AssetData {
  value: string;
  description: string;
}

// 2. Define the types for our state
type AssetType = "Gift from Family" | "Household Goods" | "Vehicle" | "Life Insurance";

type AllAssetsData = {
  [key in AssetType]: AssetData;
};

// 3. Create a constant for our asset types to keep the code clean (Don't Repeat Yourself)
const assetTypes: { name: AssetType; icon: React.ReactNode }[] = [
  { name: "Gift from Family", icon: <FaGift className="h-6 w-6" /> },
  { name: "Household Goods", icon: <FaCouch className="h-6 w-6" /> },
  { name: "Vehicle", icon: <FaCarAlt className="h-6 w-6" /> },
  { name: "Life Insurance", icon: <FaUmbrella className="h-6 w-6" /> },
];

// Helper function to create the initial state dynamically
const createInitialState = (): AllAssetsData => {
  const initialState = {} as AllAssetsData;
  assetTypes.forEach(asset => {
    initialState[asset.name] = { value: "", description: "" };
  });
  return initialState;
};

const AssetsPage: React.FC = () => {
  // 4. Set up our state
  const [selectedAsset, setSelectedAsset] = useState<AssetType>("Gift from Family");
  const [assetsData, setAssetsData] = useState<AllAssetsData>(createInitialState());
  const [hasLifeInsurance, setHasLifeInsurance] = useState(false);
  const pathname = usePathname();
 const [isClient, setIsClient] = useState(false);
  const stepMatch = pathname.match(/step(\d+)/);
  const currentStep = stepMatch ? parseInt(stepMatch[1]) : 1;
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  // 5. Create a handler for input changes that updates the correct asset's data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setAssetsData(prevData => ({
      ...prevData,
      [selectedAsset]: {
        ...prevData[selectedAsset],
        [name]: value,
      },
    }));
  };

  // 6. Handle form submission
  const handleSubmit = () => {
    console.log("Submitting the following data:");
    console.log({
      assets: assetsData,
      hasLifeInsurance: hasLifeInsurance,
    });
    // Here you would typically make an API call with the structured data
    // e.g., await api.post('/application/assets', { assetsData, hasLifeInsurance });
    alert("Form data has been logged to the console!");
  };

  return (

    <div className="min-w-full">
     <div className="flex justify-between text-black my-4">
        <Link href="/dashboard/application/step3" className="flex gap-2 items-center">
          <IoMdArrowRoundBack />
         Assets
        </Link>
        {isClient && (
          <span className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className={`h-1.5 w-5 rounded-full ${index < currentStep ? "bg-[#013E8C]" : "bg-gray-200"}`}></div>
              ))}
            </div>
            <h1 className="text-sm text-black font-medium">{currentStep} of {totalSteps}</h1>
          </span>
        )}
      </div>
    <div className=" min-h-screen font-sans">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
      
        <div className="w-16 h-1 bg-blue-600 mt-2 mb-8"></div>
        
        {/* Asset Type Selector */}
        <div className="grid sm:grid-cols-2 xs:grid-cols-1 grid-cols-4 gap-4 mb-8">
          {assetTypes.map((asset) => (
            <button
              key={asset.name}
              onClick={() => setSelectedAsset(asset.name)}
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 ${
                selectedAsset === asset.name
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400'
              }`}
            >
              {asset.icon}
              <span className="text-sm font-semibold mt-2">{asset.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Form Section */}
        <div className="space-y-6">
          <h2 className="font-semibold text-[#111827] text-[18px]">{selectedAsset}</h2>
          
          <div>
            <label htmlFor="value" className="block font-semibold text-[#111827] text-[18px] mb-1">
              What is the value of this asset?
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="value"
                id="value"
                value={assetsData[selectedAsset].value}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 pl-10 pr-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g. 80,000"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold text-[#111827] text-[18px] mb-1">
              Assets Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              value={assetsData[selectedAsset].description}
              onChange={handleInputChange}
              className="block w-full rounded-md p-4  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Describe this asset"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 flex items-center space-x-3 rounded-lg bg-[#EBF2FC] p-4">
          <FaLightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-black text-[18px]">Did you Know?...</h3>
            <p className="text-sm text-black italic mt-1">
              Some types of Life Insurance can be used as Assets towards your Mortgage Qualification.
            </p>
          </div>
        </div>

        {/* Life Insurance Checkbox */}
        <div className="mt-6">
          <p className="font-semibold text-black text-[18px] mb-2">Do you have Life Insurance?</p>
          <div className="flex items-center space-x-6">
            <label className="flex  items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasLifeInsurance === true}
                onChange={() => setHasLifeInsurance(true)}
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              <span className="text-[16px] text-[#111827] font-medium">Yes</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasLifeInsurance === false}
                onChange={() => setHasLifeInsurance(false)}
                className="accent-blue-600 w-[15px] h-[15px]"
              />
              <span className="text-[16px] text-[#111827] font-medium">No</span>
            </label>
          </div>
        </div>
        
        {/* Navigation Buttons */}
         <div className="mt-8 w-full flex gap-6 justify-between">
                      <Link href="/dashboard/application/step4" className="w-1/2">
            <button
              className="w-full text-black font-semibold py-3 px-8 border rounded-full hover:border-gray-400 transition-colors"
              >
              Back
            </button>
              </Link>
            <Link href="/dashboard/application/step6" className="w-1/2">
            <button
              // type="submit"
              className="bg-[#013E8C] w-full text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-800 transition-colors"
              >
              Continue
            </button>
              </Link>
          </div>
      </div>
    </div>
    </div>
  );
};

export default AssetsPage;