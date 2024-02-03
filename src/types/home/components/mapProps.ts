import { TTranslation } from "@/services/translationService";
import { IProject } from "@/types/home/project";
import { PageStateTypes } from "../pageState";

export interface IMapProps{
    translation: TTranslation['projects'];
    projects: IProject[];
    showPopup: boolean;
    selectedProject: IProject | undefined;
    setProject: (e: IProject) => void;
    scrollIntoProject: (index: number) => void;
    pageState: PageStateTypes;
}