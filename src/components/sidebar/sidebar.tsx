'use client'

import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ISidebarProps } from '@/types/sidebar/sidebarProps';

const Sidebar = ({
  children
}: ISidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
          <aside className="w-1/4 max-w-[480px] pb-4 overflow-y-auto pr-2 mr-1 ml-4 sidebar-collapse-min:relative sidebar-collapse-max:hidden">
            {children}
          </aside>
          <div className="bg-color-main min-w-[40px] sidebar-collapse-min:hidden sidebar-collapse-max:relative">
            <Button
              className="h-full w-full p-0 text-white bg-color-main border-none hover:!text-main-orange"
              onClick={() => setIsOpen(true)}
            >
              <ChevronRightIcon className="w-18 h-18" />
            </Button>
            <Drawer
              rootClassName="sidebar-collapse-min:hidden"
              className="text-white w-[calc(100vw / 4)] [&_.ant-drawer-body]:flex [&_.ant-drawer-body]:overflow-hidden [&_.ant-drawer-wrapper-body]:bg-color-main [&_.ant-drawer-body]:pt-0 [&_.ant-drawer-body]:bg-color-main [&_.ant-drawer-body]:px-2" 
              closable={false}
              push
              placement="left" 
              onClose={() => setIsOpen(false)} 
              open={isOpen}
            >
              {children}
              <Button
                className="h-full w-full max-w-[40px] my-5 p-0 text-white bg-color-main border-none hover:!text-main-orange"
                onClick={() => setIsOpen(false)}
              >
                <ChevronLeftIcon className="w-18 h-18" />
              </Button>
            </Drawer>
          </div>
        </>
      )
}

export default Sidebar;