export interface Recipe {
	id: string;
	name: string;
	description: string;
	ingredients: string[];
	instructions: string[];
	image?: string;
}
