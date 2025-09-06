"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img from "../../../../public/assets/applicationnotification.png";
import img2 from "../../../../public/assets/ProfilePicture.png";
import video from "../../../../public/assets/video.png";
import home from "../../../../public/assets/home.png";
import percentage from "../../../../public/assets/percentagebar2.png";
import noapplication from "../../../../public/assets/noapplication.png";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import axios from "axios";
import { useRouter } from "next/navigation";
interface Application {
  _id: string;
  userId: string;
  basicDetails: any[];
  isAccepted: string;
  isCompleted: number;
  currentState:number;
  createdAt: string;
}

const page = () => {

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router=useRouter()
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/"); 
          return;
        }
        if (!token) {
          setError("No token found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://bdapi.testenvapp.com/api/v1/user-applications",
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status == 200 || response.status == 201) {
          setApplications(response.data.data); // Store API data
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);


const handleCardClick = (app: Application) => {
  // store full app object
  localStorage.setItem("selectedApplication", JSON.stringify(app));

  // store only the _id
  if (app._id) {
    localStorage.setItem("applicationId", app._id);
  }

  console.log("Stored Application:", app);

  // get currentState and redirect accordingly
  const step = app.currentState || 1; 
  router.push(`/dashboard/application/step${step}`);
};


  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col">
          <span className="text-[20px] text-black font-light ">
            Welcome To Borrow Direct
          </span>
          <span className="text-black   text-[27px] font-medium">
            {" "}
            Cameron S.
          </span>
        </div>
        <div className="flex gap-4 ">
          <Image src={img} alt="" />
          <Image src={img2} alt="" className="w-auto h-[40px] object-fill" />
        </div>
      </div>
      {/* video section */}
      <div>
        <div className="flex gap-4 mt-2">
          <Image src={video} alt="" className="max-h-[300px]" />
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="grid xs:grid-cols-1 cursor-pointer grid-cols-3 gap-6 mt-6">
          {applications.map((app) => (
            <div
              key={app._id}
              onClick={() => handleCardClick(app)}
              className="bg-[#FFFFFF] rounded-[20px] flex flex-col gap-8 p-4"
            >
              {/* Header with icon and status */}
              <div className="items-center flex justify-between">
                <span>
                  <Image
                    src={home}
                    alt="Home Icon"
                    className="w-auto h-[50px]"
                  />
                </span>
                <span>
                  <button
                    className={`bg-[#F7F7F7] rounded-full px-6 py-2 ${
                      app.isAccepted === "approved"
                        ? "text-green-600"
                        : app.isAccepted === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {app.isAccepted}
                  </button>
                </span>
              </div>

              {/* Body with title/description */}
              <div className="flex justify-between items-center">
                <span>
                  <p className="text-[16px] text-[#111827] font-semibold">
                    {app.basicDetails?.[0]?.lookingToData?.label || "Untitled"}
                  </p>
                  <p className="text-[13px] text-[#7C7C7C] font-normal">
                    {app.basicDetails?.[0]?.alreadyPropertydata?.label ||
                      "No details"}
                  </p>
                </span>
                <span className="w-[50px] h-[50px]">
                  <CircularProgressbar
                    value={Math.round(app.isCompleted)}
                    text={`${Math.round(app.isCompleted)}%`}
                    styles={buildStyles({
                      textSize: "28px",
                      pathColor: "#013E8C",
                      textColor: "#111827",
                      trailColor: "#E5E7EB",
                    })}
                  />
                </span>
              </div>

              {/* Progress info */}
              <div>
                <p className="text-xs text-gray-400">
                  Created At: {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // ELSE, if the array is empty, show the "No applications" message
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col min-w-full items-start gap-2">
            <h1 className="text-[22px] font-semibold">Ongoing Applications</h1>
            <p className="text-[17px] font-normal">
              Track your current mortgage applications or start a new
              one—everything you need in one place.
            </p>
          </div>
          <span>
            <Image src={noapplication} alt="No applications found" />
          </span>
          <span className="mt-4 flex flex-col items-center">
            <p className="text-[18px] text-[#111827] font-medium">
              No ongoing applications.
            </p>
            <p className="text-[#013E8C] text-[22px] font-semibold">
              Ready to apply? Start a new one now.
            </p>
          </span>
        </div>
      )}
      {/* application sections */}
      <div className="mt-6">
        {/* start new application */}
        <div className="mt-20 w-full flex justify-end">
          <Link href="/dashboard/application/step1">
            <button className="px-6 bg-[#013E8C] py-3 font-semibold text-white rounded-full ">
              Start New Application
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
