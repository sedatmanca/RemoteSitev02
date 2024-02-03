import { ObjectValues } from "@/services/objectService";

const Roles = {
    ProjectLeader: "project-leader",
    TeamLeader: "team-leader",
    Admin: "admin",
    Member: "member",
    Observer: "observer"
} as const;

type RoleTypes = ObjectValues<typeof Roles>;

interface IRole{
    email: string,
    role: RoleTypes,
    roleStr: string,
}

export {
    Roles,
    type RoleTypes,
    type IRole
}