"use client"
import Image from "next/image";
import React, { useState } from "react";
import img from "../../../../public/assets/applicationnotification.png";
import img2 from "../../../../public/assets/applicationprofile.png";
import video from "../../../../public/assets/video.png";
import home from "../../../../public/assets/homeicon.png";
import percentage from "../../../../public/assets/percentagebar.png";
import noapplication from "../../../../public/assets/noapplication.png";
import Link from "next/link";
 const applicationss = [
 
  {
    id: 1,
    title: 'Residential Mortgage',
    description: 'Lowest interest as low as 4%',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Renewal Mortgage',
    description: 'Lowest interest as low as 4%',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Commercial Loan',
    description: 'Competitive rates for your business.',
    status: 'Approved',
  },
];
const page = () => {
 const [applications, setApplications] = useState(applicationss);
  return (
    <div>
      {/* header  */}
      <div className="flex justify-between items-center ">
        <div className="flex flex-col">
          <span className="text-[20px] font-light ">
            Welcome To Borrow Direct
          </span>
          <span className="text-black   text-[27px] font-medium">
            {" "}
            Cameron S.
          </span>
        </div>
        <div className="flex gap-4 ">
          <Image src={img} alt="" />
          <Image src={img2} alt="" />
        </div>
      </div>
      {/* video section */}
      <div>
        <div className="flex gap-4 mt-2">
          <Image src={video} alt="" />
        </div>
      </div>

  {applications.length > 0 ? (
        // IF there are applications, show the grid
        <div className="grid xs:grid-cols-1 grid-cols-3 gap-6 mt-6">
          {applications.map((app) => (
            <div
              key={app.id} // A unique key is crucial for lists in React
              className="bg-[#FFFFFF] rounded-[20px] flex flex-col gap-8 p-4"
            >
              <div className="items-center flex justify-between">
                <span>
                  <Image src={home} alt="Home Icon" />
                </span>
                <span>
                  {/* Status can also be dynamic */}
                  <button className="bg-[#F7F7F7] rounded-full px-6 text-[#F51919] py-2">
                    {app.status}
                  </button>
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>
                  <p className="text-[16px] text-[#111827] font-semibold">
                    {app.title}
                  </p>
                  <p className="text-[13px] text-[#7C7C7C] font-normal">
                    {app.description}
                  </p>
                </span>
                <span>
                  <Image src={percentage} alt="Percentage Icon" />
                </span>
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
