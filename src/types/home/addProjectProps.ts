import { IProject } from "@/types/home/project";
import { PageStateTypes } from "@/types/home/pageState";
import { TTranslation } from "@/services/translationService";

export interface IAddProjectProps{
    translation: TTranslation;
    lang: string;
    project: IProject | undefined;
    setProject: (e: IProject | undefined) => void;
    setPageState: (e: PageStateTypes) => void;
    addNewProject: (e: IProject) => void;
    pageState: PageStateTypes;
}