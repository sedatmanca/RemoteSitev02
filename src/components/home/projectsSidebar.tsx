'use client'

import ProjectCard from "@/components/home/projectCard"

import { 
  Input, 
  Button 
} from "antd";
import { 
  MagnifyingGlassIcon,
  DocumentDuplicateIcon
} from "@heroicons/react/24/solid";
import { IProjectsSidebarProps } from "@/types/home/components/projectsSidebarProps";
import { PlusIcon, MapIcon } from "@heroicons/react/24/outline";
import { PageState } from "@/types/home/pageState";
import { useState } from "react";

const ProjectsSidebar = ({
  translation,
  scrollRef,
  projects,
  onDeleteProject,
  selectedProject,
  setProject,
  pageState,
  setPageState
} : IProjectsSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  const uploadSurveyShowModal = () => {};

  const PageButton = () => {
    const showMapButton = (
      <div className="inline-flex">
        <MapIcon className="self-center w-6 h-6"/>
        <span className="mt-px ml-0.5">
          {translation['show-map']}
        </span>
      </div>
    )

    const addProjectButton = (
      <div className="inline-flex">      
        <PlusIcon className="w-6 h-6"/>
        <span className="mt-px ml-0.5">
          {translation['add-new-project']}
        </span>
      </div>
    )

    const changePageState = () => {
      setProject(undefined);
      setPageState(pageState === PageState.AddProject ? PageState.Map : PageState.AddProject);
    }

    return(
      <div className="w-full">
        <Button
          onClick={() => changePageState()}
          className="bg-main-orange disable-text-hover h-full inline-flex justify-center flex-row py-2 w-full my-2 rounded-lg focus:outline-none text-white hover:bg-main-orange/90 border-none"
        >
          {pageState === PageState.AddProject ? showMapButton : addProjectButton}
        </Button>
      </div>
    ) 
  }

  return(
    <div className="flex flex-col gap-y-2 overflow-auto pr-2">
      <div className="sticky top-0 left-0 bg-color-main z-10 pt-4 -mx-[1px]">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full flex flex-row gap-3 items-center justify-start mt-1 ">
            <DocumentDuplicateIcon className="w-5 h-5 text-gray-300" />
            <span className="text-gray-300 text-lg">
              {translation['projects']}
            </span>
            <div className="inline-flex justify-center items-center text-xs ml-2 bg-white/10 text-white/70  rounded-full w-5 h-5">
              {projects.length.toString()}
            </div>
          </div>
          <div className="w-full">
            <PageButton/>
          </div>
        </div>
        <div className="relative py-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
          </div>
          <Input
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            placeholder={translation['search-project']}
            className="block w-full p-3 pl-10 border-none text-sm focus:ring-2 focus:outline-none focus:ring-gray-700 placeholder-gray-500 focus:text-white rounded-md bg-black/30"
          />
        </div>
        <hr className="h-px bg-main-orange border-0 mb-2"/>
      </div>
      {projects.length > 0 ? projects?.map((project, index) => {
        const element = (
          <ProjectCard
            translation={translation}
            scrollRef={(el: HTMLDivElement) => {
              if(!scrollRef.current) scrollRef.current = new Map();
              el ? scrollRef.current?.set(index, el) : scrollRef.current?.delete(index);
            }}
            clickable={pageState === PageState.Map}
            index={index}
            project={project}
            key={index}
            onDeleteProject={onDeleteProject}
            openUploadSurveyModal={uploadSurveyShowModal}
            selectedProject={selectedProject}
            onShowLocationOnMap={setProject}
          />
        )

        return searchTerm ? (project.name?.toLowerCase().includes(searchTerm) && element) : element;
      }) : 
      <h1 className="self-center">
        {translation['no-project']}
      </h1>
    }
    </div>
  )
}

export default ProjectsSidebar;