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

<div className='backgroundimg xs:min-w-[100%]  w-1/2 min-h-screen  rounded-[30px] bg-cover bg-center flex items-start justify-center relative'style={{ backgroundImage: `url(${backgroundimg.src})` }}>
<div className='flex flex-col pt-4 px-[5%] gap-6'>

<div className=''>
    <Image src={logo} alt="" />
</div>
<div className='flex flex-col gap-4 '>
    <h1 className='text-[32px] text-white font-medium'>Join BORROW and Take Control of Your Mortgage Experience</h1>
    <p className='text-[18px] text-white font-normal'>Create your account to explore personalized mortgage offers, apply with ease, and stay connected with top lenders.</p>
</div>
</div>
</div>


<div className='w-1/2 xs:min-w-[100%]  flex justify-center'>
   
{/* <Choose/> */}
<Register/>
{/* <Verify/> */}


        </div>
        </div>
        </div>
  )
}

export default page