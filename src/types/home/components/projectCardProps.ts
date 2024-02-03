import { TTranslation } from "@/services/translationService";
import { IProject } from "@/types/home/project";

export default interface IProjectCardProps{
    translation: TTranslation['projects'];
    index: number;
    clickable: boolean;
    scrollRef: (el: HTMLDivElement) => void;
    project: IProject;
    onDeleteProject: (index: number) => void;
    selectedProject: IProject | undefined;
    onShowLocationOnMap: (project: IProject | undefined) => void;
    openUploadSurveyModal: () => void;
}