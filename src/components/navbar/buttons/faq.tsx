'use client'

import React from "react";
import { Dropdown, MenuProps } from "antd";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { INavbarDropdownProps } from "@/types/navbar/navbarProps";

const FAQ = ({ translation } : INavbarDropdownProps) => {
  const faqItems: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-col justify-center items-center cursor-default">
          <span className="text-xs font-normal text-gray-400">
            {translation["support"]}
          </span>
        </div>
      ),
      key: 0,
    },
    {
      type: "divider",
    },
    {
      label: (
        <span className="font-medium hover:text-main-orange">
            {translation["whats-new"]}
        </span>
      ),
      key: 1,
    },
    {
      label: (
        <span className="font-medium hover:text-main-orange">
          {translation["contact-support"]}
        </span>
      ),
      key: 2,
    },
    {
      label: (
        <span className="font-medium hover:text-green-500">
          {translation["help-center"]}
        </span>
      ),
      key: 3,
    },
  ];

  return (
    <Dropdown
      menu={{
        items: faqItems,
      }}
      arrow
    >
      <QuestionMarkCircleIcon
        className="inline-block w-6 h-6 cursor-pointer hover:text-slate-300 hover:fill-gray-300 focus:fill-gray-300"
        title={translation["faq"]}
      />
    </Dropdown>
  );
};

export default FAQ;

