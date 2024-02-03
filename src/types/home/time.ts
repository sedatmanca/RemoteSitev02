import { ObjectValues } from "@/services/objectService";

const Time = {
  Second: "second",
  Minute: "minute",
  Hour: "hour",
  Day: "day",
  Week: "week",
  Month: "month",
  Year: "year"
} as const;

type TimeTypes = ObjectValues<typeof Time>;

export {
  type TimeTypes,
  Time
}