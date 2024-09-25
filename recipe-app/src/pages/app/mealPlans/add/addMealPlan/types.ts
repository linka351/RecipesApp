import { DayName } from "../../../../../types/MealPlan";

export type MealPlan = {
	name: string;
	description: string;
	dateFrom: string;
	mealName: string[];
	plan: {
		[key in DayName]?: {
			[mealName: string]: string;
		};
	};
};
