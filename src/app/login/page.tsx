"use client"
import React, { useEffect, useState } from 'react'
import backgroundimg from "../../../public/assets/backgroundimg.webp"
import logo from "../../../public/assets/logo.png"
import Image from 'next/image'
// import borrow from '../../../public/assets/Borrower.png'
// import Lender from '../../../public/assets/Lender.png'
// import lawyer from '../../../public/assets/lawyer.png'
// import keypartner from '../../../public/assets/KeyPartner.png'
// import Choose from "../choselevel/page"
import Register from "../register/Register"
const page = () => {
   const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This will run only on the client
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent rendering on server

  return (
    <div className='px-[5%] py-[2%] h-screen'>
        <div className='flex xs:flex-col w-full gap-6'>
  <div className="w-[40%] py-[1%] min-h-screen xs:w-full">
<div className='backgroundimg w-full  min-h-full rounded-xl bg-cover bg-center flex flex-col justify-start items-center px-6'style={{ backgroundImage: `url(${backgroundimg.src})` }}>
 <div className="flex flex-col w-full max-w-lg gap-6 pt-4">
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



<div className='w-[60%] xs:min-w-[100%]  items-center flex justify-center'>
   
{/* <Choose/> */}
<Register/>
{/* <Verify/> */}


        </div>
        </div>
        </div>
  )
}

export default page