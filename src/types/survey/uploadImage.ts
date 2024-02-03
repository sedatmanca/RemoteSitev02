import ISurveyOptions from "@/types/survey/surveyOptions";
import { TTranslation } from "@/services/translationService";

export interface IUploadImageComponentProps{
    translation: TTranslation['survey'];
    lang: string;
    surveyOptions: ISurveyOptions;
    setSurveyOptions: (e: ISurveyOptions) => void;
}