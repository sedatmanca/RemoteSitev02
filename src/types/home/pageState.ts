import { ObjectValues } from "@/services/objectService";

const PageState = {
    Map: 0,
    AddProject: 1
} as const;

type PageStateTypes = ObjectValues<typeof PageState>;

export {
    PageState
}

export type {
    PageStateTypes
}