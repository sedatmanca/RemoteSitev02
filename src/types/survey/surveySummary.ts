import ISurveyOptions from "@/types/survey/surveyOptions";
import { TTranslation } from "@/services/translationService";

export interface ISurveySummaryProps{
    translation: TTranslation['survey'];
    surveyOptions: ISurveyOptions;
}