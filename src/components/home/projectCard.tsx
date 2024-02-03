import { Dropdown } from "antd";
import { 
  EllipsisVerticalIcon,
  NoSymbolIcon
} from "@heroicons/react/24/solid";

import { 
  ShareIcon,
  DocumentArrowUpIcon,
  DocumentIcon,
  TrashIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

import {
  MdDateRange as CalendarDaysIcon
} from "react-icons/md";

import Image from "next/image";

import IProjectCardProps from "@/types/home/components/projectCardProps";
import { getCategoryWithSubCategory } from "@/services/categoryService";
import dayjs from "dayjs";
import Link from "next/link";

const ProjectCard = ({
    translation,
    index,
    clickable,
    scrollRef,
    project,
    onDeleteProject,
    selectedProject,
    openUploadSurveyModal,
    onShowLocationOnMap,
}: IProjectCardProps) => {
  const { category, subCategory } = getCategoryWithSubCategory(project.category, project.subCategory);

  const selectProject = () => {
    if(!clickable) return;
    selectedProject?.id === project.id ? onShowLocationOnMap(undefined) : onShowLocationOnMap({...project});
  }
  
  const settingItems = [
    {
      label: (
        <div
          onClick={selectProject} 
          className="flex flex-row items-center justify-start gap-x-2 min-w-[100px] text-xs font-normal text-gray-800"
        >
          <MapPinIcon className="w-4 h-4" />
          <span>
            {translation['location-on-map']}
          </span>
        </div>
      ),
      key: 0
    },
    {
      label: (
        <div 
          onClick={() => openUploadSurveyModal()} 
          className="flex flex-row items-center justify-start gap-x-2 min-w-[100px] text-xs font-normal text-gray-800"
        >
          <DocumentArrowUpIcon className="w-4 h-4" />
          <span>
            {translation['upload-survey']}
          </span>
        </div>
      ),
      key: 1
    },
    {
      label: (
        <div className="flex flex-row items-center justify-start gap-x-2 min-w-[100px] text-xs font-normal text-gray-800">
          <DocumentIcon className="w-4 h-4" />
          <span>
            {translation['manage-site-access']}
          </span>
        </div>
      ),
      key: 2
    },
    {
      label: (
        <div className="flex flex-row items-center justify-start gap-x-2 min-w-[100px] text-xs font-normal text-gray-800">
          <ShareIcon className="w-4 h-4" />
          <span>
            {translation['share-button']}
          </span>
        </div>
      ),
      key: 3
    },
    {
      label: (
        <div
          onClick={() => onDeleteProject(index)} 
          className="flex flex-row items-center justify-start gap-x-2 min-w-[100px] text-xs font-normal text-gray-800">
          <TrashIcon className="w-4 h-4" />
          <span>
            {translation['delete-button']}
          </span>
        </div>
      ),
      key: 4
    },
  ];

  return (
    <div
      ref={scrollRef}
      className={`${!selectedProject ? "opacity-100" : selectedProject.id === project.id ? "border-2 border-orange-600" : "opacity-60"} transition delay-150 xl:grid xl:grid-cols-12 bg-white text-black rounded-md`}
      key={index}
    >
      <Link
        href="/projects"
        className="col-span-5"
      >
        {
          project.image ?
          <Image
            className={`object-cover h-36 object-center rounded-l-md ${clickable && "cursor-pointer"}`}
            quality={100}
            src={project.image}
            alt={translation['project-image']}
            width={1920}
            height={1080}
          /> :
          <div 
            className={`text-center border-r-[1px] border-r-gray-200 p-1 text-red-500 object-cover object-center rounded-l-md h-36 ${clickable && "cursor-pointer"}`}
          >
            <span className="font-bold">
              {translation['image-not-found']}
            </span>
            <NoSymbolIcon className="w-24 h-24 mx-auto"/>
          </div>
        }
      </Link>
      <div className="col-span-7 mx-3 flex flex-col justify-between items-start">
        <div className="w-full">
          <div className="relative lg:flex lg:flex-row lg:items-center items-center md:flex-col md:items-start md:gap-y-1 sm:flex-col sm:items-start sm:gap-y-1 justify-between mt-3">         
            <Link
              href="/projects"
              className="mr-2 font-medium text-lg sm:text-sm md:text-sm lg:text-sm truncate hover:underline duration-100 transition-all ease-linear"
            >
              {project.name}
            </Link>
            <Dropdown
              menu={{
                items: clickable ? settingItems : settingItems.slice(1)
              }}
              placement="bottom"
              arrow
            >
              <EllipsisVerticalIcon className="w-4 h-4 float-right cursor-pointer hover:text-orange-600" />
            </Dropdown>
          </div>
          <div className="mt-2 grid gap-y-2">
            <div className="inline-flex">
              <CalendarDaysIcon className="mr-1 w-4 h-4 text-gray-500"/>
              <span className="text-xs text-gray-500">
                {dayjs(project.startDate!).format('DD/MM/YYYY')} - {dayjs(project.endDate!).format('DD/MM/YYYY')}
              </span>
            </div>
            <span className="text-sm text-gray-700 md:text-xs sm:text-xs">
              {category && subCategory ? `${translation[category!]} / ${translation[subCategory!]}` : translation['no-category']}
            </span>
          </div>
        </div>
        <div className="text-xs text-slate-600 mb-1 mt-2">
          <span>
            {translation['last-updated']}:
          </span>
          &nbsp;
          <span className="text-orange-600">
            {project.lastUpdated?.toString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

