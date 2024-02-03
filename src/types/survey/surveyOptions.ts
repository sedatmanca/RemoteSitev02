import { IProject } from "@/types/home/project";
import { SurveyDataTypeValues } from "@/types/survey/surveyDataType";

export default interface ISurveyOptions{
  name?: string;
  date?: Date;
  project?: IProject,
  dataType?: SurveyDataTypeValues,
}