import { 
    DistanceUnitTypes, 
    VolumeUnitTypes 
} from "@/types/units";
import { 
    EnergyTypes, 
    BuildingTypes, 
    CategoryTypes, 
    InfrastructureTypes, 
    TransportationTypes, 
    WaterAndUtilityTypes 
} from "@/types/home/categories";
import { ICoordinates } from "@/types/home/coordinates";
import IUser from "@/types/user";

export interface IProject{
    id?: number;
    name?: string;
    startDate?: Date;
    endDate?: Date;
    category?: CategoryTypes;
    subCategory?: EnergyTypes | TransportationTypes | InfrastructureTypes | WaterAndUtilityTypes | BuildingTypes,
    lastUpdated?: string;
    image?: string;
    coordinates?: ICoordinates;
    description?: string;
    distanceUnit?: DistanceUnitTypes;
    volumeUnit?: VolumeUnitTypes;
    users?: IUser[];
}