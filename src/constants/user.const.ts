import { Role } from "../types/role";

export const USER_ROLE: Record<string, Role> = {
	ADMIN: "admin",
	USER: "user",
} as const;
