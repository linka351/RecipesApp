import { Status } from "../types/status";

export const STATUS: Record<string, Status> = {
	PUBLIC: "public",
	PRIVATE: "private",
} as const;
