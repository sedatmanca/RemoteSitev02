import { ObjectValues } from "@/services/objectService";

const SurveyDataType = {
  Survey: 0,
  PreprocessedData: 1,
  PointCloud: 2,
  Design: 3
} as const;

type SurveyDataTypeValues = ObjectValues<typeof SurveyDataType>

export {
  SurveyDataType
}

export type {
  SurveyDataTypeValues
} 