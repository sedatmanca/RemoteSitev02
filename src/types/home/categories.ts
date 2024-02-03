import { ObjectValues } from "@/services/objectService";

const Category = {
    Energy: 0,
    Transportation: 1,
    Infrastructure: 2,
    WaterAndUtilities: 3,
    Buildings: 4
} as const;

const Energy = {
    PowerLines: 0,
    WindTurbines: 1,
    SolarPowerPlant: 2
} as const;

const Transportation = {
    RoadsAndHighways: 0,
    Railway: 1
} as const;

const Infrastructure = {
    Bridges: 0,
    Dams: 1
} as const;

const WaterAndUtilities = {
    Communication: 0,
    Pipelines: 1, 
    Reservoirs: 2
} as const;

const Buildings = {
    Commercial: 0,
    Residential: 1
} as const;

type CategoryTypes = ObjectValues<typeof Category>;
type EnergyTypes = ObjectValues<typeof Energy>;
type TransportationTypes = ObjectValues<typeof Transportation>;
type InfrastructureTypes = ObjectValues<typeof Infrastructure>;
type WaterAndUtilityTypes = ObjectValues<typeof WaterAndUtilities>;
type BuildingTypes = ObjectValues<typeof Buildings>;

interface ISubcategory{
    text:  'power-lines' | 'wind-turbines' | 'solar-plant' | 'roads-highways' | 'railway' | 'bridges' | 'dams' | 'communication' | 'pipelines' | 'reservoirs' | 'commercial' | 'residential' | undefined,
    id: EnergyTypes | TransportationTypes | InfrastructureTypes | WaterAndUtilityTypes | BuildingTypes,
    parentId: CategoryTypes,
}

interface ICategory{
    text: 'energy' | 'transportation' | 'infrastructure' | 'water-utility' | 'buildings' | undefined,
    id: CategoryTypes,
    icon: string
}

const categories: ICategory[] = [
    {
        id: Category.Energy,
        text: "energy",
        icon: "/assets/svg/flash.svg"
    },
    {
        id: Category.Transportation,
        text: "transportation",
        icon: "/assets/svg/transportation.svg"
    },
    {
        id: Category.Infrastructure,
        text: "infrastructure",
        icon: "/assets/svg/layer.svg"
    },
    {
        id: Category.WaterAndUtilities,
        text: "water-utility",
        icon: "/assets/svg/weather.svg"
    },
    {
        id: Category.Buildings,
        text: "buildings",
        icon: "/assets/svg/building.svg"
    }
]

const subCategories: ISubcategory[] = [
    { 
        text: "power-lines", 
        id: Energy.PowerLines, 
        parentId: Category.Energy 
    },
    { 
        text: "wind-turbines", 
        id: Energy.WindTurbines, 
        parentId: Category.Energy
    },
    { 
        text: "solar-plant", 
        id: Energy.SolarPowerPlant, 
        parentId: Category.Energy 
    },
    { 
        text: "roads-highways", 
        id: Transportation.RoadsAndHighways, 
        parentId: Category.Transportation 
    },
    { 
        text: "railway", 
        id: Transportation.Railway, 
        parentId: Category.Transportation 
    },
    { 
        text: "bridges", 
        id: Infrastructure.Bridges, 
        parentId: Category.Infrastructure 
    },
    { 
        text: "dams", 
        id: Infrastructure.Dams, 
        parentId: Category.Infrastructure 
    },
    { 
        text: "communication", 
        id: WaterAndUtilities.Communication, 
        parentId: Category.WaterAndUtilities 
    },
    { 
        text: "pipelines", 
        id: WaterAndUtilities.Pipelines, 
        parentId: Category.WaterAndUtilities 
    },
    { 
        text: "reservoirs", 
        id: WaterAndUtilities.Reservoirs, 
        parentId: Category.WaterAndUtilities 
    },
    { 
        text: "commercial", 
        id: Buildings.Commercial, 
        parentId: Category.Buildings 
    },
    { 
        text: "residential", 
        id: Buildings.Residential, 
        parentId: Category.Buildings 
    }
]

export {
    categories,
    subCategories,
    Category,
    Energy,
    Transportation,
    Infrastructure,
    WaterAndUtilities,
    Buildings
}

export type { 
    ICategory,
    ISubcategory,
    CategoryTypes,
    EnergyTypes,
    TransportationTypes,
    InfrastructureTypes,
    WaterAndUtilityTypes,
    BuildingTypes
};