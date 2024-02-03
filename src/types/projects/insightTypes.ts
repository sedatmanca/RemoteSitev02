import { ObjectValues } from "@/services/objectService";

const InsightTypes = {
  Overview: 0,
  Earthworks: 1,
} as const;

type InsightTypeValues = ObjectValues<typeof InsightTypes>

export {
  InsightTypes
}

export type {
  InsightTypeValues
} 