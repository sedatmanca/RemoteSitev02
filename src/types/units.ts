import { ObjectValues } from "@/services/objectService";

const DistanceUnit = {
    Meter: 0,
    Feet: 1,
    Inch: 2
} as const;

const VolumeUnit = {
    Meter: 0,
    Feet: 1,
    Yards: 2
} as const;

type DistanceUnitTypes = ObjectValues<typeof DistanceUnit>;
type VolumeUnitTypes = ObjectValues<typeof VolumeUnit>;

export{
    DistanceUnit,
    VolumeUnit
}

export type{
    DistanceUnitTypes,
    VolumeUnitTypes
}