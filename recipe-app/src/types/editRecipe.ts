import { Status } from "./status";

export interface Recipe {
	userId?: string | undefined;
	id: string;
	name: string;
	description: string;
	ingredients: string[];
	instructions: string[];
	image?: string;
	status: Status;
}
