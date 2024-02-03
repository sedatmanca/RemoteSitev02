'use client'

import { 
    Avatar, 
    Dropdown, 
    MenuProps 
} from "antd";

import { 
  UserIcon as UserIconFilled,
  UsersIcon as UsersIconFilled,
  KeyIcon as KeyIconFilled,
  UserCircleIcon
} from "@heroicons/react/24/solid";

import { 
  UserIcon,
  UsersIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";

import { 
    IoLogOutOutline as LogOut, 
    IoLogOut as LogOutFilled
} from "react-icons/io5";

import { useState } from "react";
import { IProfileDropdownProps } from "@/types/navbar/navbarProps";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Profile = ({ 
  translation,
  lang
} : IProfileDropdownProps) => {
  const [changeIcon, setChangeIcon] = useState({
    profileIcon: <UserIcon className="w-4 h-4" />,
    team: <UsersIcon className="w-4 h-4" />,
    license: <KeyIcon className="w-4 h-4" />,
    logout: <LogOut className="w-4 h-4" />,
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  const goToProfile = () => { return }

  const signOut = async () => {
    await supabase.auth.signOut();

    router.push(`/${lang}/login`);
    router.refresh();
  }

  const profileItems: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-col justify-center items-center cursor-default">
          <span className="text-xs font-normal text-gray-400">
            {translation['profile']}
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
        <div
          className="inline-flex justify-start items-center gap-x-3 "
          onClick={() => goToProfile}
          onMouseOver={() => {
            setChangeIcon({
              ...changeIcon,
              profileIcon: <UserIconFilled className="w-4 h-4" />,
            })
          }
          }
          onMouseOut={() =>
            setChangeIcon({
              ...changeIcon,
              profileIcon: <UserIcon className="w-4 h-4" />,
            })
          }
        >
          {changeIcon.profileIcon}
          <span>
            {translation['my-profile']}
          </span>
        </div>
      ),
      key: 1,
    },
    {
      label: (
        <div
          className="inline-flex justify-start items-center gap-x-3"
          onClick={() => goToProfile}
          onMouseOver={() =>
            setChangeIcon({
              ...changeIcon,
              team: <UsersIconFilled className="w-4 h-4" />,
            })
          }
          onMouseOut={() =>
            setChangeIcon({
              ...changeIcon,
              team: <UsersIcon className="w-4 h-4" />,
            })
          }
        >
          {changeIcon.team}
          <span>
            {translation['people-team']}
          </span>
        </div>
      ),
      key: 2,
    },
    {
      label: (
        <div
          className="inline-flex justify-start items-center gap-x-3"
          onClick={() => goToProfile}
          onMouseOver={() =>
            setChangeIcon({
              ...changeIcon,
              license: <KeyIconFilled className="w-4 h-4" />,
            })
          }
          onMouseOut={() =>
            setChangeIcon({
              ...changeIcon,
              license: <KeyIcon className="w-4 h-4" />,
            })
          }
        >
          {changeIcon.license}
          <span>
            {translation['licenses-usage']}
          </span>
        </div>
      ),
      key: 3,
    },
    {
      label: (
        <div
          className="inline-flex justify-start items-center gap-x-3"
          onMouseOver={() =>
            setChangeIcon({
              ...changeIcon,
              logout: <LogOutFilled className="w-4 h-4" />,
            })
          }
          onMouseOut={() =>
            setChangeIcon({
              ...changeIcon,
              logout: <LogOut className="w-4 h-4" />,
            })
          }
          onClick={() => signOut()}
        >
          {changeIcon.logout}
          <span>
            {translation['logout']}
          </span>
        </div>
      ),
      key: 4,
    },
  ];

  return (
    <Dropdown
      menu={{
        items: profileItems,
      }}
      arrow
    >
       <UserCircleIcon 
          className="inline-block w-7 h-7 cursor-pointer hover:text-slate-300 hover:fill-gray-300 focus:fill-gray-300"
          title={translation['my-profile']}
        />
    </Dropdown>
  );
};

export default Profile;
