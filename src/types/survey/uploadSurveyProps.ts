import { TTranslation } from "@/services/translationService";
import { IProject } from "@/types/home/project";
import { FormLayout } from "antd/es/form/Form";

interface IUploadSurveyProps{
    lang: string;
    translation: TTranslation['survey'];
    isModalOpen: boolean;
    setIsModalOpen: (e: boolean) => void;
    selectedProject?: IProject;
}

interface ISelectProject{
  value: number;
  label: string;
}

interface ISurveyStep{
  title: string;
  formLayout: FormLayout;
  content: JSX.Element;
}

export type {
    IUploadSurveyProps,
    ISelectProject,
    ISurveyStep
}