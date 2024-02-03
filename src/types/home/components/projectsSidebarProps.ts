import { IProject } from "@/types/home/project";
import { PageStateTypes } from "@/types/home/pageState";
import { MutableRefObject } from "react";
import { TTranslation } from "@/services/translationService";

export interface IProjectsSidebarProps{
    translation: TTranslation['projects'];
    scrollRef: MutableRefObject<Map<number, HTMLDivElement> | undefined>;
    projects: IProject[],
    onDeleteProject: (index: number) => void;
    selectedProject: IProject | undefined;
    setProject: (e: IProject | undefined) => void;
    pageState: PageStateTypes;
    setPageState: (e: PageStateTypes) => void;
}