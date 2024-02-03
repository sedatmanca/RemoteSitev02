'use client'

import Image from "next/image";
import Link from "next/link";
import { 
  HomeIcon as HomeIconFilled, 
  FolderPlusIcon 
} from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { FAQ, LanguageSelection, Notifications, Profile } from "@/components/navbar/buttons";
import { INavbarProps } from "@/types/navbar/navbarProps";
import { Button } from "antd";
import { useState } from "react";
import logo from '#/assets/logo.png';
import UploadSurvey from "@/components/survey/uploadSurvey";
import NavbarFilters from "./buttons/filters";

export const Navbar = ({ 
  lang,
  translation,
  showProjectFilters
} : INavbarProps) => {
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  const homePage = `/${lang}`;
  const pathname = usePathname();
  const isRouterInHomePage = pathname === homePage;

  return (
    <nav className="text-white flex flex-row justify-between items-center">
      <div className="flex flex-row justify-start items-center">
        <Link
          href={homePage}
          className="w-[140px] h-[35px]"
        >
            <Image 
              alt="Remote Site" 
              src={logo}
              quality={100}
              width={1920} 
              height={519}
            /> 
        </Link>
        <Link
          href={homePage}
          className="ml-5"
        >
          {isRouterInHomePage ? 
            <div className="after:border-b after:block after:mx-1 after:pt-0.5 after:border-main-orange">
              <HomeIconFilled
                className="w-6 h-6 hover:text-slate-300"
                title={translation.navbar['home']}
              />
            </div> :                    
            <HomeIcon
              className="w-6 h-6 hover:text-slate-300"
              title={translation.navbar['home']}
            />
          }
        </Link>
      </div>
      {showProjectFilters && <NavbarFilters translation={translation} lang={lang}/>}
      <div className="flex flex-row ml-auto items-center">        
        <div className="after:mx-4 after:py-1 after:border-r after:border-white/50">
          <Button
            onClick={() => setIsSurveyModalOpen(true)}
            className="sm:inline disable-text-hover text-xs text-white bg-main-orange hover:bg-main-deep-orange px-4 py-2 rounded-full shadow-md border-none">
              <div className="flex">
                <FolderPlusIcon className="w-4 h-4 text-white ant-sm:mr-0 mr-1" />
                <span className="hidden lg:block">
                  {translation.navbar['upload-survey']}
                </span>
              </div>
          </Button>
        </div>
        <div className="flex flex-row gap-x-4 items-center">
          <LanguageSelection 
            translation={translation.navbar} 
            path={pathname}
          />
          <FAQ 
            translation={translation.navbar}
          />
          <Notifications 
            translation={translation.navbar} 
          />
          <Profile
            translation={translation.navbar}
            lang={lang}
          />
        </div>
      </div>
      <UploadSurvey
        lang={lang}
        translation={translation.survey}
        isModalOpen={isSurveyModalOpen}
        setIsModalOpen={setIsSurveyModalOpen}
      />      
    </nav>
  );
}