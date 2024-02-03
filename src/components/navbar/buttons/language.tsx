'use client'

import React from "react";
import Link from "next/link";
import { Dropdown, MenuProps } from "antd";
import { LanguageIcon } from "@heroicons/react/24/solid";
import { ILangugageDropdownProps } from "@/types/navbar/navbarProps";
import { i18n } from "@/i18n/settings";
import Image from "next/image";
import { Language } from "@/types/language/language";

import gb from '#/assets/flags/en-GB.svg';
import tr from '#/assets/flags/tr-TR.svg';

const getPathString = (path: string | undefined): string => {
    let newPath = '/';

    if(path){
        const splitPath = path.split('/');

        if(splitPath.length >= 2){
            splitPath.forEach((s, idx) => {
                if(idx < 2) return;
                newPath += s + '/';
            });
        }
    }

    return newPath;
}

const getTextAndIcons = (lang: string) => {
  const languageObject: {[index: string]: Language} = {
    "en": {
      text: "English (UK)",
      image: gb
    },
    "tr": {
      text: "Türkçe",
      image: tr
    }
  }

  return languageObject[lang];
}

const LanguageSelection = ({ 
  translation, 
  path,
  className 
} : ILangugageDropdownProps) => {
  const newPath = getPathString(path);

  const languageItems: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-col justify-center items-center cursor-default">
          <span className="text-xs font-normal text-gray-400">
            {translation['select-language']}
          </span>
        </div>
      ),
      key: 0,
    },
    {
      type: "divider",
    }
  ];

  i18n.locales.forEach((lng, idx) => {
    const { text, image } = getTextAndIcons(lng);

    const langObject = {
        label : (
            <span className="font-medium hover:text-main-orange">
                <Link 
                  className="flex gap-x-1" 
                  href={`/${lng}${newPath}`} 
                  replace={true}
                >
                  <Image
                    src={image}
                    alt={text}
                    width={15}
                    height={10}
                  />
                  <span className="hover:!text-main-orange">
                    {text}
                  </span>
                </Link>
            </span>
        ),
        key: idx + 1
    }

    languageItems.push(langObject);
  })

  return (
    <div className={className}>
      <Dropdown
        menu={{
          items: languageItems,
        }}
        arrow
      >
        <LanguageIcon
          className="inline-block w-6 h-6 cursor-pointer hover:text-slate-300 hover:fill-gray-300 focus:fill-gray-300"
          title={translation['select-language']}
        />
      </Dropdown>
    </div>
  );
};

export default LanguageSelection;