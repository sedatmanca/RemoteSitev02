'use client'

import { INavbarDropdownProps } from "@/types/navbar/navbarProps";
import { Dropdown, MenuProps } from "antd";
import { BellIcon } from "@heroicons/react/24/solid";

const Notifications = ({ translation } : INavbarDropdownProps) => {
  const notificationItems: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-col justify-center items-center cursor-default">
          <span className="text-xs font-normal text-gray-400">
            {translation['notifications']}
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
        <div className="flex flex-col font-medium w-72 text-gray-800 hover:bg-color-main hover:text-yellow-500 bg-gray-100 p-4">
          <span className="text-md font-semibold ">
            {translation['dataset-upload-success']}
          </span>
          <span className="text-xs font-normal opacity-95">
            {translation['new-dataset-uploaded']}
          </span>
          <span className="text-xs font-normal text-right opacity-80">
            16/11/2022
          </span>
        </div>
      ),
      key: 1,
    },
    {
      label: (
        <div className="flex flex-col font-medium w-72 text-gray-800 hover:bg-color-main hover:text-yellow-500 bg-gray-100 p-4">
          <span className="text-md font-semibold">
            {translation['dataset-upload-success']}
          </span>
          <span className="text-xs font-normal opacity-95">
            {translation['new-dataset-uploaded']}
          </span>
          <span className="text-xs font-normal text-right opacity-80">
            16/11/2022
          </span>
        </div>
      ),
      key: 2,
    },
    {
      label: (
        <div className="flex flex-col font-medium w-72 text-gray-800 hover:bg-color-main hover:text-yellow-500 bg-gray-100 p-4">
          <span className="text-md font-semibold ">
            {translation['dataset-upload-success']}
          </span>
          <span className="text-xs font-normal opacity-95">
            {translation['new-dataset-uploaded']}
          </span>
          <span className="text-xs font-normal text-right opacity-80">
            16/11/2022
          </span>
        </div>
      ),
      key: 3,
    },
  ];

  return (
    <Dropdown
      menu={{
        items: notificationItems,
      }}
      arrow
    >
      <BellIcon
        className="inline-block w-6 h-6 cursor-pointer hover:text-slate-300 hover:fill-gray-300 focus:fill-gray-300"
        title={translation['notifications']}
      />
    </Dropdown>
  );
};

export default Notifications;