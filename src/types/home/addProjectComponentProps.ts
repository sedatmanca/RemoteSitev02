import { TTranslation } from "@/services/translationService";
import { ICoordinates } from "@/types/home/coordinates";
import { IProject } from "@/types/home/project";

interface ISiteInfoProps{
    translation: TTranslation['projects'];
    lang: string;
    project: IProject | undefined;
    setProject: (e: IProject) => void;
}

interface IMapProps{
    translation: TTranslation['projects'];
    coords: ICoordinates | undefined;
    setCoords: (e: ICoordinates) => void;
};

interface ISettingsProps{
    translation: TTranslation['units'];
    project: IProject | undefined;
    setProject: (e: IProject) => void;
}

interface IUserInfoProps{
    translation: TTranslation['user']; 
    project: IProject | undefined;
    setProject: (e: IProject) => void;
    existingUsers: {value: string}[];
}

export type {
    ISiteInfoProps,
    ISettingsProps,
    IUserInfoProps,
    IMapProps
}