"use client";
import React, { useEffect } from "react";
import Container from "./Ui/Container";
import Button from "./Ui/Button";
import Text from "../types/Text";
import img from "../../../public/Images/headerscreenimg.webp"
import img2 from "../../../public/Images/mainscreenhome.png"
// import img3 from "../../../public/Images/homepage.png"
import Image from "next/image";
import arrow from '../../../public/Images/buttonicon.png'
import Link from "next/link";
import { useTranslation } from "../../app/i18n/client";
import { useLanguage } from "../../app/Context/LanguageContext";

const Page = () => {
  const { t } = useLanguage();

    return (
    <div  className="overflow-hidden">
     <div
  className="bg-center overflow-hidden  bg-no-repeat bg-white relative min-w-[100vw] min-h-[100vh]"
  style={{
    backgroundImage: `url('/mainscreen.png')`,
    backgroundSize: 'cover',        // stretches to fill the screen
  }}
>
        <div className="pt-[6%]   xs:px-6 px-[6%]  xl:max-h-[80%]  min-h-full relative">
          <div className="flex xs:flex-col xs:mt-6  justify-between sm:flex-col sm:min-w-full  sm:pt-2 min-h-screen  relative z-20">
            <div className="xs:min-w-full min-w-[50%] xs:mt-6 max-w-[51%] md:py-[16%] lg:py-[16%] xl:py-[8%] flex flex-col gap-6 text-white">
              <Text size="sm" weight="semibold" className="">
                {t.mainheading}
                {/*  */}
              </Text>

              <Text size="5xl" weight="bold" as="h1" className="text-[50px]">
                {t.title}
              </Text>

              <Text size="lg" weight="normal">
                {t.description}
              </Text>

              {/* Buttons */}
              <div className="flex gap-4 mt-4 relative">
                  <Image src={arrow} alt="" className="absolute  left-[-3%] top-[2.3rem] "/>
                  <Link href="/signup">
                <Button variant="secondary" size="medium" className="flex  items-center gap-4" >
                  <Text size="sm" weight="medium" className="font-poppins">{t.joinNow}</Text>
                </Button>
                  </Link>
                <Button  variant="transparent" size="medium" onClick={() => {
    const section = document.getElementById('howitworks');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
                  <Text size="sm" weight="medium"> {t.How_it_works}</Text>
                </Button>
              </div>
            </div>

             {/* <div className="xs:hidden flex  min-w-[50%]  sm:hidden relative  "> */}
             <div className="w-1/2 flex items-end justify-end xs:hidden relative">
              <Image
                src={img}
                alt="Side Illustration"
                className="max-w-[40rem]   top-0   sm:hidden xs:hidden  absolute "
                />
                </div>
            {/* </div> */}
            <div
              className=" mt-[3%] xs:bg-white xs:min-w-full hidden xs:flex sm:block "
             
            />
<Image
                src={img2}
                alt="Side Illustration"
                className="w-full h-auto  lg:hidden xl:hidden md:hidden   object-contain"
              />
             </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
