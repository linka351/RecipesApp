import { Role } from "./role";

export type User = {
	id: string;
	email: string;
	role: Role;
};
