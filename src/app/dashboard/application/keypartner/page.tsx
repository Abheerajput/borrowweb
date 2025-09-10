"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import img from "../../../../../public/assets/applicationnotification.png";
import img2 from "../../../../../public/assets/ProfilePicture.png";
import video from "../../../../../public/assets/video.png";
import home from "../../../../../public/assets/home.png";
import noapplication from "../../../../../public/assets/noapplication.png";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAuthRedirect } from "../../../../Component/UseDirect/page";
import axios from "axios";
import { useRouter } from "next/navigation";

interface KeyPartnerApplication {
  _id: string;
  partnerId: string;
  details: any[];
  status: string;
  progress: number;
  createdAt: string;
}

const KeyPartnerPage = () => {
  const [applications, setApplications] = useState<KeyPartnerApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  useAuthRedirect();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/");
          return;
        }

        const response = await axios.get(
          "https://bdapi.testenvapp.com/api/v1/key-partner-applications",
          {
            headers: { Authorization: `${token}` },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setApplications(response.data.data);
        }
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to fetch key partner applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleCardClick = (app: KeyPartnerApplication) => {
    localStorage.setItem("selectedKeyPartnerApplication", JSON.stringify(app));
    if (app._id) localStorage.setItem("keyPartnerApplicationId", app._id);

    console.log("Stored Key Partner Application:", app);

    router.push(`/dashboard/keypartner/application/${app._id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex flex-col">
          <span className="text-[20px] text-black font-light ">
            Welcome To Borrow Direct – Key Partner Portal
          </span>
          <span className="text-black text-[27px] font-medium">Alex K.</span>
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
              {/* Header */}
              <div className="items-center flex justify-between">
                <span>
                  <Image src={home} alt="Home Icon" className="w-auto h-[50px]" />
                </span>
                <span>
                  <button
                    className={`bg-[#F7F7F7] rounded-full px-6 py-2 ${
                      app.status === "approved"
                        ? "text-green-600"
                        : app.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {app.status}
                  </button>
                </span>
              </div>

              {/* Body */}
              <div className="flex justify-between items-center">
                <span>
                  <p className="text-[16px] text-[#111827] font-semibold">
                    {app.details?.[0]?.projectName || "Untitled"}
                  </p>
                  <p className="text-[13px] text-[#7C7C7C] font-normal">
                    {app.details?.[0]?.location || "No details"}
                  </p>
                </span>
                <span className="w-[50px] h-[50px]">
                  <CircularProgressbar
                    value={Math.round(app.progress)}
                    text={`${Math.round(app.progress)}%`}
                    styles={buildStyles({
                      textSize: "28px",
                      pathColor: "#013E8C",
                      textColor: "#111827",
                      trailColor: "#E5E7EB",
                    })}
                  />
                </span>
              </div>

              {/* Footer */}
              <div>
                <p className="text-xs text-gray-400">
                  Created At: {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No applications
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col min-w-full items-start gap-2">
            <h1 className="text-[22px] font-semibold">Ongoing Partner Applications</h1>
            <p className="text-[17px] font-normal">
              Track your referrals or start a new one — everything you need in one
              place.
            </p>
          </div>
          <span>
            <Image src={noapplication} alt="No applications found" />
          </span>
          <span className="mt-4 flex flex-col items-center">
            <p className="text-[18px] text-[#111827] font-medium">
              No ongoing partner applications.
            </p>
            <p className="text-[#013E8C] text-[22px] font-semibold">
              Ready to add one? Start a new referral now.
            </p>
          </span>
        </div>
      )}

      {/* start new referral */}
      <div className="mt-6">
        {/* <div className="mt-20 w-full flex justify-end">
          <Link href="/dashboard/keypartner/application/new">
            <button className="px-6 bg-[#013E8C] py-3 font-semibold text-white rounded-full ">
              Add New Referral
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default KeyPartnerPage;
