import { ObjectValues } from "@/services/objectService";

const ProjectSurveyType = {
  Measure: 0,
  Annotation: 1,
  Survey: 2,
  Design: 3,
  Output: 4,
  Insight: 5,
} as const;

type ProjectSurveyTypeValues = ObjectValues<typeof ProjectSurveyType>

export {
  ProjectSurveyType
}

export type {
  ProjectSurveyTypeValues
} 