import { TTranslation } from "@/services/translationService";
import ISurveyOptions from "@/types/survey/surveyOptions";
import { SurveyDataTypeValues } from "@/types/survey/surveyDataType";

interface ISurveyDataTypesProps{
    translation: TTranslation['survey'];
    lang: string;
    surveyOptions: ISurveyOptions;
    setSurveyOptions: (e: ISurveyOptions) => void;
}

interface ISurveyDataTypeCategory{
    id: SurveyDataTypeValues,
    title: string,
    description: string,
    image: string,
    acceptedFileTypes: string
}

export type{
    ISurveyDataTypesProps,
    ISurveyDataTypeCategory
}