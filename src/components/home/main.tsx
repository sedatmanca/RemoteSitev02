'use client'

import dynamic from "next/dynamic";
import { IProjectsProps } from "@/types/home/projectsProps";
import { 
  useState, 
  useRef,
} from "react";
import { IProject } from "@/types/home/project";
import { Time, TimeTypes } from "@/types/home/time";
import { PageState, PageStateTypes } from "@/types/home/pageState";
import AddProject from "@/components/home/addProject";
import ProjectsSidebar from "@/components/home/projectsSidebar";
import { 
    Energy, 
    Category,
    Infrastructure,
    Buildings,
    Transportation,
    WaterAndUtilities, 
} from "@/types/home/categories";
import { 
  Modal, 
  Button 
} from "antd";
import UploadSurvey from "@/components/survey/uploadSurvey";
import Sidebar from "@/components/sidebar/sidebar";

const Map = dynamic(() => import('@/components/home/map'), { ssr: false } );

const Main = ({
  lang,
  translation
}: IProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<IProject>();
  const [showMapPopup, setShowMapPopup] = useState(true);
  const [pageState, setPageState] = useState<PageStateTypes>(PageState.Map);
  const [uploadSurveyConfirmationModalState, setUploadSurveyConfirmationModalState] = useState(false);
  const [isUploadSurveyModalOpen, setIsUploadSurveyModalOpen] = useState(false);

  const getLastUpdatedString = (timeAsNumber: number, time: TimeTypes) => {
    const isTimeGteOne = timeAsNumber > 1;
    const suffix = isTimeGteOne ? translation.projects[`${time}s`] : translation.projects[time];

    return `${timeAsNumber.toString()} ${suffix} ${translation.projects['ago']}`;
  }
  
  //TODO: API'dan gelince bu kadar uzun olmasina gerek olmayacak, 
  //last update stringi icin fonksiyon asagida kullanilabilir belki
  const [projects, setProjects] = useState<IProject[]>([
    {
      id: 1,
      name: "Romania Bucharest South Ring Road LOT-1",
      startDate: new Date(2022, 10, 20),
      endDate: new Date(2022, 10, 20),
      category: Category.Transportation,
      subCategory: Transportation.RoadsAndHighways,
      lastUpdated: getLastUpdatedString(1, Time.Day),
      image: "/assets/project-deneme-4.png",
      coordinates: {
        lat: 44,41093017955633, 
        lng: 26,25071525573731
      }
    },    
    /*{
      id: 2,
      name: "Limak",
      startDate: new Date(2023, 2, 7),
      endDate: new Date(2023, 2, 7),
      category: Category.Transportation,
      subCategory: Transportation.RoadsAndHighways,
      lastUpdated: getLastUpdatedString(27, Time.Minute),
      image: "/assets/build-2.jpg",      
      coordinates: {
        lat: 41.0153, 
        lng: 29.1999
      }
    },
    {
      id: 3,
      name: "Deneme",
      startDate: new Date(2022, 4, 12),
      endDate: new Date(2023, 7, 23),
      category: Category.Buildings,
      subCategory: Buildings.Residential,
      lastUpdated: getLastUpdatedString(30, Time.Day),
      image: "/assets/project-deneme.png",
      coordinates: {
        lat: 41.0211, 
        lng: 29.5335
      }
    },
    {
      id: 4,
      name: "Demoproject",
      startDate: new Date(2021, 2, 7),
      endDate: new Date(2023, 2, 10),
      category: Category.Transportation,
      subCategory: Transportation.Railway,
      lastUpdated: getLastUpdatedString(27, Time.Week),
      image: "/assets/project-deneme-2.png",
      coordinates: {
        lat: 41.0663, 
        lng: 29.1999
      }
    },
    {
      id: 5,
      name: "Kalyon 2",
      startDate: new Date(2021, 1, 21),
      endDate: new Date(2022, 5, 15),
      category: Category.WaterAndUtilities,
      subCategory: WaterAndUtilities.Pipelines,
      lastUpdated: getLastUpdatedString(2, Time.Year),
      image: "/assets/project-deneme-3.png",
      coordinates: {
        lat: 41.0153, 
        lng: 29.3356
      }
    },
    {
      id: 6,
      name: "Limak 2",
      startDate: new Date(2020, 9, 26),
      endDate: new Date(2026, 4, 8),
      category: Category.Infrastructure,
      subCategory: Infrastructure.Bridges,
      lastUpdated: getLastUpdatedString(10, Time.Month),
      image: "/assets/project-deneme-4.png",
      coordinates: {
        lat: 41.0532, 
        lng: 29.1999
      }
    }
    */
  ]);
  
  const [newProject, setNewProject] = useState<IProject>();

  const scrollRef = useRef<Map<number, HTMLDivElement>>();

  const setProject = (e: IProject | undefined) => {
    setShowMapPopup(!!e);
    setSelectedProject(e);
  }

  const onDeleteProject = (index: number) => {
    setShowMapPopup(false);

    const tempProjects = [ ...projects ];
    tempProjects.splice(index, 1);

    setSelectedProject(undefined);
    setProjects(tempProjects);
  }

  const scrollIntoProject = (index: number) => {
    if(!scrollRef.current) return;
    const getProject = scrollRef.current.get(index);
    getProject?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  const addNewProject = (e: IProject) => {
    //Temp
    e.id = projects.length + 1;
    e.lastUpdated = getLastUpdatedString(0, Time.Second);

    setProjects([...projects, e]);
    setUploadSurveyConfirmationModalState(true);
  }

  const openUploadSurveyModal = () => {
    setUploadSurveyConfirmationModalState(false);
    setIsUploadSurveyModalOpen(true);
  }

  return(
    <div className="flex flex-row grow overflow-auto">
      <Sidebar>
        <ProjectsSidebar
          translation={translation.projects}
          scrollRef={scrollRef}
          projects={projects}
          onDeleteProject={onDeleteProject}
          selectedProject={selectedProject}
          setProject={setProject}
          pageState={pageState}
          setPageState={setPageState}
        />
      </Sidebar>
      <Map
        translation={translation.projects}
        projects={projects}
        showPopup={showMapPopup}
        selectedProject={selectedProject}
        setProject={setProject}
        scrollIntoProject={scrollIntoProject}
        pageState={pageState}
      />
      <AddProject
        translation={translation}
        lang={lang}
        project={newProject}
        setProject={setNewProject}
        setPageState={setPageState}
        addNewProject={addNewProject}
        pageState={pageState}
      />
      <Modal
        title={translation.projects['add-new-dataset']}
        open={uploadSurveyConfirmationModalState}
        onOk={() => setUploadSurveyConfirmationModalState(false)}
        onCancel={() => setUploadSurveyConfirmationModalState(false)}
        wrapClassName="drop-shadow-xl"
        width={550}
        destroyOnClose
        centered 
        keyboard
        closable
        footer={
          <div className="flex justify-center gap-x-2">
            <Button 
              onClick={() => setUploadSurveyConfirmationModalState(false)}
              className="min-w-44 text-black px-4 py-1 mx-2 rounded hover:!border-main-orange hover:!text-main-orange"
            >
              {translation.projects['upload-survey-confirmation-no']}
            </Button>
            <Button 
              onClick={() => openUploadSurveyModal()}
              className="min-w-44 bg-main-orange text-white px-4 py-1 mx-2 rounded hover:bg-main-deep-orange disable-text-hover border-none"
            >
              {translation.projects['upload-survey-confirmation-yes']}
            </Button>
          </div>
        }
      >
        <div className="py-10 border-b-2">
          <div className="font-small text-center">
            {translation.projects['upload-survey-question']}
          </div>
        </div>
      </Modal>
      <UploadSurvey
        lang={lang}
        translation={translation.survey}
        isModalOpen={isUploadSurveyModalOpen}
        setIsModalOpen={setIsUploadSurveyModalOpen}
      />
    </div>
  )
}

export default Main;